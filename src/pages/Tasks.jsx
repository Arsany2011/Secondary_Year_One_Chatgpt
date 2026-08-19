import { useState } from "react";
import "../styles/tasks.css";

const initialTasks = [
  {
    id: 1,
    title: "Study Mathematics",
    subject: "Mathematics",
    due: "Today",
    priority: "High",
    notes: "",
    completed: false,
  },
  {
    id: 2,
    title: "Read English chapter",
    subject: "English",
    due: "Tomorrow",
    priority: "Medium",
    notes: "",
    completed: false,
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    due: "",
    priority: "Medium",
    notes: "",
  });

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setNewTask((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const addTask = (event) => {
    event.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      subject: newTask.subject.trim() || "General",
      due: newTask.due || "No date",
      priority: newTask.priority,
      notes: newTask.notes.trim(),
      completed: false,
    };

    setTasks((current) => [task, ...current]);

    setNewTask({
      title: "",
      subject: "",
      due: "",
      priority: "Medium",
      notes: "",
    });

    setShowModal(false);
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="tasks-page">
      <section className="tasks-header">
        <div>
          <span className="section-label">
            YOUR WORKSPACE
          </span>

          <h1>Tasks</h1>

          <p>
            Keep track of what needs to be done.
          </p>
        </div>

        <button
          className="add-task-button"
          onClick={() => setShowModal(true)}
        >
          <span>+</span>
          Add task
        </button>
      </section>

      <section className="tasks-overview">
        <div className="task-stat">
          <span>ALL TASKS</span>
          <strong>{tasks.length}</strong>
        </div>

        <div className="task-stat">
          <span>COMPLETED</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="task-stat">
          <span>REMAINING</span>
          <strong>
            {tasks.length - completedCount}
          </strong>
        </div>
      </section>

      <section className="tasks-toolbar">
        <div className="task-filters">
          {["All", "Active", "Completed"].map(
            (item) => (
              <button
                key={item}
                className={
                  filter === item ? "active" : ""
                }
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            )
          )}
        </div>

        <span className="task-count">
          {filteredTasks.length}{" "}
          {filteredTasks.length === 1
            ? "task"
            : "tasks"}
        </span>
      </section>

      <section className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-tasks">
            <div className="empty-icon">✓</div>

            <h2>You're all caught up.</h2>

            <p>
              Nothing is waiting for you here.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <article
              className={`task-item ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >
              <button
                className="task-check"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "✓" : ""}
              </button>

              <div className="task-main">
                <div className="task-title-row">
                  <h2>{task.title}</h2>

                  <span
                    className={`priority ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div className="task-details">
                  <span>{task.subject}</span>

                  <span className="dot">•</span>

                  <span>{task.due}</span>
                </div>
              </div>

              <button
                className="task-delete"
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>
            </article>
          ))
        )}
      </section>

      {showModal && (
        <div
          className="task-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="task-modal">
            <div className="modal-header">
              <div>
                <span className="section-label">
                  NEW TASK
                </span>

                <h2>Add a task</h2>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={addTask}>
              <label>
                Task name
                <input
                  name="title"
                  value={newTask.title}
                  onChange={handleInput}
                  placeholder="What do you need to do?"
                  autoFocus
                />
              </label>

              <label>
                Subject
                <input
                  name="subject"
                  value={newTask.subject}
                  onChange={handleInput}
                  placeholder="e.g. Mathematics"
                />
              </label>

              <div className="modal-row">
                <label>
                  Due date
                  <input
                    type="date"
                    name="due"
                    value={newTask.due}
                    onChange={handleInput}
                  />
                </label>

                <label>
                  Priority
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInput}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">
                      Medium
                    </option>
                    <option value="High">High</option>
                  </select>
                </label>
              </div>

              <label>
                Notes
                <textarea
                  name="notes"
                  value={newTask.notes}
                  onChange={handleInput}
                  placeholder="Anything you want to remember..."
                  rows="3"
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-task-button"
                >
                  Create task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Tasks;