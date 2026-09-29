interface NavItem {
  href: string
  label: string
}

const navItems: NavItem[] = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/examples", label: "예제" },
]

export { navItems }
export type { NavItem }
