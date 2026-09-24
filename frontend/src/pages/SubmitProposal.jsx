import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SubmitProposal() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverLetter: "",
    bidAmount: "",
    estimatedDays: "",
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
      const proposalData = {
        projectId: Number(projectId),
        coverLetter: formData.coverLetter,
        bidAmount: Number(formData.bidAmount),
        estimatedDays: Number(formData.estimatedDays),
      };

      const response = await api.post(
        "/proposals",
        proposalData
      );

      console.log("Created proposal:", response.data);

      setMessage("Proposal submitted successfully");

      setTimeout(() => {
        navigate("/my-proposals");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to submit proposal"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>Submit Proposal</h2>

        <form
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <label>Cover Letter</label>

          <textarea
            name="coverLetter"
            placeholder="Explain your experience and approach"
            value={formData.coverLetter}
            onChange={handleChange}
            rows="6"
            required
          />

          <label>Bid Amount</label>

          <input
            type="number"
            name="bidAmount"
            placeholder="Enter your bid"
            value={formData.bidAmount}
            onChange={handleChange}
            min="1"
            required
          />

          <label>Estimated Days</label>

          <input
            type="number"
            name="estimatedDays"
            placeholder="Enter estimated days"
            value={formData.estimatedDays}
            onChange={handleChange}
            min="1"
            required
          />

          <button type="submit">
            Submit Proposal
          </button>
        </form>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default SubmitProposal;