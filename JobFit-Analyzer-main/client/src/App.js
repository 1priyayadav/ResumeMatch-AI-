import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarCompo from "./components/NavbarCompo";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import axios from "axios";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import History from "./components/History";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // base url to make request to the server
  axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1/";

  // alow sending cookies
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const res = await axios.get("loggedin");
        setIsLoggedIn(res.data.auth);
      } catch (error) {
        console.log(error);
      }
    };
    checkIsLoggedIn();
  }, []);

  return (
    <>
      {/* Background animated glows */}
      <div className="bg-glow-wrapper">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>
      
      <Router>
        <NavbarCompo isLogged={isLoggedIn}>
          <div className="container mt-4 mb-5 fade-in-up">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes (account) */}
              <Route element={<ProtectedRoutes checkIsLoggedIn={isLoggedIn} />}>
                <Route path="/account" element={<Account />} />
                <Route path="/history" element={<History />} />
              </Route>
            </Routes>
          </div>
        </NavbarCompo>
      </Router>
    </>
  );
};

export default App;
