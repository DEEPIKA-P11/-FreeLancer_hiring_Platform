import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`/projects/client/${userId}`);

        setProjects(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to load projects"
        );
      }
    };

    if (userId) {
      fetchProjects();
    } else {
      setError("User not logged in");
    }
  }, [userId]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>My Projects</h2>

        {error && <p>{error}</p>}

        {projects.length === 0 && !error ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <p>
                <strong>Budget:</strong> ₹{project.budget}
              </p>

              <p>
                <strong>Deadline:</strong> {project.deadline}
              </p>

              <p>
                <strong>Status:</strong> {project.status}
              </p>
            </div>
          ))
        )}

        <Link to="/client-dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default MyProjects;