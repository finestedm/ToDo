import { getTime, format } from 'date-fns'
import { appendSelectedProjectsTasksToMain } from './generateMain';
import { regenerateProjectList } from './generateSidebar';
import { projectList, getProjectObjectOfSearchedProject } from './projects';
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
    try {
        let indexOfSearchedTask = projectObject.taskList.indexOf(taskObject)
        projectObject.taskList.splice(indexOfSearchedTask, 1)
        regenerateTaskList(projectObject)

    } catch (error) {
        { }
    }

}

export function createNewTask(taskObject, setOfNewValues) {
    taskObject.name = setOfNewValues.taskNewName;
    taskObject.dateEdited = getTime(new Date());
    // taskObject.dueDate = ''newDueDate'';  // not yet implemented
    taskObject.belongsToProjectNumber = setOfNewValues.taskNewBelongToProject[0].projectNumber;
    const newProjectObject = setOfNewValues.taskNewBelongToProject[0]
    newProjectObject.taskList.push(taskObject)
    regenerateTaskList(newProjectObject)
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
    taskEditButton.addEventListener('click', () => showTaskEditWindow(taskObject, projectObject));

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

function editTask(taskObject, setOfNewValues) {
    taskObject.name = setOfNewValues.taskNewName;
    taskObject.dateEdited = getTime(new Date());
    // taskObject.dueDate = ''newDueDate'';  // not yet implemented
    const projectObjectFromWhichToDeleteTask = getProjectObjectOfSearchedProject(taskObject.belongsToProjectNumber)[0]
    taskObject.belongsToProjectNumber = setOfNewValues.taskNewBelongToProject[0].projectNumber;
    const newProjectObject = setOfNewValues.taskNewBelongToProject[0]
    newProjectObject.taskList.push(taskObject)
    removeTask(taskObject, projectObjectFromWhichToDeleteTask)
    regenerateTaskList(newProjectObject)


    // taskObject.flag = setOfNewValues.taskNewFlag;

}

export function showTaskEditWindow(taskObject, projectObject) {
    const editWindowHolder = document.createElement('div');
    editWindowHolder.setAttribute('id', 'edit-window-holder');
    const editWindow = document.createElement('form');
    editWindow.setAttribute('id', 'edit-window');

    const listOfTaskParameters = document.createElement('ul');
    listOfTaskParameters.setAttribute('id', 'list-of-task-parameters');

    switch (taskObject.name) {  // if task is just created it has no name so in this case we send parameters to createTask instead of editTask
        case undefined:
            let newTask = new Task(null, projectObject.projectNumber)
            listOfTaskParameters.append(getTaskNameDiv('New task name'), getTaskBelongToProjectDiv(projectObject), getTaskFlagDiv(newTask.flag), getSubmitAndCancelButtons(newTask));
            break;

        default:
            listOfTaskParameters.append(getTaskNameDiv(taskObject.name), getTaskBelongToProjectDiv(projectObject), getTaskFlagDiv(taskObject.flag), getSubmitAndCancelButtons(taskObject));
            break;
    }
    editWindow.append(listOfTaskParameters);
    editWindowHolder.append(editWindow)
    document.querySelector('body').append(editWindowHolder);
}

function getTaskNameDiv(taskObjectName) {
    const taskName = document.createElement('li');
    taskName.classList.add('task-name-input')
    const taskNameInput = document.createElement('input');
    taskNameInput.setAttribute('type', 'text');
    taskNameInput.setAttribute('id', 'task-name-input');
    taskNameInput.value = taskObjectName;
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
    taskBelongToProjectInput.setAttribute('id', 'project-list-belongs');
    projectList.forEach(project => {
        const option = document.createElement('option');
        option.innerHTML = project.name;
        option.setAttribute('dataset', project.projectNumber);
        project.name === projectObject.name ? option.setAttribute('selected', 'selected') : {};
        taskBelongToProjectInput.append(option);
    })
    taskBelongToProject.append(taskBelongToProjectInputLabel, taskBelongToProjectInput);
    return taskBelongToProject;
}

function getTaskFlagDiv(taskObjectFlag) {
    const taskFlag = document.createElement('li');
    taskFlag.classList.add('project-flag-selector');
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
        taskFlagInput.setAttribute('dataset', i);
        taskObjectFlag === i ? taskFlagInput.checked = true : {};
        taskFlagInputLabel.append(flagImg)
        taskFlagFieldset.append(taskFlagInput, taskFlagInputLabel)
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
    submitButton.setAttribute('type', 'button')
    submitButton.setAttribute('id', 'submit-button');
    (taskObject.name === null) ? ((submitButton.innerText = 'Add new task') && (submitButton.addEventListener('click', () => createNewTask(taskObject, readNewTaskParameters())))) : ((submitButton.innerText = 'Edit task') && (submitButton.addEventListener('click', () => editTask(taskObject, readNewTaskParameters()))));
    buttonHolder.append(cancelButton, submitButton)
    return buttonHolder
}

function readNewTaskParameters(currentProjectObject) {
    const taskNewName = document.getElementById('task-name-input').value
    const taskNewBelongToProjectList = document.getElementById('project-list-belongs')
    const taskNewBelongToProjectNumber = taskNewBelongToProjectList.options[taskNewBelongToProjectList.selectedIndex].attributes.dataset.value;
    // const taskNewFlag = document.querySelector('input[name="task-flag"]:checked').attributes.dataset.value;
    return {
        'taskNewName': taskNewName,
        'taskNewBelongToProject': getProjectObjectOfSearchedProject(taskNewBelongToProjectNumber),
        // 'taskNewFlag': taskNewFlag,
        'currentProjectObject': currentProjectObject
    }
};

