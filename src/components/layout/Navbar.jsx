import { useLocation } from "react-router-dom";

const pageNames = {
  "/": "Dashboard",
  "/tasks": "Tasks",
  "/homework": "Homework",
  "/completed": "Completed",
  "/notifications": "Notifications",
};

function Navbar() {
  const location = useLocation();

  const currentPage = pageNames[location.pathname] || "Dashboard";

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <div className="mobile-logo">
          <span className="logo-mark">S</span>
        </div>

        <div className="page-heading">
          <span className="page-heading-label">Your workspace</span>
          <h2>{currentPage}</h2>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-date">
          <span className="date-dot" />
          <span>{today}</span>
        </div>

        <button className="notification-button" aria-label="Notifications">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>

          <span className="notification-dot" />
        </button>

        <div className="profile">
          <div className="profile-avatar">S</div>

          <div className="profile-info">
            <span className="profile-name">Student</span>
            <span className="profile-status">Ready to focus</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;