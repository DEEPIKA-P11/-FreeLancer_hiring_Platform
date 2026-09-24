import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (loading) {
      return;
    }

    if (!email) {
      setError("Email is missing. Please register again.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/verify-otp", {
        email: email,
        otp: otp,
      });

      setMessage(
        response.data.message || "Registration successful!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      console.error("OTP verification error:", err);

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Unexpected error occurred"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Freelancer Hiring Platform</h1>

        <h2>Verify Email</h2>

        <p>
          Enter the 6-digit OTP sent to:
        </p>

        <p>
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify} className="auth-form">

          <label>OTP</label>

          <input
            type="text"
            name="otp"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        {message && (
          <p style={{ color: "green" }}>
            {message}
          </p>
        )}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

      </div>
    </div>
  );
}

export default VerifyOtp;