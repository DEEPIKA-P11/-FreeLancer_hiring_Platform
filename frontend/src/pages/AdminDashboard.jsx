import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [activeSection, setActiveSection] = useState("users");
  const [error, setError] = useState("");

  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/login");
    }
  }, [role, navigate]);

  const fetchUsers = async () => {
    try {
      setError("");

      const response = await api.get("/admin/users");

      setUsers(response.data);
      setActiveSection("users");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load users"
      );
    }
  };

  const fetchProjects = async () => {
    try {
      setError("");

      const response = await api.get("/admin/projects");

      setProjects(response.data);
      setActiveSection("projects");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load projects"
      );
    }
  };

  const fetchProposals = async () => {
    try {
      setError("");

      const response = await api.get("/admin/proposals");

      setProposals(response.data);
      setActiveSection("proposals");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load proposals"
      );
    }
  };

  const fetchContracts = async () => {
    try {
      setError("");

      const response = await api.get("/admin/contracts");

      setContracts(response.data);
      setActiveSection("contracts");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load contracts"
      );
    }
  };

  const fetchReviews = async () => {
    try {
      setError("");

      const response = await api.get("/admin/reviews");

      setReviews(response.data);
      setActiveSection("reviews");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load reviews"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (role !== "ADMIN") {
    return null;
  }

  return (
    <div className="auth-page">
      <div
        className="auth-card"
        style={{ maxWidth: "900px" }}
      >
        <h1>Freelancer Hiring Platform</h1>

        <h2>Admin Dashboard</h2>

        <p>Welcome, {name}</p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button onClick={fetchUsers}>
            Users
          </button>

          <button onClick={fetchProjects}>
            Projects
          </button>

          <button onClick={fetchProposals}>
            Proposals
          </button>

          <button onClick={fetchContracts}>
            Contracts
          </button>

          <button onClick={fetchReviews}>
            Reviews
          </button>
        </div>

        {error && <p>{error}</p>}

        {activeSection === "users" && (
          <div>
            <h3>Users</h3>

            {users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>ID:</strong> {user.id}
                  </p>

                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>

                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === "projects" && (
          <div>
            <h3>Projects</h3>

            {projects.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <h4>{project.title}</h4>

                  <p>{project.description}</p>

                  <p>
                    <strong>Budget:</strong> ₹
                    {project.budget}
                  </p>

                  <p>
                    <strong>Client ID:</strong>{" "}
                    {project.clientId}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {project.deadline}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {project.status}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === "proposals" && (
          <div>
            <h3>Proposals</h3>

            {proposals.length === 0 ? (
              <p>No proposals found.</p>
            ) : (
              proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>Proposal ID:</strong>{" "}
                    {proposal.id}
                  </p>

                  <p>
                    <strong>Project ID:</strong>{" "}
                    {proposal.projectId}
                  </p>

                  <p>
                    <strong>Freelancer ID:</strong>{" "}
                    {proposal.freelancerId}
                  </p>

                  <p>
                    <strong>Bid Amount:</strong> ₹
                    {proposal.bidAmount}
                  </p>

                  <p>
                    <strong>Estimated Days:</strong>{" "}
                    {proposal.estimatedDays}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {proposal.status}
                  </p>

                  <p>
                    <strong>Cover Letter:</strong>
                  </p>

                  <p>{proposal.coverLetter}</p>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === "contracts" && (
          <div>
            <h3>Contracts</h3>

            {contracts.length === 0 ? (
              <p>No contracts found.</p>
            ) : (
              contracts.map((contract) => (
                <div
                  key={contract.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>Contract ID:</strong>{" "}
                    {contract.id}
                  </p>

                  <p>
                    <strong>Project ID:</strong>{" "}
                    {contract.projectId}
                  </p>

                  <p>
                    <strong>Proposal ID:</strong>{" "}
                    {contract.proposalId}
                  </p>

                  <p>
                    <strong>Client ID:</strong>{" "}
                    {contract.clientId}
                  </p>

                  <p>
                    <strong>Freelancer ID:</strong>{" "}
                    {contract.freelancerId}
                  </p>

                  <p>
                    <strong>Agreed Amount:</strong> ₹
                    {contract.agreedAmount}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {contract.status}
                  </p>

                  <p>
                    <strong>Start Date:</strong>{" "}
                    {contract.startDate}
                  </p>

                  <p>
                    <strong>Expected End Date:</strong>{" "}
                    {contract.expectedEndDate}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === "reviews" && (
          <div>
            <h3>Reviews</h3>

            {reviews.length === 0 ? (
              <p>No reviews found.</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>Review ID:</strong>{" "}
                    {review.id}
                  </p>

                  <p>
                    <strong>Contract ID:</strong>{" "}
                    {review.contractId}
                  </p>

                  <p>
                    <strong>Project ID:</strong>{" "}
                    {review.projectId}
                  </p>

                  <p>
                    <strong>Reviewer ID:</strong>{" "}
                    {review.reviewerId}
                  </p>

                  <p>
                    <strong>Reviewed User ID:</strong>{" "}
                    {review.reviewedUserId}
                  </p>

                  <p>
                    <strong>Rating:</strong>{" "}
                    {review.rating} / 5
                  </p>

                  <p>
                    <strong>Comment:</strong>
                  </p>

                  <p>{review.comment}</p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {review.createdAt}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{ marginTop: "20px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;