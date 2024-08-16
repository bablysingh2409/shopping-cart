import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import ProductList from "./pages/ProductList";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/", element: <ProductList /> },
        { path: "/cart", element: <Cart/> },
      ],
      errorElement: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
