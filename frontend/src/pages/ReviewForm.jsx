import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ReviewForm() {
  const { contractId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
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
      const reviewData = {
        contractId: Number(contractId),
        rating: Number(formData.rating),
        comment: formData.comment,
      };

      const response = await api.post("/reviews", reviewData);

      console.log("Review created:", response.data);

      setMessage("Review submitted successfully");

      setTimeout(() => {
        navigate("/my-reviews");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to submit review"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Freelancer Hiring Platform</h1>

        <h2>Write a Review</h2>

        <p>
          <strong>Contract ID:</strong> {contractId}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Rating</label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>

          <label>Comment</label>

          <textarea
            name="comment"
            placeholder="Write your review"
            value={formData.comment}
            onChange={handleChange}
            rows="6"
            required
          />

          <button type="submit">
            Submit Review
          </button>
        </form>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default ReviewForm;