import { ReactNode } from 'react'

interface ToProtectRouteProps {
  element: ReactNode
}

/* 
  ❌ Esse componente serve para proteger uma rota específica,
  possibilidando o controle de entrada e saída do usuário.
*/

export function ToProtectRoute({ element }: ToProtectRouteProps) {
  return element
}
