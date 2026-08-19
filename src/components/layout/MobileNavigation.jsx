import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Home",
    path: "/",
    icon: "⌂",
  },
  {
    label: "Tasks",
    path: "/tasks",
    icon: "✓",
  },
  {
    label: "Homework",
    path: "/homework",
    icon: "▤",
  },
  {
    label: "Done",
    path: "/completed",
    icon: "○",
  },
  {
    label: "More",
    path: "/notifications",
    icon: "•",
  },
];

function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNavigation;