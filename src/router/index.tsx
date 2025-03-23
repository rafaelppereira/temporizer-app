/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createHashRouter } from 'react-router-dom'

import { Home } from '../pages/home'

const router: any = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
])

export { router }
