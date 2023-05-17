import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const response = await fetch('/tasks');
    const data = await response.json();
    setTasks(data);
  };
// Add Task
const addTask = (task) => {
  //  create random number for ID
  const id = Math.floor(Math.random() * 10000) + 1;
  const newTask = { id, ...task }
  setTasks([...tasks, newTask]);
}

//Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
}

//toggle reminder
const toggleReminder = (id) => {
  setTasks(
    tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder } : task
    )
  )
}

  return (
    <div className="container">
      <Header onAddClick={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      { showAddTask ? (<AddTask onAdd={addTask} />) : ('')}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('There are currently no tasks') }
    </div>
  );
}

export default App;
