import { useState } from 'react'

import './index.css'
import api from '../../api'
import { todo } from '../../utils/constants'
import { IconPlus } from '../../icons'

export function AddTaskComponent({ setIsAddingTask }: any) {
  const [task, setTask] = useState('')

  async function addTask() {
    setIsAddingTask(true)

    await api.post('/todo', { id: JSON.stringify(Date.now()), label: task, name: todo })

    setIsAddingTask(false)

    setTask('')
  } 

  return (
    <div className="container-input">
      <input className="input" type="text" placeholder="Add Task" value={task} onChange={event => setTask(event.target.value)} />

      <button className="button" onClick={addTask}>
        <img className="icon icon-plus" src={IconPlus} alt="icon plus" />
      </button>
    </div>
  );
}
