import { getTime, format } from 'date-fns'
import { appendSelectedProjectsTasksToMain } from './generateMain';

export class Task {
    constructor(name) {
        this.name = name;
        this.dateCreated = getTime(new Date());
        this.dateEdited = 0;
        this.dueDate = 0;
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
    console.log(projectObject.taskList)
}

export function askForNewTaskName(projectObject) {
    let newTaskName = prompt('Please input new task name');
    projectObject.addTask = new Task(newTaskName)
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
    const taskButton = document.createElement('button');
    taskButton.innerText = taskObject.name;
    taskButton.addEventListener('click', () => console.log('eee'));

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('task', 'edit-button');
    taskEditButton.addEventListener('click', () => console.log('edit action'));

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('task', 'delete-button');
    taskDeleteButton.addEventListener('click', () => removeTask(taskObject, projectObject));

    const taskDueDateButton = document.createElement('button');
    taskDueDateButton.classList.add('task', 'due-button');
    taskDueDateButton.addEventListener('click', () => console.log('Set Due Date action'));

    taskHolder.append(taskButton, taskEditButton, taskDeleteButton, taskDueDateButton);

    return taskHolder;
}