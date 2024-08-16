import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/Nav'

function App() {
  const router=createBrowserRouter([
    {path:'/',element:<Nav/>}
  ])

  return (
    <>
       <RouterProvider router={router}/>
    </>
  )
}

export default App
