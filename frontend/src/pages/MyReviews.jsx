import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(
          `/reviews/reviewer/${userId}`
        );

        setReviews(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to load reviews"
        );
      }
    };

    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  return (
    <div className="auth-page">
      <div
        className="auth-card"
        style={{ maxWidth: "700px" }}
      >
        <h1>Freelancer Hiring Platform</h1>

        <h2>My Reviews</h2>

        {error && <p>{error}</p>}

        {reviews.length === 0 && !error ? (
          <p>No reviews found.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              style={{
                border: "1px solid #ddd",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>Review #{review.id}</h3>

              <p>
                <strong>Contract ID:</strong>{" "}
                {review.contractId}
              </p>

              <p>
                <strong>Project ID:</strong>{" "}
                {review.projectId}
              </p>

              <p>
                <strong>Reviewed User ID:</strong>{" "}
                {review.reviewedUserId}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {review.rating} / 5
              </p>

              <p>
                <strong>Comment:</strong>
              </p>

              <p>{review.comment}</p>

              <p>
                <strong>Created:</strong>{" "}
                {review.createdAt}
              </p>
            </div>
          ))
        )}

        <Link to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default MyReviews;