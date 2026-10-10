import { useState } from "react";
import "../styles/completed.css";

const initialCompleted = [
  {
    id: 1,
    title: "Mathematics Exercises",
    subject: "Mathematics",
    completedAt: "Today",
    type: "Homework",
  },
  {
    id: 2,
    title: "English Reading",
    subject: "English",
    completedAt: "Yesterday",
    type: "Task",
  },
  {
    id: 3,
    title: "Science Questions",
    subject: "Science",
    completedAt: "Monday",
    type: "Homework",
  },
];

function Completed() {
  const [completedItems, setCompletedItems] =
    useState(initialCompleted);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const deleteCompleted = (id) => {
    setCompletedItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const filteredItems = completedItems.filter(
    (item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.subject
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" ||
        item.type === typeFilter;

      return matchesSearch && matchesType;
    }
  );

  return (
    <main className="completed-page">
      {/* HEADER */}

      <section className="completed-header">
        <div>
          <span className="section-label">
            YOUR PROGRESS
          </span>

          <h1>Completed</h1>

          <p>
            Look at everything you've already
            accomplished.
          </p>
        </div>

        <div className="completed-total">
          <strong>{completedItems.length}</strong>
          <span>completed</span>
        </div>
      </section>

      {/* MOTIVATION */}

      <section className="completed-message">
        <div className="completed-message-icon">
          ✓
        </div>

        <div>
          <h2>Keep going.</h2>

          <p>
            Every finished task is one less thing
            waiting for you.
          </p>
        </div>
      </section>

      {/* TOOLBAR */}

      <section className="completed-toolbar">
        <div className="completed-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search completed work..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="completed-filters">
          {["All", "Task", "Homework"].map(
            (type) => (
              <button
                key={type}
                className={
                  typeFilter === type
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setTypeFilter(type)
                }
              >
                {type}
              </button>
            )
          )}
        </div>
      </section>

      {/* LIST */}

      <section className="completed-list">
        {filteredItems.length === 0 ? (
          <div className="completed-empty">
            <div className="completed-empty-icon">
              ✓
            </div>

            <h2>No completed work found.</h2>

            <p>
              Try another search or filter.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <article
              className="completed-card"
              key={item.id}
            >
              <div className="completed-check">
                ✓
              </div>

              <div className="completed-info">
                <div className="completed-title-row">
                  <h2>{item.title}</h2>

                  <span className="completed-type">
                    {item.type}
                  </span>
                </div>

                <div className="completed-meta">
                  <span>{item.subject}</span>

                  <span className="completed-dot">
                    •
                  </span>

                  <span>
                    Completed {item.completedAt}
                  </span>
                </div>
              </div>

              <button
                className="completed-delete"
                onClick={() =>
                  deleteCompleted(item.id)
                }
                aria-label="Remove completed item"
              >
                ×
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default Completed;