import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa';

const Task = (prop) => {

  let { task, index, deleteTask, getSingleTask, setToComplete } = prop;
  
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
            <b>{ index + 1 }.- </b> { task.name }
        </p>
        <div className="task-icons">
            <FaCheckDouble color='green' onClick={()=>setToComplete(task)} />
            <FaEdit color='blue' onClick={()=>getSingleTask(task)} />
            <FaRegTrashAlt color='red'onClick={()=>deleteTask(task._id)} />
        </div>
    </div>
  )
}

export default Task