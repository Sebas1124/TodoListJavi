// QUE ES UN CRUD
// C = Create
// R = Read // SHOW // MOSTRAR
// U = Update
// D = Delete

// TODO LIST APP

// DEFINIR VARIABLES GLOBALES
const input = document.getElementById("task");
const buttonAdd = document.getElementById("btnAdd");
const listApp = document.getElementById("list");

let tasks = [];

// Evento

document.addEventListener("DOMContentLoaded", () => {
  let tasks = localStorage.getItem("tareas");

  if (tasks) {
    tasks = tasks.split(",");

    tasks.forEach((task) => {
      addTask(task);
    });
  }
});

// FUNCIONES

const addTask = (valueInput) => {
  const task = valueInput;

  if (task === "") {
    alert("Ingresa una tarea correcta");
    return;
  }

  // crear elementos li

  const li = document.createElement("li");
  li.style.listStyle = "none";
  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  li.style.marginBottom = "10px";

  const title = document.createElement("h3");
  title.textContent = task;
  title.classList.add("text-center");

  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.gap = "10px";

  // crear boton eliminar
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Eliminar";
  btnDelete.classList.add("btn");
  btnDelete.classList.add("btn-outline-danger");

  // agregar boton de actualizar
  const btnUpdate = document.createElement("button");
  btnUpdate.textContent = "Actualizar";
  btnUpdate.classList.add("btn");
  btnUpdate.classList.add("btn-outline-warning");

  // boton de detalles de la tarea
  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Detalles";
  btnDetails.classList.add("btn");
  btnDetails.classList.add("btn-outline-primary");
  btnDetails.setAttribute("data-bs-toggle", "modal");
  btnDetails.setAttribute("data-bs-target", `detalleModal_${task}`);

  // Eventos

  btnDelete.addEventListener("click", () => {
    li.remove();

    // eliminar de LocalStorage

    const taskToDelete = task;

    tasks = tasks.filter((tarea) => tarea !== taskToDelete);

    localStorage.setItem("tareas", tasks);
  });

  btnUpdate.addEventListener("click", () => {
    const newTask = prompt(`Ingrese la actualizacio de la tarea ${task}`);

    if (newTask === "") {
      alert("Ingresa un valor correcto");
      return;
    }

    // actualizar en LocalStorage

    const taskToUpdate = task;

    tasks = tasks.map((tarea) => (tarea === taskToUpdate ? newTask : tarea));

    localStorage.setItem("tareas", tasks);

    title.textContent = newTask;
  });

  btnDetails.addEventListener("click", () => {
    // crear modal con detalles de la tarea

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add("fade");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("id", `detalleModal_${task}`);

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalHeader.classList.add("d-flex");
    modalHeader.classList.add("justify-content-between");

    const modalTitle = document.createElement("h5");
    modalTitle.textContent = `Detalles de la tarea ${task}`;

    const closeModal = document.createElement("button");
    closeModal.textContent = "Cerrar";
    closeModal.classList.add("btn");
    closeModal.classList.add("btn-danger");

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalBody.style.display = "flex";
    modalBody.style.flexDirection = "column";
    modalBody.style.justifyContent = "space-evenly";

    const labelhoraI = document.createElement("label");
    labelhoraI.textContent = "INICIO TAREA";
    labelhoraI.style.fontWeight = "bold";

    const modalHoradeInicio = document.createElement("input");
    modalHoradeInicio.setAttribute("type", "datetime-local");

    const labelhoraF = document.createElement("label");
    labelhoraF.textContent = "FIN TAREA";
    labelhoraF.style.fontWeight = "bold";
    const modalHoradeFin = document.createElement("input");
    modalHoradeFin.setAttribute("type", "datetime-local");

    const labelDesc = document.createElement("label");
    labelDesc.textContent = "Descripción";
    const addDescription = document.createElement("input");
    addDescription.setAttribute("type", "text");
    addDescription.setAttribute("placeholder", "add description");

    const labelPri = document.createElement("label");
    labelPri.textContent = "Prioridad";
    labelPri.style.fontWeight = "bold"

    const desplegable = document.createElement("select");

    const alta = document.createElement("option");
    alta.textContent = "ALTA";
    alta.style.backgroundColor = "red";
    const media = document.createElement("option");
    media.textContent = "MEDIA";
    media.style.backgroundColor = "yellow";
    const baja = document.createElement("option");
    baja.textContent = "BAJA";
    baja.style.backgroundColor = "green";

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    // agregar elementos al modal

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeModal);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    modalBody.appendChild(labelhoraI);
    modalBody.appendChild(modalHoradeInicio);
    modalBody.appendChild(labelhoraF);
    modalBody.appendChild(modalHoradeFin);
    modalBody.appendChild(labelDesc);
    modalBody.appendChild(addDescription);
    modalBody.appendChild(labelPri);
    modalBody.appendChild(desplegable);
    desplegable.appendChild(alta);
    desplegable.appendChild(media);
    desplegable.appendChild(baja);

    modalDialog.appendChild(modalContent);

    modal.appendChild(modalDialog);

    document.body.appendChild(modal);

    // abrir modal
      // cerrar modal

 const modalInstance = new bootstrap.Modal(modal);
       
  closeModal.addEventListener("click", ()=>{
    modalInstance.hide();
  } )

    modalInstance.show();
  });



  // agregar boton eliminar al li

  div.appendChild(btnDetails);
  div.appendChild(btnUpdate);
  div.appendChild(btnDelete);

  li.appendChild(title);
  li.appendChild(div);

  // agregar li a la lista

  listApp.appendChild(li);

  // almacenar en LocalStorage

  tasks.push(task);
  localStorage.setItem("tareas", tasks);

  // limpiar input

  input.value = "";
};

// validar input
input.addEventListener("keyup", (event) => {
  event.preventDefault();

  if (event.key === "Enter") {
    addTask(input.value);
  }

  // validaciones de input no caracteres especiales

  const regex = /^[a-zA-Z0-9\s]*$/;
  const value = input.value;

  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }
});

// evento click en boton agregar

buttonAdd.addEventListener("click", () => {
  if (input.value === "") {
    alert("Ingresa una tarea correcta");
    return;
  }

  addTask(input.value);
});



