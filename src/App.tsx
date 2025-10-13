import "./App.css";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
