import Link from "next/link"

import { Container } from "@/components/layout/Container"
import { Separator } from "@/components/ui/separator"
import { navItems } from "@/components/layout/nav-items"

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <Container className="py-8">
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Starter Kit</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Next.js + shadcn/ui 기반 모던 앱 스타터킷
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground md:text-right">
            &copy; {year} Starter Kit. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
