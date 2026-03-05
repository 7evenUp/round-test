import { type ComponentProps } from "react"

import { cn } from "@/lib/cn"

const Button = ({ className, children, ...rest }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "rounded-lg border-none bg-sky-700 px-3 py-2 text-sky-200 transition-colors outline-none hover:bg-sky-700/75 focus-visible:bg-sky-700/75 active:bg-sky-700/50 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
