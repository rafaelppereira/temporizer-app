import { useState } from 'react'

export function useApplication() {
  /*
    💡 Utilize um hook para acumular funções e estados em apenas
    um arquivo, sem precisar ficar sujando seu arquivo página.
  */

  const [example, setExample] = useState(0)

  return {
    example,
    setExample,
  }
}
