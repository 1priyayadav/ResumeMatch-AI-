import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarCompo = ({ isLogged, children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("logout");
      console.log(response.data);
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-overlay position-fixed top-0 start-0 h-100 w-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Navbar expand="lg" className="glass-navbar mb-4" sticky="top" variant="dark">
            <Container>
              <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
                <i className="bi bi-briefcase-fill text-primary"></i>
                JobFit Analyzer
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" />
                <Nav className="justify-content-end align-items-center gap-2">
                  <Nav.Link as={Link} to="/" className="px-3">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about" className="px-3">
                    About
                  </Nav.Link>

                  {isLogged ? (
                    <>
                      <Nav.Link as={Link} to="/history" className="px-3">
                        History
                      </Nav.Link>
                      <NavDropdown title="Profile" id="basic-nav-dropdown" align="end" className="ms-2">
                        <NavDropdown.Item as={Link} to="/account">
                          <i className="bi bi-person me-2"></i>Account
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout} className="text-danger">
                          <i className="bi bi-box-arrow-right me-2"></i>Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <div className="d-flex gap-3 ms-lg-3 mt-3 mt-lg-0">
                      <Nav.Link as={Link} to="/login" className="btn-glass-ghost px-4 py-2 m-0 text-center">
                        Login
                      </Nav.Link>
                      <Nav.Link as={Link} to="/register" className="btn-glass-primary px-4 py-2 m-0 text-white text-center">
                        Sign Up
                      </Nav.Link>
                    </div>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {children}
        </>
      )}
    </>
  );
};

export default NavbarCompo;
