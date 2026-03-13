import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Form,
  Button,
  Modal,
  Toast,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Account = () => {
  useEffect(() => {
    document.title = "JobFit Analyzer | Profile";
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const getUserProfile = async () => {
    try {
      const response = await axios.get("profile/");
      setUser({ name: response.data.username, email: response.data.email });
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !oldPassword) {
      setSuccess("");
      setError("All fields are required");
      setShowErrorToast(true);
      return;
    }

    // Other form validation checks here...
    const trimmedNewPassword = newPassword.trim();
    if (trimmedNewPassword.length < 5) {
      setSuccess("");
      setError("Password must be at least 5 characters long");
      setShowErrorToast(true);
      return;
    }

    try {
      setIsResettingPassword(true);
      const res = await axios.put(`profile/resetpassword/`, {
        oldPassword,
        newPassword: trimmedNewPassword,
      });
      setIsResettingPassword(false);
      setSuccess("Password reset successful");
      setError("");
      setNewPassword("");
      setOldPassword("");
      setShowSuccessToast(true);
      console.log(res.data.message);
    } catch (err) {
      setIsResettingPassword(false);
      setSuccess("");
      setError("*" + err.response.data.message);
      setShowErrorToast(true);
    }
  };

  const handleDeleteAccount = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeletingAccount(true);
      const res = await axios.delete("profile/delete/");
      setTimeout(() => {
        setIsDeletingAccount(false);
        setSuccess("Account deleted successfully");
        setError("");
        setShowConfirmation(false);
        setShowSuccessToast(true);
        console.log(res.data.message);
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      setIsDeletingAccount(false);
      setError("*" + err.response.data.message);
      setShowErrorToast(true);
      setSuccess("");
      setShowConfirmation(false);
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

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-overlay position-fixed top-0 start-0 h-100 w-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Container className="d-flex justify-content-center align-items-center mt-5 mb-5 fade-in-up">
          <div
            className="glass-card p-4"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <div className="card-body px-sm-4 pb-4">
              <div className="text-center py-4 mb-3">
                <h1 className="mb-0 font-weight-bold">Profile</h1>
                <p className="text-light opacity-75 mt-2">Manage your account settings</p>
              </div>
              <Form>
                <Form.Group controlId="formName" className="mb-4">
                  <Form.Label className="text-light opacity-75 ms-1">Username</Form.Label>
                  <Form.Control type="text" value={user.name} disabled className="glass-input text-white" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label className="text-light opacity-75 ms-1">Email</Form.Label>
                  <Form.Control type="email" value={user.email} disabled className="glass-input text-white" />
                </Form.Group>

                <Form.Group controlId="formOldPassword" className="mb-4">
                  <Form.Label className="text-light opacity-75 ms-1">Old Password</Form.Label>
                  <Form.Control
                    autoComplete="on"
                    type="password"
                    value={oldPassword}
                    className="glass-input text-white"
                    placeholder="Old Password"
                    required
                    onChange={handleOldPasswordChange}
                  />
                </Form.Group>
                <Form.Group controlId="formNewPassword" className="mb-5">
                  <Form.Label className="text-light opacity-75 ms-1">New Password</Form.Label>
                  <Form.Control
                    autoComplete="on"
                    type="password"
                    value={newPassword}
                    className="glass-input text-white"
                    placeholder="New Password"
                    onChange={handleNewPasswordChange}
                    required
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="dark"
                    className={`btn-glass-primary w-100 ${isResettingPassword ? "disabled" : ""}`}
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm text-light me-2"
                          role="status"
                        ></div>
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>
                <hr className="my-5 border-light opacity-25" />
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    variant="outline-danger"
                    className="mt-2 d-flex align-items-center gap-2"
                    onClick={handleDeleteAccount}
                    disabled={isDeletingAccount}
                  >
                    <FaTrash /> Delete Account
                  </Button>

                  <Modal
                    show={showConfirmation}
                    onHide={handleCloseConfirmation}
                    centered
                    contentClassName="glass-card"
                  >
                    <Modal.Header closeButton closeVariant="white" className="border-bottom border-secondary border-opacity-25">
                      <Modal.Title className="text-white">Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-light">
                      Are you sure you want to delete your account? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer className="border-top border-secondary border-opacity-25">
                      <Button
                        variant="secondary"
                        className="btn-glass-ghost"
                        onClick={handleCloseConfirmation}
                        disabled={isDeletingAccount}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={handleConfirmDelete}
                        disabled={isDeletingAccount}
                      >
                        {isDeletingAccount ? (
                          <>
                            <div
                              className="spinner-border spinner-border-sm text-light me-2"
                              role="status"
                            ></div>
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Form>
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
        </Container>
      )}
    </>
  );
};

export default Account;
