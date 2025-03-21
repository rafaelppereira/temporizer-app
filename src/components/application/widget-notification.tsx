import { Check, Rocket, User, X } from 'lucide-react'

import { Notification } from './notification'

export function WidgetNotification() {
  return (
    <div className="min-h-screen w-full">
      <div className="w-[448px] overflow-hidden rounded-sm">
        <div className="flex items-center justify-between bg-zinc-200 px-6 py-4 dark:bg-zinc-800">
          <span className="font-bold">Notificações</span>
          <button className="text-xs font-bold text-blue-500 hover:text-blue-400">
            MARCAR TODAS COMO VISTAS
          </button>
        </div>

        <div>
          <div className="bg-zinc-300 px-5 py-2 text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
            Recentes
          </div>

          <div className="divide-y-2 divide-zinc-300 dark:divide-zinc-950">
            <Notification.Root>
              <Notification.Icon icon={Rocket} />

              <Notification.Content text="Você recebeu um convite para fazer parte da empresa Nitro HUB" />

              <Notification.Actions>
                <Notification.Action
                  icon={X}
                  className="bg-red-500 dark:bg-red-500"
                />
                <Notification.Action
                  icon={Check}
                  className="bg-emerald-500 dark:bg-emerald-500"
                />
              </Notification.Actions>
            </Notification.Root>

            <Notification.Root>
              <Notification.Icon icon={User} />

              <Notification.Content text="Rafael Pereira pediu permissão para participar do Nitro HUB" />

              <Notification.Actions>
                <Notification.Action
                  icon={X}
                  className="bg-red-500 dark:bg-red-500"
                />
              </Notification.Actions>
            </Notification.Root>
          </div>
        </div>

        <div>
          <div className="bg-zinc-300 px-5 py-2 text-sm text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
            Antigas
          </div>

          <div className="divide-y-2 divide-zinc-300 dark:divide-zinc-950">
            <Notification.Root>
              <Notification.Icon icon={Rocket} />

              <Notification.Content text="Rafael Pereira atualizou as informações da organização Nitro HUB" />
            </Notification.Root>
          </div>
        </div>
      </div>
    </div>
  )
}
