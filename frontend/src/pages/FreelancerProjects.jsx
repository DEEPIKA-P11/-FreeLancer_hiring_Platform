import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function FreelancerProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        setProjects(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to load projects"
        );
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="auth-page">
      <div
        className="auth-card"
        style={{ maxWidth: "700px" }}
      >
        <h1>Freelancer Hiring Platform</h1>
        <h2>Browse Projects</h2>

        {error && <p>{error}</p>}

        {projects.length === 0 && !error ? (
          <p>No projects available.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              style={{
                border: "1px solid #ddd",
                padding: "18px",
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

              {project.status === "POSTED" && (
                <Link to={`/submit-proposal/${project.id}`}>
                  <button>Submit Proposal</button>
                </Link>
              )}
            </div>
          ))
        )}

        <Link to="/freelancer-dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default FreelancerProjects;