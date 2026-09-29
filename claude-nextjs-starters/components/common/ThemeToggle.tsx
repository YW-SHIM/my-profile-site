"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const emptySubscribe = () => () => {}

// 서버 렌더링 시점엔 next-themes가 실제 테마를 알 수 없으므로,
// 클라이언트에서 스냅샷이 바뀐 뒤에만 아이콘을 렌더링해 hydration 불일치를 피함
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useHasMounted()

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="테마 전환"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          />
        }
      >
        {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
        <span className="sr-only">테마 전환</span>
      </TooltipTrigger>
      <TooltipContent>다크모드 전환</TooltipContent>
    </Tooltip>
  )
}

export { ThemeToggle }
