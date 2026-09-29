import { Container } from "@/components/layout/Container"
import { MobileNav } from "@/components/layout/MobileNav"
import { Logo } from "@/components/common/Logo"
import { NavLink } from "@/components/common/NavLink"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { navItems } from "@/components/layout/nav-items"

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav items={navItems} />
        </div>
      </Container>
    </header>
  )
}

export { Header }
