import useLocalStorage from "./useLocalStorage";

const initialTasks = [];

function useTasks() {
  const [tasks, setTasks] = useLocalStorage(
    "secondary-year-one-tasks",
    initialTasks,
  );

  const addTask = (task) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description || "",
      priority: task.priority || "Medium",
      dueDate: task.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);
  };

  const updateTask = (id, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, ...updates }
          : task,
      ),
    );
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  };

  const activeTasks = tasks.filter(
    (task) => !task.completed,
  );

  const completedTasks = tasks.filter(
    (task) => task.completed,
  );

  return {
    tasks,
    activeTasks,
    completedTasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}

export default useTasks;