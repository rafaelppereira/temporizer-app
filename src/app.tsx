import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from './@config/lib/react-query'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from './components/ui/sonner'
import { router } from './router'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Temporizer - App de controle de tempo" />
      <ThemeProvider storageKey="temporizer" defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />

          <Toaster richColors position="bottom-left" />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
