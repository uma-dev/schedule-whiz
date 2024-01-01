import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import MyTeam from "./components/pages/MyTeam";
import Authentication from "./components/pages/Authentication";
import RequireAuth from "./components/common/RequireAuth";
import Missing from "./components/common/Missing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/authentication" element={<Authentication />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-team" element={<MyTeam />} />
        </Route>

        {/* Catch all */}
        <Route path="/*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
