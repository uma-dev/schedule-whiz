import Dashboard from "./components/Dashboard";
import Team from "./components/Team";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import NextSchedule from "./components/NextSchedule";
import { Routes, Route } from "react-router-dom";
import NavbarLayout from "./components/layouts/NavbarLayout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      {/* <Route element={<PersistLogin />}> */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<NavbarLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="team" element={<Team />} />
          <Route path="next-schedule" element={<NextSchedule />} />
        </Route>
      </Route>
      {/* </Route> */}

      {/* Catch all non existing paths */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
