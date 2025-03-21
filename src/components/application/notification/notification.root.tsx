import { ReactNode } from 'react'

interface NotificationRootProps {
  children: ReactNode
}

export function NotificationRoot({ children }: NotificationRootProps) {
  return (
    <div className="flex items-start gap-6 bg-zinc-200 px-8 py-4 dark:bg-zinc-900">
      {children}
    </div>
  )
}
