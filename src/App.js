import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react' 
import Header from './components/Header' // div with id of "root" wraps this ENTIRE document. That comes from index.html, which we imported App.js 
import Footer from './components/Footer' 
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }

    getTasks()
  }, [])

//! Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  console.log(data)

  return data
}

// Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  console.log(data)

  return data
}

//! Add Task
const addTask = async (task) => {
  const res = await fetch(`http://localhost:5000/tasks`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task)
  })
  // console.log(task)
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])

const data = await res.json()

setTasks([...tasks, data])
}

//! Delete Task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      })
      console.log('delete', id)
      setTasks(tasks.filter((task) => task.id !== id))
    }

//! Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle,
  reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  console.log('You hit the toggleReminder function in App.js')
  setTasks(
    tasks.map((task) => 
      task.id === id ? { 
          ...task, 
          reminder: data.reminder
        } 
        : task
    )
  )
}

  // const name = 'Brad' //Show variables being called in general
  // const x = true //Show ternerary functions in use here

  return (
     // need to use "className" instead of just "class" to assign a 'class' attribute //htmlFor instead of for, as well
    <Router>
    <Routes>
    // JSX expressions have to have a parent element, so put things in div at minimum, always.
    <div className="container" > 
      {/* <h1>Hello from React</h1> */}
      {/* <h2>Hello {name}</h2>
      <h2>Hello {x ? 'Yes' : 'No'}</h2> */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/> {/*This references line #1. It calls in line 1, which imports Header.js, which is 'return'ing an H1 HTML tag of "Hello From React" */}
        {/* <Header title='HelloPropExample' /> Prop example. Passes through "HelloPropExample and in Header.js, line 15, HelloPropExample passes through! */}
        
        <Route path='/about'  
        exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> 
              ) : 'No Tasks To Show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
        
    </div>
    </Routes>
    </Router>
  );
}

export default App;
