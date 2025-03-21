import { format, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/*
  💡 Esse é o arquivo traz as principais funções utiizadas
  em projetos internos, a de formatar data e de formatar pela
  distancia `Há 4 horas`
*/

interface DFformatDateProps {
  date: string
  formatType: string
}

function dfFormatDate({ date, formatType }: DFformatDateProps) {
  return format(new Date(date), formatType, {
    locale: ptBR,
  })
}

interface DFformatDistanceProps {
  date: string
}

function dfFormatDistance({ date }: DFformatDistanceProps) {
  return formatDistance(new Date(date), new Date(), {
    locale: ptBR,
  })
}

export { dfFormatDate, dfFormatDistance }
