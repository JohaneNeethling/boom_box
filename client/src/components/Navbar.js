import axios from "axios"; // Importing Axios for making HTTP requests
import { Link } from "react-router-dom"; // Importing Link component for navigation
import React, { useState } from "react"; // Importing React and useState hook for managing component state
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation
import "./Navbar.css"; // Importing CSS for styling the Navbar component

const Navbar = () => {
  // State to track if the user is logged in
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  // State to hold a message to display in a modal (pop-up)
  const [modalMessage, setModalMessage] = useState("");

  // Hook for navigating programmatically
  const navigate = useNavigate();

  // Function to show the modal with a given message
  const showModal = (message) => {
    setModalMessage(message);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalMessage("");
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // Sending a logout request to the server
      await axios.post("http://localhost:5000/auth/logout");

      // Updating the state to indicate the user is logged out
      setUserLoggedIn(false);

      // Removing user data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("searchTerm");

      console.log("Logged out successfully");

      // Redirecting to the login page
      navigate("/login");
    } catch (error) {
      // Logging the error and displaying a modal with an error message
      console.error("Error logging out:", error);
      showModal("Error logging out. Please try again later.");
    }
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav className="navigation">
        {/* Brand name */}
        <p className="nav-brand">BoomBox</p>

        {/* Container for navigation links */}
        <div className="link-container">
          {/* Link to the search page */}
          <Link to="/search" className="nav-link">
            Search
          </Link>

          {/* Link to the favorites page */}
          <Link to="/favoritespage" className="nav-link">
            Favorites
          </Link>

          {/* Logout button (only shown if user is logged in) */}
          {userLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Modal to display messages */}
      {modalMessage && (
        <div className="modal">
          <div className="modal-content">
            {/* Close button for the modal */}
            <span className="close" onClick={closeModal}>
              ×
            </span>
            {/* Modal message */}
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar; // Exporting the Navbar component for use in other parts of the app
