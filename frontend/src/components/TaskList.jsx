import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";

import { toast } from 'react-toastify';
import axios from 'axios';

import { URL, options } from "../constants";
import loadingImg from "../assets/loader.gif";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompleteTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => { 
      const { name, value } = e.target;
      
      setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
        const {data} = await axios.get(`${URL}/api/tasks`);
        setTasks(data)
        console.log(data);
        setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTasks()
  }, [])


  useEffect(() => {
    getTasks()
  }, [selectedOption])

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Este campo no puede ir vacío");
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      console.log(`${URL}/api/tasks`);
      toast.success("Tarea agregada satisfactoriamente");
      setFormData({...formData, name: ""});
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`)
      getTasks()
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const cTask = tasks.filter((task)=>{
        return task.completed === true
    })
    
    const iTask = tasks.filter((task)=>{
        return task.completed === false
    })

    setCompletedTasks(cTask);
    setIncompleteTasks(iTask);

  }, [tasks])

  const getSingleTask = (task) => {
    setFormData({
      name: task.name,
      completed: false
    });
    setTaskId(task._id);
    setIsEditing(true);
  }

  const updateTask = async(e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Este campo no puede ir vacío");
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      setFormData({...formData, name: ""});
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const setToComplete = async(task) => {
    const newFormData = {
      name: task.name,
      completed: true
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };


  return (
    <div>
        <h2>Aplicación de Tareas.</h2>
        <TaskForm 
          name={name}
          handleInputChange={handleInputChange}
          createTask={createTask}
          isEditing={isEditing}
          updateTask={updateTask}
        />
        {tasks.length > 0 && (
            <div className="--flex-between --pb">
            <p>
                <b style={ (selectedOption == 'all') ? { fontWeight: 'bold' } : null }>Total: </b>{ tasks.length }
            </p>

            <div className="select">
              <select 
                id="standard-select" 
                value={selectedOption}
                onChange={e => setSelectedOption(e.target.value)}
              >
                {options.map((option) => (
                  <option value={option.value} key={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            
            <p>
                <b style={ (selectedOption == 'true') ? { fontWeight: 'bold', color: 'red' } : { color: 'red' } }>Pendientes: </b>{ incompletedTasks.length }
            </p>
            <p>
                <b style={ (selectedOption == 'false') ? { fontWeight: 'bold', color: 'green' } : { color: 'green' } }>Completas: </b>{ completedTasks.length }
            </p>
        </div>
        )}
        
        <hr />
        {
          isLoading && (
            <div className="--flex-center">
              <img src={loadingImg} alt="Loading" />
            </div>
          )
        }
        {
          !isLoading && tasks.length === 0 ? (
            <p className="--py">Sin tareas aún. Agregue una porfavor.</p>
          ) : (
            <>
              { 
                tasks.filter(estado => estado.completed.toString() != selectedOption)
                .map((task, index) => {
                  return (
                    <Task 
                      key={task._id}
                      task={task}
                      index={index}
                      deleteTask={deleteTask}
                      getSingleTask={getSingleTask}
                      setToComplete={setToComplete}
                    />
                  );
                })
              }
            </>
          )
        }
        
    </div>
  )
}

export default TaskList