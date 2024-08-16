import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import ProductList from "./pages/ProductList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [{ path: "/", element: <ProductList /> }],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
