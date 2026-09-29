"use client"

import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLink } from "@/components/common/NavLink"
import type { NavItem } from "@/components/layout/nav-items"

interface MobileNavProps {
  items: NavItem[]
}

function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="메뉴 열기"
            className="md:hidden"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 px-4">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
