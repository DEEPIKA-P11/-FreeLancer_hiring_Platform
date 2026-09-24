import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function FreelancerContracts() {
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchContracts = async () => {
    try {
      const response = await api.get(
        `/contracts/freelancer/${userId}`
      );

      setContracts(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to load contracts"
      );
    }
  };

  useEffect(() => {
    if (userId) {
      fetchContracts();
    }
  }, [userId]);

  const handleComplete = async (contractId) => {
    setError("");
    setMessage("");

    try {
      await api.put(
        `/contracts/${contractId}/status`,
        null,
        {
          params: {
            status: "COMPLETED",
          },
        }
      );

      setMessage("Contract completed successfully");

      await fetchContracts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Failed to update contract"
      );
    }
  };

  return (
    <div className="auth-page">
      <div
        className="auth-card"
        style={{ maxWidth: "750px" }}
      >
        <h1>Freelancer Hiring Platform</h1>

        <h2>My Contracts</h2>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}

        {contracts.length === 0 && !error ? (
          <p>No contracts found.</p>
        ) : (
          contracts.map((contract) => (
            <div
              key={contract.id}
              style={{
                border: "1px solid #ddd",
                padding: "18px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>Contract #{contract.id}</h3>

              <p>
                <strong>Project ID:</strong>{" "}
                {contract.projectId}
              </p>

              <p>
                <strong>Proposal ID:</strong>{" "}
                {contract.proposalId}
              </p>

              <p>
                <strong>Client ID:</strong>{" "}
                {contract.clientId}
              </p>

              <p>
                <strong>Agreed Amount:</strong> ₹
                {contract.agreedAmount}
              </p>

              <p>
                <strong>Start Date:</strong>{" "}
                {contract.startDate}
              </p>

              <p>
                <strong>Expected End Date:</strong>{" "}
                {contract.expectedEndDate}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {contract.status}
              </p>

              {contract.status === "ACTIVE" && (
                <button
                  onClick={() =>
                    handleComplete(contract.id)
                  }
                >
                  Mark Completed
                </button>
              )}

              {contract.status === "COMPLETED" && (
                <div style={{ marginTop: "10px" }}>
                  <Link to={`/write-review/${contract.id}`}>
                    <button>
                      Review Client
                    </button>
                  </Link>
                </div>
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

export default FreelancerContracts;