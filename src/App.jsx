import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import ProductList from "./pages/ProductList";
// import { ProductDetails } from "./components/Product";
import NotFound from "./components/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/", element: <ProductList /> },
        // { path: "/item-details/:id", element: <ProductDetails /> },
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
