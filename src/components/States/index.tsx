import './index.css'
import { IconArrowBack, IconArrowFoward } from '../../icons'
import api from '../../api'
import { done, progress, todo } from '../../utils/constants'

interface ITasksProps {
  id: string,
  label: string,
  name: string
}

interface IProps {
  label: string,
  tasks: Array<ITasksProps>,
  isAddingTask?: boolean,
  isMovingTask: boolean,
  setIsMovingTask?: any
}

export default function States({ label, tasks, isAddingTask, isMovingTask, setIsMovingTask } : IProps) {
  async function moveBack(task: any) {
    setIsMovingTask(true)
    
    await api.delete(`/${task.name}/${task.id}`)

    if (task.name === progress) await api.post(`/${todo}`, { ...task, name: todo })
    else if (task.name === done) await api.post(`/${progress}`, { ...task, name: progress })

    setIsMovingTask(false)
  }

  async function moveFoward(task: any) {
    setIsMovingTask(true)
    
    await api.delete(`/${task.name}/${task.id}`)
    
    if (task.name === todo) await api.post(`/${progress}`, { ...task, name: progress })
    else if (task.name === progress) await api.post(`/${done}`, { ...task, name: done })

    setIsMovingTask(false)
  }

  return (
    <div className="card">
      <h2>{label}</h2>
      
      <div className="tasks">
        {tasks.map((task: any) => (
          <div className="task" key={task.id}>
            <button className="btn btn-back" onClick={() => moveBack(task)} disabled={task.name === todo}>
              <img className="icon arrow-back" src={IconArrowBack} alt="icon arrow back" />
            </button>
            <h3>{task.label}</h3>
            <button className="btn btn-foward" onClick={() => moveFoward(task)} disabled={task.name === done}>
              <img className="icon arrow-foward" src={IconArrowFoward} alt="icon arrow forward" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}