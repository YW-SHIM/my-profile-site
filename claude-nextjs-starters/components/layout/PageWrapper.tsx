import type { ComponentProps } from "react"
import { cn } from "cn"

import { Container } from "@/components/layout/Container"

function PageWrapper({ className, children, ...props }: ComponentProps<"main">) {
  return (
    <main data-slot="page-wrapper" className={cn("flex flex-1 flex-col", className)} {...props}>
      <Container className="flex flex-1 flex-col py-8">{children}</Container>
    </main>
  )
}

export { PageWrapper }
