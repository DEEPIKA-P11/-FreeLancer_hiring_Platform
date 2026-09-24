import { Navigate } from "react-router-dom";

function Dashboard() {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "CLIENT") {
    return <Navigate to="/client-dashboard" replace />;
  }

  if (role === "FREELANCER") {
    return <Navigate to="/freelancer-dashboard" replace />;
  }

  if (role === "ADMIN") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

export default Dashboard;