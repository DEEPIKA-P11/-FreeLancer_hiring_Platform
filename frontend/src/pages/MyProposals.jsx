import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyProposals() {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await api.get(
          `/proposals/freelancer/${userId}`
        );

        setProposals(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to load proposals"
        );
      }
    };

    if (userId) {
      fetchProposals();
    }
  }, [userId]);

  return (
    <div className="auth-page">
      <div
        className="auth-card"
        style={{ maxWidth: "700px" }}
      >
        <h1>Freelancer Hiring Platform</h1>

        <h2>My Proposals</h2>

        {error && <p>{error}</p>}

        {proposals.length === 0 && !error ? (
          <p>No proposals found.</p>
        ) : (
          proposals.map((proposal) => (
            <div
              key={proposal.id}
              style={{
                border: "1px solid #ddd",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Project ID:</strong>{" "}
                {proposal.projectId}
              </p>

              <p>
                <strong>Bid Amount:</strong> ₹
                {proposal.bidAmount}
              </p>

              <p>
                <strong>Estimated Days:</strong>{" "}
                {proposal.estimatedDays}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {proposal.status}
              </p>

              <p>
                <strong>Cover Letter:</strong>
              </p>

              <p>{proposal.coverLetter}</p>
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

export default MyProposals;