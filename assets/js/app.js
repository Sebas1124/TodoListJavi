

// QUE ES UN CRUD
// C = Create
// R = Read // SHOW // MOSTRAR
// U = Update
// D = Delete

// TODO LIST APP

// DEFINIR VARIABLES GLOBALES
const input     = document.getElementById('task');
const buttonAdd = document.getElementById('btnAdd');
const listApp   = document.getElementById('list');

let tasks = [];

// Evento

document.addEventListener('DOMContentLoaded', () => {

    let tasks = localStorage.getItem('tareas');

    if( tasks ){

        tasks = tasks.split(',');

        tasks.forEach( task => {
            
            addTask(task);

        });

    }

});

// FUNCIONES

const addTask = ( valueInput ) => {

    const task = valueInput;

    if( task === '' ){
        alert('Ingresa una tarea correcta')
        return;
    }

    // crear elementos li

    const li = document.createElement('li');
    li.style.listStyle = 'none';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.marginBottom = '10px';

    const title = document.createElement('h3');
    title.textContent = task;
    title.classList.add('text-center');

    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.gap = '10px';

    // crear boton eliminar
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Eliminar';
    btnDelete.classList.add('btn');
    btnDelete.classList.add('btn-outline-danger');

    // agregar boton de actualizar
    const btnUpdate = document.createElement('button');
    btnUpdate.textContent = 'Actualizar';
    btnUpdate.classList.add('btn');
    btnUpdate.classList.add('btn-outline-warning');

    // boton de detalles de la tarea
    const btnDetails = document.createElement('button');
    btnDetails.textContent = 'Detalles';
    btnDetails.classList.add('btn');
    btnDetails.classList.add('btn-outline-primary');
    btnDetails.setAttribute('data-bs-toggle', 'modal');
    btnDetails.setAttribute('data-bs-target', `detalleModal_${task}`);

    // Eventos

    btnDelete.addEventListener('click', () => {

        li.remove();

        // eliminar de LocalStorage

        const taskToDelete = task;

        tasks = tasks.filter( tarea => tarea !== taskToDelete );

        localStorage.setItem('tareas', tasks);

    });

    btnUpdate.addEventListener('click', () => {

        const newTask = prompt(`Ingrese la actualizacio de la tarea ${ task }`);

        if( newTask === '' ){
            alert('Ingresa un valor correcto');
            return;
        }

        // actualizar en LocalStorage

        const taskToUpdate = task;

        tasks = tasks.map( tarea => tarea === taskToUpdate ? newTask : tarea );

        localStorage.setItem('tareas', tasks);

        title.textContent = newTask;

    });

    btnDetails.addEventListener('click', () => {

        // crear modal con detalles de la tarea

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.classList.add('fade');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('id', `detalleModal_${task}`);

        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalHeader.classList.add('d-flex');
        modalHeader.classList.add('justify-content-between');

        const modalTitle = document.createElement('h5');
        modalTitle.textContent = `Detalles de la tarea ${ task }`;

        const closeModal = document.createElement('button');
        closeModal.textContent = 'Cerrar';
        closeModal.classList.add('btn');
        closeModal.classList.add('btn-danger');

        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        // agregar elementos al modal

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeModal);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        modalDialog.appendChild(modalContent);

        modal.appendChild(modalDialog);

        document.body.appendChild(modal);

        // abrir modal

        const modalInstance = new bootstrap.Modal(modal);
        
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
    localStorage.setItem('tareas', tasks);

    // limpiar input

    input.value = '';

}

// validar input
input.addEventListener('keyup', (event) => {

    event.preventDefault();

    if( event.key === 'Enter' ){
        addTask( input.value );
    }

    // validaciones de input no caracteres especiales

    const regex = /^[a-zA-Z0-9\s]*$/;
    const value = input.value;

    if( !regex.test(value) ){
        input.value = value.slice(0, -1);
    }


});

// evento click en boton agregar

buttonAdd.addEventListener('click', () => {

    if( input.value === '' ){
        alert('Ingresa una tarea correcta')
        return;
    }
    
    addTask( input.value );

});