import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        deadline: formData.deadline,
      };

      const response = await api.post("/projects", projectData);

      setMessage("Project created successfully");

      console.log("Created project:", response.data);

      setTimeout(() => {
        navigate("/my-projects");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to create project"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>Create Project</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Project Title</label>

          <input
            type="text"
            name="title"
            placeholder="Enter project title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Describe your project"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <label>Budget</label>

          <input
            type="number"
            name="budget"
            placeholder="Enter budget"
            value={formData.budget}
            onChange={handleChange}
            min="1"
            required
          />

          <label>Deadline</label>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Project
          </button>
        </form>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default CreateProject;