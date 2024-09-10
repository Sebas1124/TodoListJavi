const input = document.querySelector(".input input")
const addTask = document.querySelector(".input button")
const taskContainer = document.querySelector(".taskContainer")



let id = 0
taskList = []

addTask.addEventListener("click", ()=>{

const nuevaTarea = input.value
const regex = /^[a-zA-Z0-9\s]*$/

if(!regex.test(nuevaTarea) || nuevaTarea == ""){
    alert("solo caracteres alfabéticos")
   return
}

id++
const newTask = document.createElement("div")
newTask.innerHTML = `<p>${nuevaTarea}</p> <button class="detalles">Detalles</button>
<button class="modificar">Modificar</button>
<button class="eliminar">Eliminar</button>`
newTask.classList.add("tareas")
newTask.setAttribute("id", `${id}`)
taskContainer.append(newTask)

taskList.push(newTask.outerHTML)
input.value = ""

const tareas = document.querySelectorAll(".tareas")
tareas.forEach(()=>{
  const modalDetalle = document.createElement("div")
   modalDetalle.innerHTML =  
  ` <h2>Modificar detalles</h2>
   <label for="input">Tarea</label>
   <input type="text" name="tarea">
   <label for="input">Descripción</label>
   <input type="text" name="desc">
   <label for="input">Fecha y Hora entrega</label>
   <input type="text" name="fecha_hora">
   <button class="h-25 w-50" id="modificar">Guardar</button>
`
modalDetalle.classList.add("modalDetalle")
modalDetalle.style.display = "none"
taskContainer.append(modalDetalle)

})

const modificar = document.querySelectorAll(".tareas .modificar")
const modales = document.querySelectorAll(".modalDetalle") 

modificar.forEach((mod, j)=>{
  mod.addEventListener("click",()=>{
    modales[j].style.display = "flex"
  })
})

const guardar = document.querySelectorAll(".modalDetalle #modificar")

guardar.forEach((gu, k)=>{
  gu.addEventListener("click",()=>{
    modales[k].style.display = "none"
  })
})

const taskRescue = document.querySelectorAll(".tareas .eliminar")
const tareastoDel = taskContainer.querySelectorAll(".tareas")

taskRescue.forEach((tr,i)=>{
  tr.addEventListener("click",()=>{
    tareastoDel[i].remove()
  })
})

localStorage.setItem('tareasJavi', JSON.stringify(taskList));
localStorage.setItem('idTareas' , JSON.stringify(id))

})



document.addEventListener("DOMContentLoaded", () => {
 
  const getLocalStorage = localStorage.getItem('tareasJavi')
     
  const tareasPendientes = JSON.parse(getLocalStorage)
 
 taskContainer.innerHTML = tareasPendientes


const taskRescue = document.querySelectorAll(".tareas .eliminar")
const tareas = taskContainer.querySelectorAll(".tareas")

taskRescue.forEach((tr,i)=>{
  tr.addEventListener("click",()=>{
    tareas[i].remove()
  })
})

tareas.forEach(()=>{
  const modalDetalle = document.createElement("div")
   modalDetalle.innerHTML =  
  ` <h2>Modificar detalles</h2>
   <label for="input">Tarea</label>
   <input type="text" name="tarea">
   <label for="input">Descripción</label>
   <input type="text" name="desc">
   <label for="input">Fecha y Hora entrega</label>
   <input type="text" name="fecha_hora">
   <button class="h-25 w-50" id="modificar">Guardar</button>
`
modalDetalle.classList.add("modalDetalle")
modalDetalle.style.display = "none"
taskContainer.append(modalDetalle)

})
const modificar = document.querySelectorAll(".tareas .modificar")
const modales = document.querySelectorAll(".modalDetalle") 

modificar.forEach((mod, j)=>{
  mod.addEventListener("click",()=>{
    modales[j].style.display = "flex"
  })
})

const guardar = document.querySelectorAll("#modificar")

guardar.forEach((gu, k)=>{
  gu.addEventListener("click",()=>{
    modales[k].style.display = "none"
  })
})

})




