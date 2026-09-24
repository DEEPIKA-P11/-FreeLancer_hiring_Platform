function AdminDashboard() {
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>Admin Dashboard</h2>

        <p>Welcome, {name}</p>

        <div>
          <button>Users</button>
          <button>Projects</button>
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

export default AdminDashboard;