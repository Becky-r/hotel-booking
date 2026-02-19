import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="hidden h-px w-8 bg-gold sm:block" aria-hidden="true" />
        <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gold">
          {subtitle}
        </span>
        <span className="hidden h-px w-8 bg-gold sm:block" aria-hidden="true" />
      </div>
      <h2 className="text-3xl font-serif leading-tight text-foreground md:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
    </div>
  )
}
