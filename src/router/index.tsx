/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter } from 'react-router-dom'

import { Home } from '../pages/home'

const router: any = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

export { router }
