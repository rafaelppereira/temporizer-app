import { z } from 'zod'

/*
  💡 Esse arquivo é de configurações do zod, para que a 
  aplicação não seja possível executar sem as variáveis desejadas,
  isso diminui o risco de erros na aplicação.
*/

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

export const env = envSchema.parse(import.meta.env)
