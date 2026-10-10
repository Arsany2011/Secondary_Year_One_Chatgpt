import useLocalStorage from "./useLocalStorage";

const initialHomework = [];

function useHomework() {
  const [homework, setHomework] = useLocalStorage(
    "secondary-year-one-homework",
    initialHomework,
  );

  const addHomework = (item) => {
    const newHomework = {
      id: crypto.randomUUID(),
      subject: item.subject,
      title: item.title,
      description: item.description || "",
      dueDate: item.dueDate || "",
      priority: item.priority || "Medium",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setHomework((currentHomework) => [
      ...currentHomework,
      newHomework,
    ]);
  };

  const updateHomework = (id, updates) => {
    setHomework((currentHomework) =>
      currentHomework.map((item) =>
        item.id === id
          ? { ...item, ...updates }
          : item,
      ),
    );
  };

  const toggleHomework = (id) => {
    setHomework((currentHomework) =>
      currentHomework.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    );
  };

  const deleteHomework = (id) => {
    setHomework((currentHomework) =>
      currentHomework.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const activeHomework = homework.filter(
    (item) => !item.completed,
  );

  const completedHomework = homework.filter(
    (item) => item.completed,
  );

  return {
    homework,
    activeHomework,
    completedHomework,
    addHomework,
    updateHomework,
    toggleHomework,
    deleteHomework,
  };
}

export default useHomework;