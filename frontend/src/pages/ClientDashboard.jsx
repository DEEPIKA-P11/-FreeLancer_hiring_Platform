import { Link, useNavigate } from "react-router-dom";

function ClientDashboard() {
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

        <h2>Client Dashboard</h2>

        <p>Welcome, {name}</p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Link to="/create-project">
            <button>Create Project</button>
          </Link>

          <Link to="/my-projects">
            <button>My Projects</button>
          </Link>

          <button>Proposals</button>

          <button>Contracts</button>

          <button>Reviews</button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;