import { Link, useNavigate } from "react-router-dom";

function FreelancerDashboard() {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>Freelancer Dashboard</h2>

        <p>Welcome, {name}</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link to="/freelancer-projects">
            <button>Browse Projects</button>
          </Link>

          <Link to="/my-proposals">
            <button>My Proposals</button>
          </Link>

          <Link to="/freelancer-contracts">
            <button>My Contracts</button>
          </Link>

          <Link to="/my-reviews">
            <button>My Reviews</button>
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default FreelancerDashboard;