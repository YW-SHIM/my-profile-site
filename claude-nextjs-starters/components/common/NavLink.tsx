"use client"

import type { ReactNode } from "react"
import Link, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"

interface NavLinkProps extends LinkProps {
  className?: string
  children: ReactNode
}

function NavLink({ href, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      data-active={isActive}
      className={cn(
        "text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground data-[active=true]:font-medium",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export { NavLink }
