//again, "rafce" with extension for arrow function template
// import { useState } from 'react' //hook called useState. 
import React from 'react'
import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <div>
            {tasks.map((task, index) => (
                <
                    Task key={index}
                    task={task}
                    onDelete={onDelete}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}

export default Tasks