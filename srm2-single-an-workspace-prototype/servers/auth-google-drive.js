#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const readline = require('readline');

const credentialsPath = path.join(process.cwd(), 'gcp-oauth.keys.json');
const tokenPath = path.join(process.cwd(), 'gcp-token.json');

if (!fs.existsSync(credentialsPath)) {
  console.error(`Error: OAuth credentials file not found at ${credentialsPath}`);
  process.exit(1);
}

const credentialsFile = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
const credentials = credentialsFile.installed;

const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  'http://localhost'
);

async function authenticate() {
  // Check if we already have a token
  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    oauth2Client.setCredentials(token);
    console.log('✅ Using existing token');
    return oauth2Client;
  }

  // Generate authorization URL
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly']
  });

  console.log('🔐 Google Drive API 인증이 필요합니다.');
  console.log('아래 URL을 브라우저에서 열고 인증을 완료한 후, 받은 코드를 입력하세요:\n');
  console.log(`📱 인증 URL: ${authUrl}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    rl.question('인증 코드를 입력하세요: ', async (code) => {
      rl.close();

      try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // Save token to file
        fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
        console.log(`✅ 토큰이 저장되었습니다: ${tokenPath}`);

        resolve(oauth2Client);
      } catch (error) {
        reject(new Error(`토큰 조회 실패: ${error.message}`));
      }
    });
  });
}

async function main() {
  try {
    await authenticate();
    console.log('\n✅ Google Drive API 인증 완료!');
    console.log('이제 Claude Code에서 Google Drive를 사용할 수 있습니다.');
  } catch (error) {
    console.error(`❌ 인증 실패: ${error.message}`);
    process.exit(1);
  }
}

main();
