import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Todo from "./pages/Todo";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="navbar">
          <NavLink to="/" className="logo">
            TaskFlow
          </NavLink>

          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Tasks
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              History
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;