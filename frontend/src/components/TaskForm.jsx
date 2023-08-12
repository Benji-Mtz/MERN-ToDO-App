const TaskForm = (prop) => {

    let { createTask, name, handleInputChange, isEditing , updateTask } = prop;
    
    return (
      <form className="task-form" onSubmit={ isEditing ? updateTask : createTask} >
          <input 
              type="text" 
              placeholder="Agregar tarea" 
              name="name" 
              value={name} 
              onChange={handleInputChange} 
          />
  
          <button type="submit">
              {
                isEditing ? "Editar" : "Agregar"
              }
          </button>
      </form>
    )
  }
  
  export default TaskForm