import { useEffect, useState } from 'react'
import api from '../../api'

import './index.css'
import States from '../States'
import { AddTaskComponent } from '../AddTaskComponent'
import * as contants from '../../utils/constants'

export function ChallengeComponent() {
  const [todos, setTodos] = useState([])
  const [progress, setProgress] = useState([])
  const [dones, setDones] = useState([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [isMovingTask, setIsMovingTask] = useState(false)

  useEffect(() => {
    api.get(`/${contants.todo}`).then(response => setTodos(response.data));

    api.get(`/${contants.progress}`).then(response => setProgress(response.data));

    api.get(`/${contants.done}`).then(response => setDones(response.data));
  }, [isAddingTask, isMovingTask])

  return (
    <>
      <div className="states">
        <States label="To Do" tasks={todos} isAddingTask={isAddingTask} isMovingTask={isMovingTask} setIsMovingTask={setIsMovingTask} />

        <States label="In Progress" tasks={progress} isMovingTask={isMovingTask} setIsMovingTask={setIsMovingTask} />

        <States label="Done" tasks={dones} isMovingTask={isMovingTask} setIsMovingTask={setIsMovingTask} />
      </div>
      
      <AddTaskComponent setIsAddingTask={setIsAddingTask} />
    </>
  )
}
