import { useState } from "react";
import "../styles/notifications.css";

const initialNotifications = [
  {
    id: 1,
    title: "Mathematics lesson",
    message: "Your Mathematics lesson is coming up tomorrow.",
    time: "Tomorrow · 09:00 AM",
    type: "Lesson",
    read: false,
  },
  {
    id: 2,
    title: "Homework due soon",
    message: "Your English homework is due tomorrow.",
    time: "Tomorrow",
    type: "Homework",
    read: false,
  },
  {
    id: 3,
    title: "Task completed",
    message: "You completed Mathematics Exercises.",
    time: "Today",
    type: "Task",
    read: true,
  },
  {
    id: 4,
    title: "Weekend is coming",
    message: "Keep going. Friday is getting closer.",
    time: "Friday",
    type: "Reminder",
    read: true,
  },
];

function Notifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const filteredNotifications =
    filter === "Unread"
      ? notifications.filter((item) => !item.read)
      : notifications;

  return (
    <main className="notifications-page">
      {/* HEADER */}

      <section className="notifications-header">
        <div>
          <span className="section-label">
            STAY UPDATED
          </span>

          <h1>Notifications</h1>

          <p>
            Important things you don't want to forget.
          </p>
        </div>

        <div className="notification-counter">
          <strong>{unreadCount}</strong>
          <span>unread</span>
        </div>
      </section>

      {/* TOP ACTIONS */}

      <section className="notifications-toolbar">
        <div className="notification-filters">
          {["All", "Unread"].map((item) => (
            <button
              key={item}
              className={
                filter === item ? "active" : ""
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {unreadCount > 0 && (
          <button
            className="mark-all-button"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </section>

      {/* NOTIFICATIONS */}

      <section className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="notifications-empty">
            <div className="notifications-empty-icon">
              ✓
            </div>

            <h2>You're all caught up.</h2>

            <p>
              There are no unread notifications.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <article
              key={notification.id}
              className={`notification-card ${
                notification.read ? "read" : "unread"
              }`}
            >
              <div className="notification-icon">
                {notification.type === "Lesson" && "◷"}
                {notification.type === "Homework" && "□"}
                {notification.type === "Task" && "✓"}
                {notification.type === "Reminder" && "!"}
              </div>

              <div className="notification-content">
                <div className="notification-title-row">
                  <h2>{notification.title}</h2>

                  {!notification.read && (
                    <span className="unread-dot" />
                  )}
                </div>

                <p>{notification.message}</p>

                <div className="notification-meta">
                  <span>
                    {notification.type}
                  </span>

                  <span className="notification-dot">
                    •
                  </span>

                  <span>
                    {notification.time}
                  </span>
                </div>
              </div>

              <div className="notification-actions">
                {!notification.read && (
                  <button
                    className="read-button"
                    onClick={() =>
                      markAsRead(notification.id)
                    }
                  >
                    Read
                  </button>
                )}

                <button
                  className="notification-delete"
                  onClick={() =>
                    deleteNotification(
                      notification.id
                    )
                  }
                  aria-label="Delete notification"
                >
                  ×
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Notifications;