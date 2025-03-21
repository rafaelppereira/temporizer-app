import axios from 'axios'

import { env } from '../env'

/*
  💡 Esse é o arquivo de configurações do axios, ele permite
  que seja possível bater em uma api por meio da costante `api`

  EXAMPLE: api.get(`/users`).then(response => response.json())

  E também traz uma alternativa que é o delay, onde define um intervalo
  para simular a demora de uma internet do usuário.
*/

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

if (env.VITE_ENABLE_API_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}
