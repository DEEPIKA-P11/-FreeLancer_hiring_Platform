import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function WriteReview() {
  const { contractId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setError("");

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/reviews", {
        contractId: Number(contractId),
        rating: Number(rating),
        comment: comment.trim(),
      });

      setMessage("Review submitted successfully!");

      setTimeout(() => {
        navigate("/client-contracts");
      }, 1000);

    } catch (err) {
      console.error("Review error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to submit review.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          Review Freelancer
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          Contract #{contractId}
        </p>

        {message && (
          <div
            style={{
              background: "#e8f7e8",
              color: "#247524",
              padding: "12px",
              marginTop: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#fdecec",
              color: "#b42318",
              padding: "12px",
              marginTop: "20px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: "25px" }}>

          <label style={{ fontWeight: "bold" }}>
            Rating
          </label>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "10px",
              marginBottom: "25px",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "32px",
                  cursor: "pointer",
                }}
              >
                {star <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>

          <p>Selected Rating: {rating}/5</p>

          <label
            htmlFor="comment"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Comment
          </label>

          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="6"
            placeholder="Write your feedback..."
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxSizing: "border-box",
              fontSize: "15px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: loading ? "#999" : "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/client-contracts")}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "white",
            cursor: "pointer",
          }}
        >
          Back to Contracts
        </button>
      </div>
    </div>
  );
}

export default WriteReview;
