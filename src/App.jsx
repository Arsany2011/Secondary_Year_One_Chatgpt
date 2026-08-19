import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Homework from "./pages/Homework";
import Completed from "./pages/Completed";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/404" element={<NotFound />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />
    </Routes>
  );
}

export default App;