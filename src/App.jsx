import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import ProductList from "./pages/ProductList";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/", element: <ProductList /> },
        { path: "/cart", element: <Cart/> },
        { path: "/checkout-success", element: <CheckoutSuccess/> },
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
