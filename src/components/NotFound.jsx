import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to='/' className="p-4 border border-[#2874f0] text-white bg-[#2874f0]
       hover:bg-white hover:text-[#2874f0] rounded-lg">Back to Home page</Link>
   </div>
  );
}

export default NotFound;
