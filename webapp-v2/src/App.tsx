import Dashboard from "./components/app/Dashboard";
import Team from "./components/app/Team";
import NotFound from "./components/app/NotFound";
import NextSchedule from "./components/app/NextSchedule";
import { Routes, Route } from "react-router-dom";
import NavbarLayout from "./components/layouts/NavbarLayout";
import Home from "./components/home/Home";
import RequireAuth from "./components/auth/RequireAuth";
import { ROLES } from "./lib/roles";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Unauthorized from "./components/auth/Unauthorized";

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
