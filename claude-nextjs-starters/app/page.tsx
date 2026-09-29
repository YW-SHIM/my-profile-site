import { Layers, Palette, Rocket } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const features = [
  {
    icon: Rocket,
    title: "빠른 시작",
    description: "Next.js App Router + Tailwind CSS로 바로 개발을 시작합니다.",
  },
  {
    icon: Layers,
    title: "재사용 가능한 컴포넌트",
    description: "shadcn/ui 프리미티브를 계층별로 조합해 확장합니다.",
  },
  {
    icon: Palette,
    title: "다크모드 내장",
    description: "next-themes 기반 라이트/다크 테마를 기본 지원합니다.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-4 py-12">
        <Badge variant="secondary">Modern Starter Kit</Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Next.js 스타터킷으로
          <br />
          빠르게 시작하세요
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Next.js, TypeScript, Tailwind CSS, shadcn/ui가 구성된 모던 스타터킷입니다.
          공통 레이아웃과 컴포넌트 계층이 이미 준비되어 있습니다.
        </p>
        <Button size="lg">시작하기</Button>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="size-5 text-muted-foreground" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-4 pb-12">
        <h2 className="text-xl font-semibold">뉴스레터 구독</h2>
        <form className="flex max-w-md gap-2">
          <Input type="email" placeholder="you@example.com" aria-label="이메일" />
          <Button type="submit">구독</Button>
        </form>
      </section>
    </div>
  );
}
