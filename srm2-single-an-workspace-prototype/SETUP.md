# Project Setup Guide

## 현재 상태

✅ 프로젝트 구조 완성  
✅ 모든 컴포넌트 파일 생성  
✅ Zustand 상태 관리 구성  
✅ 타입 정의 완료  
✅ Mock 데이터 준비 완료  

⏳ **다음 단계**: npm 라이브러리 설치

## npm 설치 방법

현재 Node.js v24.14.0이 설치되어 있지만 npm이 PATH에 등록되지 않았습니다.

### 방법 1: Node.js 재설치 (권장)

1. **현재 Node.js 제거**
   ```powershell
   winget uninstall nodejs
   ```

2. **Node.js 최신 LTS 버전 설치** (npm 포함)
   ```powershell
   winget install nodejs-lts
   ```
   또는 [nodejs.org](https://nodejs.org)에서 직접 다운로드

3. **설치 확인**
   ```powershell
   node --version
   npm --version
   ```

### 방법 2: NVM-Windows 사용

```powershell
# nvm으로 npm과 함께 Node 재설치
nvm install 20.14.0
nvm use 20.14.0
npm --version
```

### 방법 3: npm 독립 설치

npm-windows-upgrade 패키지 사용:
```powershell
# PowerShell (관리자 모드)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
scoop install npm
```

## npm 라이브러리 설치

npm이 설치되면 다음 명령을 실행합니다:

```bash
cd C:\Users\2016116\my-workspace\srm2-single-an-workspace-prototype

# 의존성 설치
npm install lucide-react clsx tailwind-merge zustand

# 또는 전체 의존성 설치 (package.json 기반)
npm install
```

### 필요한 패키지 목록

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "zustand": "^4.4.0",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 개발 서버 실행

npm 설치 후:

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 프로젝트 구조 확인

```
✓ app/
  - layout.tsx
  - page.tsx
  - globals.css

✓ components/
  - HeaderNav.tsx
  - LeftPanel.tsx
  - RightPanel.tsx
  - ConfidenceBadge.tsx
  - StatusBadge.tsx

✓ store/
  - arrival-notice-store.ts

✓ types/
  - arrival-notice.ts

✓ lib/
  - mock-data.ts

✓ .claude/
  - settings.json
  - rules/

✓ 설정 파일
  - package.json
  - tsconfig.json
  - tailwind.config.ts
  - next.config.js
  - postcss.config.js
```

## 수동 테스트 가이드

npm이 설치되기 전에 코드 구조를 검증하고 싶다면:

### 1. TypeScript 컴파일 확인
```bash
npx tsc --noEmit
```

### 2. 파일 인터페이스 호환성 확인
```bash
# IDE의 문제 탭 확인
# VS Code: Ctrl+Shift+M (또는 Cmd+Shift+M on Mac)
```

## 문제 해결

### npm이 여전히 인식되지 않으면

1. **PowerShell 재시작** (관리자 모드)
2. **프로필 새로고침**
   ```powershell
   $PROFILE | % {if (test-path $_) {& $_}}
   ```
3. **환경 변수 확인**
   ```powershell
   $env:PATH -split ';' | grep -i nodejs
   ```

### Node 버전 이슈

nvm4w를 사용 중이면:
```powershell
nvm list
nvm use [version]
```

## 다음 단계

1. ✅ npm 설치
2. ✅ npm install 실행
3. 🔄 npm run dev로 개발 서버 시작
4. 🔄 http://localhost:3000 브라우저 접속
5. 🔄 UI 상호작용 테스트

## 참고

- **Node.js 버전**: 18.x 이상 권장 (현재 v24.14.0 설치됨)
- **npm 버전**: 9.x 이상 권장
- **OS**: Windows 11 Pro (PowerShell 사용)
