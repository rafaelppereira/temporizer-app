import { toast } from 'sonner'

/*
  💡 Esse arquivo da possibilidade de gerar notificações
  com o sonner, desta maneira irá conseguir mostrar pro usuário
  um texto e qual posição que você vai querer.
*/

interface GenerateNotification {
  text: string
  position?:
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'top-center'
    | 'top-left'
    | 'top-right'
}

function generateSuccessNotification({ text, position }: GenerateNotification) {
  return toast.success(text, {
    position,
  })
}

function generateErrorNotification({ text, position }: GenerateNotification) {
  return toast.error(text, {
    position,
  })
}

function generateWarningNotification({ text, position }: GenerateNotification) {
  return toast.warning(text, {
    position,
  })
}

export {
  generateErrorNotification,
  generateSuccessNotification,
  generateWarningNotification,
}
