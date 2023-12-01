import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import MyTeam from "./components/pages/MyTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-team" element={<MyTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
