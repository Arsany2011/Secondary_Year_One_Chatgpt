import { useState } from "react";
import "../styles/homework.css";

const initialHomework = [
  {
    id: 1,
    title: "Mathematics Exercises",
    subject: "Mathematics",
    due: "Today",
    priority: "High",
    status: "In Progress",
    progress: 60,
  },
  {
    id: 2,
    title: "English Reading",
    subject: "English",
    due: "Tomorrow",
    priority: "Medium",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 3,
    title: "Science Questions",
    subject: "Science",
    due: "Friday",
    priority: "Low",
    status: "Completed",
    progress: 100,
  },
];

function Homework() {
  const [homework, setHomework] =
    useState(initialHomework);

  const [filter, setFilter] = useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [newHomework, setNewHomework] = useState({
    title: "",
    subject: "",
    due: "",
    priority: "Medium",
  });

  const updateHomework = (id, changes) => {
    setHomework((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, ...changes }
          : item
      )
    );
  };

  const deleteHomework = (id) => {
    setHomework((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setNewHomework((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const addHomework = (event) => {
    event.preventDefault();

    if (!newHomework.title.trim()) return;

    const item = {
      id: Date.now(),
      title: newHomework.title.trim(),
      subject:
        newHomework.subject.trim() || "General",
      due: newHomework.due || "No date",
      priority: newHomework.priority,
      status: "Not Started",
      progress: 0,
    };

    setHomework((current) => [
      item,
      ...current,
    ]);

    setNewHomework({
      title: "",
      subject: "",
      due: "",
      priority: "Medium",
    });

    setShowModal(false);
  };

  const filteredHomework =
    filter === "All"
      ? homework
      : homework.filter(
          (item) => item.status === filter
        );

  const completedCount = homework.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgressCount = homework.filter(
    (item) => item.status === "In Progress"
  ).length;

  const remainingCount =
    homework.length - completedCount;

  return (
    <main className="homework-page">
      {/* HEADER */}

      <section className="homework-header">
        <div>
          <span className="section-label">
            SCHOOL WORK
          </span>

          <h1>Homework</h1>

          <p>
            Stay ahead of your assignments.
          </p>
        </div>

        <button
          className="add-homework-button"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Add homework
        </button>
      </section>

      {/* STATS */}

      <section className="homework-overview">
        <div className="homework-stat">
          <span>TOTAL</span>
          <strong>{homework.length}</strong>
        </div>

        <div className="homework-stat">
          <span>IN PROGRESS</span>
          <strong>{inProgressCount}</strong>
        </div>

        <div className="homework-stat">
          <span>COMPLETED</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="homework-stat">
          <span>REMAINING</span>
          <strong>{remainingCount}</strong>
        </div>
      </section>

      {/* FILTERS */}

      <section className="homework-toolbar">
        <div className="homework-filters">
          {[
            "All",
            "Not Started",
            "In Progress",
            "Completed",
          ].map((item) => (
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

        <span className="homework-count">
          {filteredHomework.length}{" "}
          {filteredHomework.length === 1
            ? "assignment"
            : "assignments"}
        </span>
      </section>

      {/* HOMEWORK LIST */}

      <section className="homework-list">
        {filteredHomework.length === 0 ? (
          <div className="empty-homework">
            <div className="empty-homework-icon">
              ✓
            </div>

            <h2>Nothing here.</h2>

            <p>
              You don't have any homework in this
              category.
            </p>
          </div>
        ) : (
          filteredHomework.map((item) => (
            <article
              className={`homework-card ${
                item.status === "Completed"
                  ? "is-completed"
                  : ""
              }`}
              key={item.id}
            >
              <div className="homework-card-top">
                <div className="homework-info">
                  <div className="homework-title-row">
                    <h2>{item.title}</h2>

                    <span
                      className={`homework-priority ${item.priority.toLowerCase()}`}
                    >
                      {item.priority}
                    </span>
                  </div>

                  <div className="homework-meta">
                    <span>{item.subject}</span>

                    <span className="homework-dot">
                      •
                    </span>

                    <span>
                      Due {item.due}
                    </span>
                  </div>
                </div>

                <button
                  className="homework-delete"
                  onClick={() =>
                    deleteHomework(item.id)
                  }
                  aria-label="Delete homework"
                >
                  ×
                </button>
              </div>

              {/* PROGRESS */}

              <div className="homework-progress-section">
                <div className="homework-progress-label">
                  <span>Progress</span>

                  <strong>
                    {item.progress}%
                  </strong>
                </div>

                <div className="homework-progress-track">
                  <div
                    className="homework-progress-fill"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* ACTIONS */}

              <div className="homework-actions">
                <select
                  value={item.status}
                  onChange={(event) => {
                    const status =
                      event.target.value;

                    const progress =
                      status === "Completed"
                        ? 100
                        : status ===
                          "Not Started"
                        ? 0
                        : Math.max(
                            item.progress,
                            10
                          );

                    updateHomework(item.id, {
                      status,
                      progress,
                    });
                  }}
                >
                  <option value="Not Started">
                    Not Started
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>

                {item.status !==
                  "Completed" && (
                  <button
                    className="progress-button"
                    onClick={() => {
                      const nextProgress =
                        Math.min(
                          item.progress + 10,
                          100
                        );

                      updateHomework(item.id, {
                        progress:
                          nextProgress,
                        status:
                          nextProgress === 100
                            ? "Completed"
                            : "In Progress",
                      });
                    }}
                  >
                    +10%
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </section>

      {/* ADD HOMEWORK MODAL */}

      {showModal && (
        <div
          className="homework-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowModal(false);
            }
          }}
        >
          <div className="homework-modal">
            <div className="homework-modal-header">
              <div>
                <span className="section-label">
                  NEW ASSIGNMENT
                </span>

                <h2>Add homework</h2>
              </div>

              <button
                className="homework-modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>
            </div>

            <form onSubmit={addHomework}>
              <label>
                Homework title

                <input
                  name="title"
                  value={newHomework.title}
                  onChange={handleInput}
                  placeholder="What is the assignment?"
                  autoFocus
                />
              </label>

              <label>
                Subject

                <input
                  name="subject"
                  value={newHomework.subject}
                  onChange={handleInput}
                  placeholder="e.g. Mathematics"
                />
              </label>

              <div className="homework-modal-row">
                <label>
                  Due date

                  <input
                    type="date"
                    name="due"
                    value={newHomework.due}
                    onChange={handleInput}
                  />
                </label>

                <label>
                  Priority

                  <select
                    name="priority"
                    value={
                      newHomework.priority
                    }
                    onChange={handleInput}
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>
                  </select>
                </label>
              </div>

              <div className="homework-modal-actions">
                <button
                  type="button"
                  className="homework-cancel"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="homework-save"
                >
                  Create homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Homework;