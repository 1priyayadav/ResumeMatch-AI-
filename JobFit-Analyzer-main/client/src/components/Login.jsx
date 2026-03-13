import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";

const Login = () => {
  useEffect(() => {
    document.title = "JobFit Analyzer | Login";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("login/", { email, password });
      setIsLoading(false);
      setSuccess(response.data.message);
      setError("");
      setShowSuccessToast(true);
      window.location.href = "/";
    } catch (error) {
      setIsLoading(false);
      setSuccess("");
      setError(error.response.data.message);
      setShowErrorToast(true);
    }
  };

  const handleCloseErrorToast = () => {
    setError("");
    setShowErrorToast(false);
  };

  const handleCloseSuccessToast = () => {
    setSuccess("");
    setShowSuccessToast(false);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5 fade-in-up">
      <div
        className="glass-card p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center py-4 mb-3">
          <h2 className="mb-0 font-weight-bold">Welcome Back</h2>
          <p className="text-light opacity-75 mt-2">Sign in to your account</p>
        </div>
        <div className="card-body px-sm-4 pb-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-light opacity-75 ms-1">
                Username or Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control glass-input"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="form-label text-light opacity-75 ms-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-control glass-input"
                autoComplete="on"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`btn-glass-primary w-100 ${isLoading ? "disabled" : ""}`}
              >
                {isLoading ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm text-light me-2"
                      role="status"
                    ></div>
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast
        show={showErrorToast}
        onClose={handleCloseErrorToast}
        autohide
        delay={3000} // Set the duration here (in milliseconds)
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast.Header className="bg-danger text-white">
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

      <Toast
        show={showSuccessToast}
        onClose={handleCloseSuccessToast}
        autohide
        delay={3000} // Set the duration here (in milliseconds)
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast.Header className="bg-success text-white">
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{success}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Login;
