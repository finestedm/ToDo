export default function generateMain() {
    const main = document.createElement('main');
    return main;
}

export function appendSelectedProjectsTasksToMain(projectObject) {  //entire projects object is send here
    removeProjectTasksFromMain();   // clears Main from different projects tasks
    const main = document.querySelector('main');
    const listOfTasks = document.createElement('ul');
    listOfTasks.setAttribute('id', projectObject.name)
    for (let i = 0; i < projectObject.taskList.length; i++) {
        const taskDiv = createTaskDiv(projectObject.taskList[i]);
        listOfTasks.append(taskDiv);
    }
    main.append(listOfTasks);
}

function createTaskDiv(taskObject) {      //entire task object is send here
    const taskHolder = document.createElement('li');
    const taskButton = document.createElement('button');
    taskButton.innerText = taskObject.name;
    taskButton.addEventListener('click', () => console.log('eee'));

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('task', 'edit-button');
    taskEditButton.addEventListener('click', () => console.log('edit action'));

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('task', 'delete-button');
    taskDeleteButton.addEventListener('click', () => console.log('delete action'));

    const taskDueDateButton = document.createElement('button');
    taskDueDateButton.classList.add('task', 'due-button');
    taskDueDateButton.addEventListener('click', () => console.log('Set Due Date action'));

    taskHolder.append(taskButton, taskEditButton, taskDeleteButton, taskDueDateButton);

    return taskHolder;
}

export function checkIfSelectedProjectIsAlreadyShown(projectToCheck) {
    let currentlySelectedProject = null;
    try {
        currentlySelectedProject = (document.querySelector('main>ul')).id;            // URGENT: change to check projects unique number instead of name because 2 project with exact name will cause problems / OR / allow only projects with unique name 
    } catch (e) {
        currentlySelectedProject = null;

    }

    return ((currentlySelectedProject == projectToCheck) ? true : false)

}

function removeProjectTasksFromMain() {
    try {
        (document.querySelector('main>ul')).remove();
    } catch (e) {
        { }
    }
}