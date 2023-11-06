import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1/tasks";

const App = () => {
  const [task, setTask] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = await axios.post("/", formData);
    console.log(data);
    getFetchData();
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("/" + id);
    getFetchData();
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = task.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTasks);
  };

  const getFetchData = async () => {
    await axios.get("/").then((response) => setTask(response.data.tasks));
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div className="App">
      <h1>To-do List</h1>
      <form onSubmit={handleAdd} method="POST">
        <div>
          <input
            type="text"
            placeholder="Add a task..."
            name="name"
            onChange={handleChange}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
      <ul>
        {task.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(index)}
            />

            <span className={task.completed ? "completed" : ""}>
              {task.name}
            </span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
