import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Home",
    path: "/",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9.5 21v-7h5v7" />
      </svg>
    ),
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="m8 12 2.2 2.2L16 8.5" />
      </svg>
    ),
  },
  {
    label: "Homework",
    path: "/homework",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    label: "Completed",
    path: "/completed",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12 2.3 2.3 4.7-5" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <span>S</span>
        </div>

        <div>
          <h1>Secondary</h1>
          <span>Year One</span>
        </div>
      </div>

      <div className="sidebar-section-label">Workspace</div>

      <nav className="sidebar-navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="focus-card">
          <div className="focus-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 3v18M3 12h18" />
              <circle cx="12" cy="12" r="7" />
            </svg>
          </div>

          <div>
            <strong>Stay focused.</strong>
            <span>One thing at a time.</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <span>Personal Student Space</span>
          <span className="gold-dot" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;