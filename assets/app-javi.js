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


  