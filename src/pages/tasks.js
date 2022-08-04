import { getTime, format } from 'date-fns'
import { appendSelectedProjectsTasksToMain } from './generateMain';
import { regenerateProjectList } from './generateSidebar';

export class Task {
    constructor(name, projectNumber) {
        this.name = name;
        this.dateCreated = getTime(new Date());
        this.dateEdited = 0;
        this.dueDate = 0;
        this.isComplete = false;
        this.belongsToProjectNumber = projectNumber
    }

    // set dateEdited(date) {
    //     this.dateEdited = date;
    // }

    // set dueDate(date) {
    //     this.dueDate = date;
    // }

}

export function removeTask(taskObject, projectObject) {
    let indexOfSearchedTask = projectObject.taskList.indexOf(taskObject)
    projectObject.taskList.splice(indexOfSearchedTask, 1)
    regenerateTaskList(projectObject)
}

export function createNewTask(projectObject) {
    let newTaskName = prompt('Please input new task name');
    projectObject.addTask = new Task(newTaskName, projectObject.projectNumber)
    regenerateTaskList(projectObject)
}

export function regenerateTaskList(projectObject) {

    try {           // first we delete the project list
        let currentTaskList = document.getElementById('task-list')
        currentTaskList.remove()
    } catch (e) {
        { }
    }
    (appendSelectedProjectsTasksToMain(projectObject))
}

export function createTaskDiv(taskObject, projectObject) {      //entire task object is send here
    const taskHolder = document.createElement('li');

    const taskCompleteButton = document.createElement('input');
    taskCompleteButton.setAttribute('type', 'checkbox');
    taskObject.isComplete === true ? taskCompleteButton.checked = true : taskCompleteButton.checked = false
    taskCompleteButton.classList.add('task', 'complete-input');
    taskCompleteButton.addEventListener('click', () => switchTaskComplete(taskObject, projectObject));

    const taskButton = document.createElement('button');
    taskButton.innerText = taskObject.name;
    taskButton.addEventListener('click', () => console.log(taskObject));

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('task', 'edit-button');
    taskEditButton.addEventListener('click', () => editTask(taskObject));

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('task', 'delete-button');
    taskDeleteButton.addEventListener('click', () => removeTask(taskObject, projectObject));

    const taskDueDateButton = document.createElement('button');
    taskDueDateButton.classList.add('task', 'due-button');
    taskDueDateButton.addEventListener('click', () => console.log('Set Due Date action'));

    taskHolder.append(taskCompleteButton, taskButton, taskEditButton, taskDeleteButton, taskDueDateButton);

    return taskHolder;
}

function switchTaskComplete(taskObject, projectObject) {
    taskObject.isComplete ? taskObject.isComplete = false : taskObject.isComplete = true;
    regenerateProjectList(projectObject);
    regenerateTaskList(projectObject);
}

function editTask() {
    showTaskEditWindow()
}

function showTaskEditWindow() {
    const editWindow = document.createElement('div')
    editWindow.setAttribute('id', 'edit-window')
    const listOfTaskParameters = document.createElement('ul')
    listOfTaskParameters.setAttribute('id', 'list-of-task-parameters')

}