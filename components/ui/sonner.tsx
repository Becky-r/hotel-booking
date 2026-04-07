'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      richColors
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'rounded-xl border shadow-lg backdrop-blur-sm data-[visible=true]:animate-in data-[visible=true]:fade-in-0 data-[visible=true]:slide-in-from-top-2',
          title: 'font-medium tracking-tight',
          description: 'text-[0.9rem] opacity-90',
          success:
            '!bg-emerald-50 !text-emerald-900 !border-emerald-200 dark:!bg-emerald-950 dark:!text-emerald-100 dark:!border-emerald-800',
          error:
            '!bg-rose-50 !text-rose-900 !border-rose-200 dark:!bg-rose-950 dark:!text-rose-100 dark:!border-rose-800',
          warning:
            '!bg-amber-50 !text-amber-900 !border-amber-300 dark:!bg-amber-950 dark:!text-amber-100 dark:!border-amber-800',
          info:
            '!bg-blue-50 !text-blue-900 !border-blue-300 dark:!bg-blue-950 dark:!text-blue-100 dark:!border-blue-800',
        },
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
