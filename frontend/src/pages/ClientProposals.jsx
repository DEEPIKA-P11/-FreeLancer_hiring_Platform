import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ClientProposals() {
  const { projectId } = useParams();

  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchProposals = async () => {
    try {
      const response = await api.get(
        `/proposals/project/${projectId}`
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

  useEffect(() => {
    fetchProposals();
  }, [projectId]);

  const handleAccept = async (proposalId) => {
    setMessage("");
    setError("");

    try {
      await api.put(
        `/proposals/${proposalId}/accept`
      );

      setMessage("Proposal accepted successfully");

      await fetchProposals();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to accept proposal"
      );
    }
  };

  const handleReject = async (proposalId) => {
    setMessage("");
    setError("");

    try {
      await api.put(
        `/proposals/${proposalId}/reject`
      );

      setMessage("Proposal rejected successfully");

      await fetchProposals();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to reject proposal"
      );
    }
  };

  const handleCreateContract = async (proposalId) => {
    setMessage("");
    setError("");

    try {
      await api.post(
        `/contracts/proposal/${proposalId}`
      );

      setMessage("Contract created successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to create contract"
      );
    }
  };

  return (
    <div className="auth-page">
      <div
        className="auth-card"
        style={{ maxWidth: "700px" }}
      >
        <h1>Freelancer Hiring Platform</h1>

        <h2>Project Proposals</h2>

        <p>
          <strong>Project ID:</strong> {projectId}
        </p>

        {message && <p>{message}</p>}
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
                <strong>Freelancer ID:</strong>{" "}
                {proposal.freelancerId}
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
                <strong>Cover Letter:</strong>
              </p>

              <p>{proposal.coverLetter}</p>

              <p>
                <strong>Status:</strong>{" "}
                {proposal.status}
              </p>

              {proposal.status === "PENDING" && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      handleAccept(proposal.id)
                    }
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleReject(proposal.id)
                    }
                  >
                    Reject
                  </button>
                </div>
              )}

              {proposal.status === "ACCEPTED" && (
                <button
                  onClick={() =>
                    handleCreateContract(proposal.id)
                  }
                >
                  Create Contract
                </button>
              )}
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

export default ClientProposals;