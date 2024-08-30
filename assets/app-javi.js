const input = document.querySelector("input")
const addButton = document.querySelector(".input button")
const taskContainer = document.querySelector("#taskContainer")

addButton.addEventListener("click",()=>{
const inputValue = input.value
const regex = /^[a-zA-Z0-9\s]*$/

if(!regex.test(inputValue)){
  alert("usa únicamente caracteres alfabéticos")
}
const newTask = document.createElement("div")

newTask.innerHTML = ` <div class="row-md-9 h-15 d-flex justify-content-space-evenly w-50 " id="task"> <span class="mr-50">${inputValue}</span> <button style="padding:3px;" id="details">add details</button><button id="removeButton">remove</button></div>`

taskContainer.append(newTask)

inputValue = "";
})

const removeButton = document.querySelectorAll("#removeButton")
const task = document.querySelectorAll("#task")

removeButton.forEach((boton, i)=>{
boton.addEventListener("click",()=>{
    task[i].remove()

  })
})

const modal = document.createElement("div")
modal.innerHTML = `   <div class="row-xl-9 position-absolute h-50 w-50 border bg-warning d-flex flex-column justify-content-space-around align-items-center px-25 py-25" id="modal">
        <h2>Modificar detalles</h2>
        <label for="input">Tarea</label><input type="text">
        <label for="input">Descripción</label><input type="text">
        <label for="input">Subtareas</label><input type="text">
        <label for="input">Fecha y Hora entrega</label><input type="text">
        <button class="h-25 w-50" id="modificar">Guardar</button>
    </div>`

const detallesTask = document.querySelectorAll("#task #details")

detallesTask.forEach((btnDetalle)=>{
    btnDetalle.addEventListener("click",()=>{
        taskContainer.append(modal)
    })
})




  