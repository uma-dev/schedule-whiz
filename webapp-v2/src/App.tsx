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
import Unauthorized from "./components/Unauthorized";
import { ROLES } from "./lib/roles";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected routes */}
      {/* <Route element={<PersistLogin />}> */}
      <Route path="/" element={<NavbarLayout />}>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="team" element={<Team />} />
        </Route>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
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
