import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import MyTeam from "./components/pages/MyTeam";
import Authentication from "./components/pages/Authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/my-team" element={<MyTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
