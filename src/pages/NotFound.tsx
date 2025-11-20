import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-full pt-16 pb-16 bg-yellow-300">
      <h2 className="text-2xl text-red-500">404 Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}
