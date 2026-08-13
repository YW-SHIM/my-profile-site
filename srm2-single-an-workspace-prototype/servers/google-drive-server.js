#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const credentialsPath = path.join(process.cwd(), 'gcp-oauth.keys.json');
const tokenPath = path.join(process.cwd(), 'gcp-token.json');

if (!fs.existsSync(credentialsPath)) {
  console.error(`Error: OAuth credentials file not found at ${credentialsPath}`);
  process.exit(1);
}

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
const installed = credentials.installed || credentials;

const auth = new google.auth.OAuth2(
  installed.client_id,
  installed.client_secret,
  installed.redirect_uris ? installed.redirect_uris[0] : 'http://localhost:3000/callback'
);

// Load token from file if available
let tokenData = null;
if (fs.existsSync(tokenPath)) {
  try {
    tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  } catch (e) {
    console.error('Error reading token file:', e.message);
  }
}

// Set credentials with token data
if (tokenData) {
  auth.setCredentials({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expiry_date: tokenData.expiry_date
  });
} else if (installed.refresh_token) {
  auth.setCredentials({
    refresh_token: installed.refresh_token
  });
}

const drive = google.drive({ version: 'v3', auth });

// Simple stdio-based MCP server
class GoogleDriveMCP {
  constructor() {
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (data) => this.handleRequest(data));
  }

  async handleRequest(data) {
    try {
      const lines = data.trim().split('\n');
      for (const line of lines) {
        if (!line) continue;

        const request = JSON.parse(line);
        const response = await this.processRequest(request);
        console.log(JSON.stringify(response));
      }
    } catch (error) {
      console.error(JSON.stringify({
        jsonrpc: '2.0',
        error: {
          code: -32700,
          message: 'Parse error: ' + error.message
        }
      }));
    }
  }

  async processRequest(request) {
    const { id, method, params } = request;

    try {
      let result;

      switch (method) {
        case 'initialize':
          result = {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {}
            },
            serverInfo: {
              name: 'google-drive',
              version: '1.0.0'
            }
          };
          break;

        case 'tools/list':
          result = {
            tools: [
              {
                name: 'list_files',
                description: 'List files in Google Drive',
                inputSchema: {
                  type: 'object',
                  properties: {
                    query: {
                      type: 'string',
                      description: 'Search query'
                    },
                    pageSize: {
                      type: 'number',
                      description: 'Number of results to return'
                    }
                  }
                }
              },
              {
                name: 'get_file',
                description: 'Get file content from Google Drive',
                inputSchema: {
                  type: 'object',
                  properties: {
                    fileId: {
                      type: 'string',
                      description: 'File ID'
                    }
                  },
                  required: ['fileId']
                }
              }
            ]
          };
          break;

        case 'tools/call':
          result = await this.callTool(params.name, params.arguments);
          break;

        default:
          throw new Error(`Unknown method: ${method}`);
      }

      return {
        jsonrpc: '2.0',
        id,
        result
      };
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32603,
          message: error.message
        }
      };
    }
  }

  async callTool(name, args) {
    switch (name) {
      case 'list_files':
        return await this.listFiles(args.query, args.pageSize || 10);
      case 'get_file':
        return await this.getFile(args.fileId);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  async listFiles(query = '', pageSize = 10) {
    try {
      // 기본 쿼리: SRM2-Project-Resources 폴더 내 파일 검색
      let q = query;

      if (!query) {
        // 특정 폴더 ID로 검색 (아래에 실제 폴더 ID 입력)
        // 형식: "'[폴더ID]' in parents and trashed = false"
        q = "trashed = false";
      }

      const response = await drive.files.list({
        q,
        spaces: 'drive',
        fields: 'files(id, name, mimeType, createdTime, modifiedTime, parents)',
        pageSize,
        orderBy: 'modifiedTime desc'
      });

      return {
        files: response.data.files || [],
        message: `Found ${response.data.files?.length || 0} files`,
        folderInfo: 'Search in SRM2-Project-Resources folder'
      };
    } catch (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  async getFile(fileId) {
    try {
      const response = await drive.files.get({
        fileId,
        fields: 'id, name, mimeType, createdTime, modifiedTime, webViewLink'
      });

      return {
        file: response.data,
        message: 'File retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get file: ${error.message}`);
    }
  }
}

// Start the MCP server
const server = new GoogleDriveMCP();
