import { getTime, format } from 'date-fns'
import { appendSelectedProjectsTasksToMain } from './generateMain';
import { regenerateProjectList } from './generateSidebar';
import { projectList } from './projects';
import { hideActiveTaskCount } from './universalDOMmanipulations'
import flagImage from '../images/flag.svg'


export class Task {
    constructor(name, projectNumber) {
        this.name = name;
        this.dateCreated = getTime(new Date());
        this.dateEdited = 0;
        this.dueDate = 0;
        this.isComplete = false;
        this.belongsToProjectNumber = projectNumber;
        this.flag = 0;
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
    regenerateProjectList(projectObject)
    console.log('renegerate in')
}

export function createTaskDiv(taskObject, projectObject) {      //entire task object is send here
    const taskHolder = document.createElement('li');

    const taskCompleteButton = document.createElement('input');
    taskCompleteButton.setAttribute('type', 'checkbox');
    taskObject.isComplete === true ? taskCompleteButton.checked = true : taskCompleteButton.checked = false
    taskCompleteButton.classList.add('task', 'complete-input');
    taskCompleteButton.addEventListener('click', () => switchTaskComplete(taskObject, projectObject));

    const taskName = document.createElement('h3');
    taskName.innerText = taskObject.name;

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('task', 'edit-button');
    taskEditButton.addEventListener('click', () => editTask(taskObject, projectObject));

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('task', 'delete-button');
    taskDeleteButton.addEventListener('click', () => removeTask(taskObject, projectObject));

    const taskDueDateButton = document.createElement('button');
    taskDueDateButton.classList.add('task', 'due-button');
    taskDueDateButton.addEventListener('click', () => console.log('Set Due Date action'));

    taskHolder.append(taskCompleteButton, taskName, taskEditButton, taskDeleteButton, taskDueDateButton);

    return taskHolder;
}

function switchTaskComplete(taskObject, projectObject) {
    taskObject.isComplete ? taskObject.isComplete = false : taskObject.isComplete = true;
    // moveTaskToTheEndOfArray(taskObject, projectObject)
    regenerateTaskList(projectObject);
    hideActiveTaskCount()
}

function editTask(taskObject, projectObject) {
    showTaskEditWindow(taskObject, projectObject)
}

function showTaskEditWindow(taskObject, projectObject) {
    const editWindowHolder = document.createElement('div');
    editWindowHolder.setAttribute('id', 'edit-window-holder');
    const editWindow = document.createElement('form');
    editWindow.setAttribute('id', 'edit-window');

    const listOfTaskParameters = document.createElement('ul');
    listOfTaskParameters.setAttribute('id', 'list-of-task-parameters');

    listOfTaskParameters.append(getTaskNameDiv(taskObject), getTaskBelongToProjectDiv(projectObject), getTaskFlagDiv(taskObject), getSubmitAndCancelButtons(taskObject));
    editWindow.append(listOfTaskParameters);
    editWindowHolder.append(editWindow)
    document.querySelector('body').append(editWindowHolder);
}

function getTaskNameDiv(taskObject) {
    const taskName = document.createElement('li');
    taskName.setAttribute('id', 'task-name-input')
    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.value = taskObject.name;
    const taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.innerHTML = 'Task name:';
    taskName.append(taskNameInputLabel, taskNameInput);
    return taskName;
}

function getTaskBelongToProjectDiv(projectObject) {
    const taskBelongToProject = document.createElement('li');
    const taskBelongToProjectInput = document.createElement('select');
    const taskBelongToProjectInputLabel = document.createElement('label');
    taskBelongToProjectInputLabel.innerText = 'Task assigned to project:'
    taskBelongToProjectInput.setAttribute('name', 'project-list-dropdown');
    projectList.forEach(project => {
        const option = document.createElement('option');
        option.innerHTML = project.name;
        project.name === projectObject.name ? option.setAttribute('selected', 'selected') : {};
        taskBelongToProjectInput.append(option);
    })
    taskBelongToProject.append(taskBelongToProjectInputLabel, taskBelongToProjectInput);
    return taskBelongToProject;
}

function getTaskFlagDiv(taskObject) {
    const taskFlag = document.createElement('li');
    const taskFlagFieldset = document.createElement('fieldset');
    const taskFlagFieldsetLegend = document.createElement('legend');
    taskFlagFieldsetLegend.innerHTML = 'Choose flag:'
    taskFlagFieldset.append(taskFlagFieldsetLegend);
    taskFlag.append(taskFlagFieldset);
    for (let i = 0; i <= 3; i++) {
        const taskFlagInputLabel = document.createElement('Label');
        taskFlagInputLabel.setAttribute('for', `task-flag-${i}`)
        const flagImg = document.createElement('img')
        flagImg.setAttribute('src', flagImage)
        flagImg.setAttribute('id', `flag-${i}`)
        const taskFlagInput = document.createElement('input');
        taskFlagInput.setAttribute('type', 'radio');
        taskFlagInput.setAttribute('name', `task-flag`);
        taskFlagInput.setAttribute('id', `task-flag-${i}`);
        taskObject.flag === i ? taskFlagInput.checked = true : {};
        taskFlagInputLabel.append(taskFlagInput)
        taskFlagFieldset.append(taskFlagInputLabel, flagImg)
    }
    return taskFlag;
}

function getSubmitAndCancelButtons(taskObject) {
    const buttonHolder = document.createElement('div')
    buttonHolder.setAttribute('id', 'submit-and-cancel-button-holder')
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button')
    cancelButton.setAttribute('id', 'cancel-button');
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', () => document.getElementById('edit-window-holder').remove())

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('id', 'submit-button');
    submitButton.innerText = 'Edit task'

    buttonHolder.append(cancelButton, submitButton)
    return buttonHolder
}

// function moveTaskToTheEndOfArray(taskObject, projectObject) {
//     projectObject.taskList.indexOf(taskObject)
//     console.log('yes')
// }