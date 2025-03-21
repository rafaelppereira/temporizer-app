import { ReactNode } from 'react'

interface ToIdentifyRouteProps {
  element: ReactNode
}

/* 
  ✅ Esse componente serve para verificar uma rota específica,
  possibilidando o controle de entrada e saída do usuário.
*/

export function ToIdentifyRoute({ element }: ToIdentifyRouteProps) {
  return element
}
