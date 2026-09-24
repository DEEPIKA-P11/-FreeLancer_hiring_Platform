import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";

import FreelancerProjects from "./pages/FreelancerProjects";
import SubmitProposal from "./pages/SubmitProposal";
import MyProposals from "./pages/MyProposals";
import ClientProposals from "./pages/ClientProposals";

import ClientContracts from "./pages/ClientContracts";
import FreelancerContracts from "./pages/FreelancerContracts";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/client-dashboard"
          element={<ClientDashboard />}
        />

        <Route
          path="/freelancer-dashboard"
          element={<FreelancerDashboard />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/create-project"
          element={<CreateProject />}
        />

        <Route
          path="/my-projects"
          element={<MyProjects />}
        />

        <Route
          path="/freelancer-projects"
          element={<FreelancerProjects />}
        />

        <Route
          path="/submit-proposal/:projectId"
          element={<SubmitProposal />}
        />

        <Route
          path="/my-proposals"
          element={<MyProposals />}
        />

        <Route
          path="/client-proposals/:projectId"
          element={<ClientProposals />}
        />

        <Route
          path="/client-contracts"
          element={<ClientContracts />}
        />

        <Route
          path="/freelancer-contracts"
          element={<FreelancerContracts />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;