const input = document.querySelector(".toDo .header input");
const addTask = document.querySelector(".toDo .header button");
const taskContainer = document.querySelector(".taskContainer");

let id = 1;
let taskList = [];

let crearTarea = (x, y, z, a, g) => {
  const regex = /^[a-zA-Z0-9\s]*$/;

  if (!regex.test(x)) {
    alert("solo caracteres alfabéticos");
    return;
  }
  if (x.value == "") {
    alert("debes ingresar un valor");
  }

  if (g == true) {
    return;
  }

  const newTask = document.createElement("div");
  newTask.innerHTML = ` <div class="taskName">
                        <p>${x}</p>
                        </div>
                        <div class="controlButtons">
                        <button class="detalle" id="${y}">Details</button>
                        <button class="eliminar"id="${y}">Remove</button>
                        </div>
                       <i class="fa-solid fa-font-awesome"></i>
                       <input type="checkbox" name="" id="${y}" ${g}>`;

  newTask.classList.add("task");
  newTask.setAttribute("id", y);
  taskContainer.append(newTask);

  const taskObject = {
    id: y,
    nombre: x,
  };

  taskList.push(taskObject);

  input.value = "";

  modalDetalle = document.createElement("div");

  modalDetalle.innerHTML = `<button id="closeModal">X</button>
                <h2>${x}</h2>
                <div class="modalBody">
                    <label for="">Nombre  <i class="fa-solid fa-pen-to-square"></i></label>
                    <input type="text" value=${x} disabled>
                    <label for="">Descripción  <i class="fa-solid fa-pen-to-square"></i></label>
                    <input type="text" name="desc" value=${z} disabled>
                    <label for="">Fecha y hora  <i class="fa-solid fa-pen-to-square"></i></label>
                 <input type="datetime-local" value=${a} disabled>
                 <div class="priority">
                    <p>Priority</p>
                 <i class="fa-solid fa-font-awesome" style="color:green;"></i>
                 <i class="fa-solid fa-font-awesome" style="color:rgb(240, 255, 28);"></i>
                 <i class="fa-solid fa-font-awesome" style="color:rgb(255, 104, 17);"></i>
                </div>

                    <button class="guardar" id=${y}>Guardar</button> 
               </div> `;
  modalDetalle.classList.add("detailsModal");
  modalDetalle.setAttribute("id", y);
  modalDetalle.style.display = "none";
  taskContainer.append(modalDetalle);

  const modificar = document.querySelectorAll(".task .controlButtons .detalle");
  const modales = document.querySelectorAll(".detailsModal");

  modificar.forEach((mod, j) => {
    mod.addEventListener("click", () => {
      modales[j].style.display = "flex";
      inputsModal.disabled = true;
    });
  });
  const editButton = document.querySelectorAll(
    ".detailsModal .modalBody label i"
  );
  const inputsModal = document.querySelectorAll(".modalBody input");

  editButton.forEach((edBut, k) => {
    edBut.addEventListener("click", () => {
      inputsModal[k].disabled = false;
    });
  });

  const cerrar = document.querySelectorAll(".detailsModal  #closeModal");

  cerrar.forEach((cer, l) => {
    cer.addEventListener("click", () => {
      modales[l].style.display = "none";
    });
  });
  const guardar = document.querySelectorAll(".detailsModal  .guardar");

  guardar.forEach((gu, q) => {
    gu.addEventListener("click", () => {
      const descInput = modales[q].querySelector(".modalBody input[name=desc]");
      const dateInput = modales[q].querySelector(
        ".modalBody input[type=datetime-local]"
      );
      const desc = descInput.value;
      const date = dateInput.value;
      const getTareas = localStorage.getItem("tareasJavi");
      const getTareasParse = JSON.parse(getTareas);

      getTareasParse.map((tar) => {
        if (tar.id == gu.id) {
          tar.descripcion = desc;
          return (tar.fecha = date);
        }
      });
      localStorage.setItem("tareasJavi", JSON.stringify(getTareasParse));
      modales[q].style.display = "none";
      inputsModal[q].disabled = true;
    });
  });

  const delButton = document.querySelectorAll(
    ".task  .controlButtons .eliminar"
  );
  const tareasToDel = taskContainer.querySelectorAll(".task");

  delButton.forEach((del, i) => {
    del.addEventListener("click", () => {
      const newTaskList = taskList.filter((taskL) => {
        return taskL.id != del.id;
      });

      taskList = newTaskList;
      localStorage.setItem(`tareasJavi`, JSON.stringify(newTaskList));

      tareasToDel[i].remove();
    });
  });

  const delSelectedBut = document.querySelector(".generalButtons button");
  const tasks = document.querySelectorAll(".task");
  const checkBox = document.querySelectorAll(".task input[type=checkbox]");

  delSelectedBut.addEventListener("click", () => {
    checkBox.forEach((ch, s) => {
      if (ch.checked == true) {
        tasks[s].remove();
        modales[s].remove();
      }
      const bajarTareas = localStorage.getItem("tareasJavi");
      const bajarTareasParse = JSON.parse(bajarTareas);
      const convertir = bajarTareasParse.map((tar, n) => {
        return (tar.checked = checkBox[n].checked);
      });
      localStorage.setItem("tareasJavi", JSON.stringify(bajarTareasParse));
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

  tareasPendientes.forEach((tarPend) => {
    crearTarea(
      tarPend.nombre,
      tarPend.id,
      tarPend.descripcion,
      tarPend.fecha,
      tarPend.checked
    );
  });
});
