import type { Metadata } from "next"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function ExampleSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

export const metadata: Metadata = {
  title: "예제 | Starter Kit",
  description: "설치된 shadcn/ui 컴포넌트 사용 예시",
}

export default function ExamplesPage() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">예제</h1>
        <p className="mt-2 text-muted-foreground">
          스타터킷에 이미 설치된 shadcn/ui 컴포넌트의 실제 사용 예시입니다.
        </p>
      </div>

      <ExampleSection title="Button">
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </ExampleSection>

      <ExampleSection title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </ExampleSection>

      <ExampleSection title="Card">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드 설명 텍스트입니다.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>또 다른 카드</CardTitle>
              <CardDescription>재사용 가능한 카드 컴포넌트.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </ExampleSection>

      <ExampleSection title="Input">
        <div className="flex max-w-sm flex-col gap-1.5">
          <Label htmlFor="example-email">이메일</Label>
          <Input id="example-email" type="email" placeholder="you@example.com" />
        </div>
      </ExampleSection>

      <ExampleSection title="Tabs">
        <Tabs defaultValue="tab1" className="max-w-md">
          <TabsList>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">첫 번째 탭 콘텐츠입니다.</TabsContent>
          <TabsContent value="tab2">두 번째 탭 콘텐츠입니다.</TabsContent>
        </Tabs>
      </ExampleSection>

      <ExampleSection title="Alert Dialog">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            삭제하기
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction variant="destructive">삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ExampleSection>
    </div>
  )
}
