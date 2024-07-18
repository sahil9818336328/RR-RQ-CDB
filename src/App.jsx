import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  Newsletter,
  SinglePageError,
} from './pages'

import { loader as LandingLoader } from './pages/Landing'
import { loader as SingleCocktailLoader } from './pages/Cocktail'
import { action as newsLetterAction } from './pages/Newsletter'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: LandingLoader(queryClient),
        element: <Landing />,
        errorElement: <SinglePageError />,
      },
      {
        path: 'cocktail/:id',
        loader: SingleCocktailLoader(queryClient),
        errorElement: <SinglePageError />,
        element: <Cocktail />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsLetterAction,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
export default App
