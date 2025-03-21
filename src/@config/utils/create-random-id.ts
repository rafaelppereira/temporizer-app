import { v4 } from 'uuid'

/*
  💡 Essa função serve para gerar um id único,
  ela pode ser usada em vários momentos, basta utilizar
  da maneira correta.
*/

export function createRandomId() {
  const randomId = v4()

  return randomId.replace(/-/g, '')
}
