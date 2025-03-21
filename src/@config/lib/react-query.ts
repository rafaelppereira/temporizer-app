import { QueryClient } from '@tanstack/react-query'

/*
  💡 Essa é a configuração do client do React Query, ele
  é utilizado no provider que está no arquivo app.tsx para
  que os dados sejam cacheados com toda a aplicação.
*/

export const queryClient = new QueryClient()
