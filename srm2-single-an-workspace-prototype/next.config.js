/** @type {import('next').NextConfig} */
// GitHub Pages는 정적 파일만 서빙하므로 next build 시 output: 'export'로 정적 HTML을 생성한다.
// 저장소(my-profile-site) 하위에 여러 프로젝트가 함께 커밋되어 있어, Pages URL이
// https://YW-SHIM.github.io/my-profile-site/srm2-preview/ 형태가 되도록 basePath를 지정한다.
const isGithubPagesBuild = process.env.GITHUB_PAGES_BUILD === 'true';
const basePath = isGithubPagesBuild ? '/my-profile-site/srm2-preview' : '';

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
