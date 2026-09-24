function ClientDashboard() {
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>Client Dashboard</h2>

        <p>Welcome, {name}</p>

        <div>
          <button>Create Project</button>
          <button>My Projects</button>
          <button>Proposals</button>
          <button>Contracts</button>
          <button>Reviews</button>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ClientDashboard;