const input = document.querySelector("input")
const addTask = document.querySelector(".input button")
const taskContainer = document.querySelector("#taskContainer")
const pruebaJSON = document.querySelector("#pruebaJSON")
const tasks = [];

const randomId = () => {
  return Math.floor(Math.random() * 1000)
}

document.addEventListener("DOMContentLoaded", () => {

  const getLocalStorage = localStorage.getItem('tareasJavi');

  if(getLocalStorage){
    const tasks = JSON.parse(getLocalStorage);
    tasks.forEach(task => {
      const newTask = document.createElement("div")

      newTask.innerHTML = 
      `<div class="row-md-9 h-15 d-flex justify-content-space-evenly w-50 " id="task"> <span class="mr-50">${task.task}</span> 
      <button data-id=${ task.id } style="padding:3px;" class="details">add details</button>
      <button class="removeButton">remove</button>
      </div>`

      taskContainer.append(newTask)

      const removeButton = document.querySelectorAll(".removeButton")
      const taskToDelete = document.querySelectorAll("#task")
      
      removeButton.forEach((boton, i)=>{
      boton.addEventListener("click",()=>{
        taskToDelete[i].remove()
        })
      })

      const detallesTask = document.querySelectorAll(".details")

      // --------------------------------------------
      detallesTask.forEach((btnDetalle)=>{

        btnDetalle.addEventListener("click",()=>{

          const getId = btnDetalle.getAttribute("data-id");
          const modal = document.createElement("div");

          if( task.description !== "" ){
            modal.innerHTML = 
            `<div class="row-xl-9 position-absolute h-50 w-50 border bg-warning d-flex flex-column justify-content-space-around align-items-center px-25 py-25" id="modal">
                    <h2>Modificar detalles</h2>
                    <label for="input">Tarea</label>
                    <input type="text" name="tarea" value="${task.task}">
                    <label for="input">Descripción</label>
                    <input type="text" name="desc" value="${task.description}">
                    <label for="input">Fecha y Hora entrega</label>
                    <input type="text" name="fecha_hora" value="${task.createdAt}">
                    <button class="h-25 w-50" id="modificar">Guardar</button>
                </div>`
              taskContainer.append(modal);
          }else{
            modal.innerHTML = 
            `<div class="row-xl-9 position-absolute h-50 w-50 border bg-warning d-flex flex-column justify-content-space-around align-items-center px-25 py-25" id="modal">
                    <h2>Modificar detalles</h2>
                    <label for="input">Tarea</label>
                    <input type="text" name="tarea">
                    <label for="input">Descripción</label>
                    <input type="text" name="desc">
                    <label for="input">Fecha y Hora entrega</label>
                    <input type="text" name="fecha_hora">
                    <button class="h-25 w-50" id="modificar">Guardar</button>
                </div>`
              taskContainer.append(modal);
          }

          
          const modificar = document.querySelector("#modificar")

          modificar.addEventListener("click",()=>{
            const tarea = document.querySelector("input[name='tarea']").value;
            const desc = document.querySelector("input[name='desc']").value;
            const fecha_hora = document.querySelector("input[name='fecha_hora']").value;

            const task = tasks.find(task => task.id == getId);
            task.task = tarea;
            task.description = desc;
            task.createdAt = fecha_hora;

            localStorage.setItem('tareasJavi', JSON.stringify(tasks));

            modal.remove();
          });

        });

          
      })

      // -------------------------------------------------------

    })
  }

});

addTask.addEventListener("click", () => {
  const inputValue = input.value
  const regex = /^[a-zA-Z0-9\s]*$/

  if(!regex.test(inputValue)){
    alert("usa únicamente caracteres alfabéticos")
    input.value = inputValue.slice(0, -1)
    return;
  }
  const newTask = document.createElement("div")
  const idTask  = randomId();
  

  newTask.innerHTML = 
  `<div class="row-md-9 h-15 d-flex justify-content-space-evenly w-50 " id="task"> <span class="mr-50">${inputValue}</span> 
  <button data-id=${idTask} style="padding:3px;" id="details">add details</button>
  <button class="removeButton">remove</button>
  </div>`

  taskContainer.append(newTask)
  
  const taskDetails = {
    id: idTask,
    task: inputValue,
    description: "",
    createdAt: new Date().toLocaleDateString(),
  }

  tasks.push(taskDetails);

  // METODOS JSON

  // Metodo Stringify

  // console.log({
  //   tasks,
  //   stringify: JSON.stringify(tasks)
  // })

  // METODO PARSE

  // const parse = JSON.parse(JSON.stringify(tasks))
  // console.log(parse)

  localStorage.setItem('tareasJavi', JSON.stringify(tasks));

  input.innerHTML = " ";

  const removeButton = document.querySelectorAll(".removeButton")
  const task = document.querySelectorAll("#task")
  removeButton.forEach((boton, i)=>{
  boton.addEventListener("click",()=>{
      task[i].remove()
    })
  })

  const detallesTask = document.querySelectorAll(".details")

  detallesTask.forEach((btnDetalle)=>{

    btnDetalle.addEventListener("click",()=>{
    // const getId = btnDetalle.getAttribute("data-id");
    // console.log(getId)
    const modal = document.createElement("div")
      modal.innerHTML = 
      `<div class="row-xl-9 position-absolute h-50 w-50 border bg-warning d-flex flex-column justify-content-space-around align-items-center px-25 py-25" id="modal">
              <h2>Modificar detalles</h2>
              <label for="input">Tarea</label>
              <input type="text">
              <label for="input">Descripción</label>
              <input type="text">
              <label for="input">Fecha y Hora entrega</label>
              <input type="text">
              <button class="h-25 w-50" id="modificar">Guardar</button>
          </div>`
        taskContainer.append(modal)
    })
  })

})




  