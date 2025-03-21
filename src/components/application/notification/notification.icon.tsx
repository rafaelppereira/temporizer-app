import { ElementType } from 'react'

interface NotificationIconProps {
  icon: ElementType
}

export function NotificationIcon({ icon: Icon }: NotificationIconProps) {
  return <Icon className="mt-3 h-6 w-6 text-blue-500" />
}
