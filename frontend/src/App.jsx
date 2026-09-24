import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";

// Dashboard
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Project
import CreateProject from "./pages/CreateProject";
import MyProjects from "./pages/MyProjects";
import FreelancerProjects from "./pages/FreelancerProjects";

// Proposal
import SubmitProposal from "./pages/SubmitProposal";
import MyProposals from "./pages/MyProposals";
import ClientProposals from "./pages/ClientProposals";

// Contract
import ClientContracts from "./pages/ClientContracts";
import FreelancerContracts from "./pages/FreelancerContracts";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route
          path="/freelancer-dashboard"
          element={<FreelancerDashboard />}
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Client Project Routes */}
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/my-projects" element={<MyProjects />} />

        {/* Freelancer Project Routes */}
        <Route
          path="/freelancer-projects"
          element={<FreelancerProjects />}
        />

        {/* Proposal Routes */}
        <Route path="/submit-proposal" element={<SubmitProposal />} />
        <Route path="/my-proposals" element={<MyProposals />} />
        <Route path="/client-proposals" element={<ClientProposals />} />

        {/* Contract Routes */}
        <Route path="/client-contracts" element={<ClientContracts />} />
        <Route
          path="/freelancer-contracts"
          element={<FreelancerContracts />}
        />

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;