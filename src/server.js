import express from 'express';
const app = express();
// const tasks = []; // Declare and initialize the tasks array
const [tasks, setTasks] = useState([
  {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": true
    },
    {
      "id": 3,
      "text": "Food Shopping",
      "day": "Feb 5th at 2:30pm",
      "reminder": false,
    },
    {
      "id": 4,
      "text": "TGI lime",
      "day": "Apr 25th at 7:30pm",
      "reminder": true,
    }
])
app.use(express.json());


app.post('/task', (req, res) => {
  const { id, text, day, reminder } = req.body;
  console.log('Got a POST request on /task with', text);

  // Add the task to the tasks array
  tasks.push({ id, text, day, reminder });

  res.status(200).json(tasks);
});

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task.id === id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// PUT /tasks/:id - Update a specific task by ID
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, day, reminder } = req.body;
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.text = text;
    task.day = day;
    task.reminder = reminder;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE /tasks/:id - Delete a specific task by ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});
 
app.listen(8081, () => console.log('Server is listening on port 8081'));