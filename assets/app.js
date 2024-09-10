const input = document.querySelector(".input input");
const addTask = document.querySelector(".input button");
const taskContainer = document.querySelector(".taskContainer");

let id = 1;
let taskList = [];

let crearTarea = (x, y) => {
  const regex = /^[a-zA-Z0-9\s]*$/;

  if (!regex.test(x)) {
    alert("solo caracteres alfabéticos");
    return;
  }

  const newTask = document.createElement("div");
  newTask.innerHTML = `<div><p>${x}</p> <button class="detalles">Detalles</button>
<button class="actualizar">Actualizar</button>
<button class="eliminar" id="${y}">Eliminar</button></div>`;
  newTask.classList.add("tareas");
  taskContainer.append(newTask);

  const task = {
    id: y,
    nombre: x,
  };

  taskList.push(task);

  input.value = "";

 


    modalDetalle = document.createElement("div");
    modalDetalle.innerHTML = ` <h2>Modificar detalles</h2>
  <div class="modalBody">
   <label for="input">Tarea</label>
   <input type="text" disabled name="tarea" value="${x}">
   <button><i class="fa-regular fa-pen-to-square"></i></button>
   <label for="input">Descripción</label>
   <input type="text" disabled name="desc">
     <button><i class="fa-regular fa-pen-to-square"></i></button>
   <label for="input">Fecha y Hora entrega</label>
   <input type="date" name="fecha_hora" disabled>
     <button><i class="fa-regular fa-pen-to-square"></i></button>
    </div>
   <button class="h-25 w-50" id="modificar">Guardar</button>`;
    modalDetalle.classList.add("modalDetalle");
    modalDetalle.setAttribute("id", y )
    modalDetalle.style.display = "none";
    taskContainer.append(modalDetalle);
  

  
  
  const modificar = document.querySelectorAll(".tareas .detalles");
  const modales = document.querySelectorAll(".modalDetalle");

  modificar.forEach((mod, j) => {
    mod.addEventListener("click", () => {
  modales[j].style.display = "flex";
    });
  });
/*
  const posicionModal = modales.filter((pos)=>{
    console.log(pos)
  })
  const descripcion = mod.querySelectorAll(".modalDetalle .modalBody input[name=desc]")
  
  const editButton = document.querySelectorAll(
    ".modalDetalle .modalBody button"
  );
  const inputsModal = document.querySelectorAll(".modalBody input");

  editButton.forEach((edBut, k) => {
    edBut.addEventListener("click", () => {
      inputsModal[k].disabled = false;
    });
  });
  */

  const guardar = document.querySelectorAll(".modalDetalle  #modificar");

  guardar.forEach((gu, l) => {
    gu.addEventListener("click", () => {
      inputsModal[l].disabled = true;
      modales[l].style.display = "none";
    });
  });

  const delButton = document.querySelectorAll(".tareas  .eliminar");
  const tareasToDel = taskContainer.querySelectorAll(".tareas");

  delButton.forEach((del, i) => {
    del.addEventListener("click", () => {

      const newTaskList = taskList.filter((taskL) => {
        return taskL.id != del.id;
      });
  
      taskList = newTaskList
      localStorage.setItem(`tareasJavi`, JSON.stringify(newTaskList));

      tareasToDel[i].remove();
    });
  });
};

addTask.addEventListener("click", () => {
  const nuevaTarea = input.value;

  crearTarea(nuevaTarea, id);
  id++;


  localStorage.setItem(`tareasJavi`, JSON.stringify(taskList));
});

document.addEventListener("DOMContentLoaded", () => {
  const getLocalStorage = localStorage.getItem("tareasJavi");

  const tareasPendientes = JSON.parse(getLocalStorage);

  tareasPendientes.forEach((tarPend)=>{
    crearTarea(tarPend.nombre, tarPend.id)
  })
});
