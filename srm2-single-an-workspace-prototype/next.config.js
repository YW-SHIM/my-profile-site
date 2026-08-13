/** @type {import('next').NextConfig} */
// GitHub Pages는 정적 파일만 서빙하므로 next build 시 output: 'export'로 정적 HTML을 생성한다.
// Pages Source가 "GitHub Actions"로 설정되어 이 저장소의 Pages 배포 전체를 이 앱이 차지하므로,
// 프로젝트 페이지 URL 규칙에 맞춰 basePath는 저장소명(my-profile-site)까지만 붙인다.
// https://YW-SHIM.github.io/my-profile-site/
const isGithubPagesBuild = process.env.GITHUB_PAGES_BUILD === 'true';
const basePath = isGithubPagesBuild ? '/my-profile-site' : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
