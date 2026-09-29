import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "소개 | Starter Kit",
  description: "Next.js + shadcn/ui 기반 모던 앱 스타터킷 소개",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">소개</h1>
      <p className="max-w-2xl text-muted-foreground">
        이 스타터킷은 Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui를
        기반으로 어떤 웹사이트에도 필요한 공통 레이아웃과 컴포넌트를 미리
        구성해 둔 템플릿입니다. Header, Footer, 다크모드 토글 등 구조적인
        부분은 이미 준비되어 있으므로, 바로 페이지 콘텐츠 개발에 집중할 수
        있습니다.
      </p>
      <p className="max-w-2xl text-muted-foreground">
        설치된 shadcn/ui 컴포넌트들의 실제 사용 예시는 상단 메뉴의
        &ldquo;예제&rdquo; 페이지에서 확인할 수 있습니다.
      </p>
    </div>
  )
}
