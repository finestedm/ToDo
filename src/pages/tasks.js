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
        this.content = null;
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
    taskObject.content = setOfNewValues.taskNewContent;
    taskObject.dateEdited = getTime(new Date());
    taskObject.dueDate = setOfNewValues.taskNewDueDate;  // not yet implemented
    taskObject.belongsToProjectNumber = setOfNewValues.taskNewBelongToProject.projectNumber;
    const newProjectObject = setOfNewValues.taskNewBelongToProject
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
    taskHolder.classList.add(`flag-${taskObject.flag}`)

    const taskCompleteButton = document.createElement('input');
    taskCompleteButton.setAttribute('type', 'checkbox');
    taskObject.isComplete === true ? taskCompleteButton.checked = true : taskCompleteButton.checked = false
    taskCompleteButton.classList.add('task', 'complete-input');
    taskCompleteButton.addEventListener('click', () => switchTaskComplete(taskObject, getProjectObjectOfSearchedProject(taskObject.belongsToProjectNumber)));

    const taskName = document.createElement('h3');
    taskName.innerText = taskObject.name;

    const taskContent = document.createElement('p');
    taskContent.innerText = taskObject.content;

    const taskDueDate = document.createElement('time');
    if (taskObject.dueDate === NaN || taskObject.dueDate === null) {
        taskDueDate.innerText = '';
    } else {
        taskDueDate.innerText = (format(getTime(taskObject.dueDate), 'yyyy-MM-dd'));
    }

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('task', 'edit-button');
    taskEditButton.addEventListener('click', () => showTaskEditWindow(taskObject, getProjectObjectOfSearchedProject(taskObject.belongsToProjectNumber)));

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.classList.add('task', 'delete-button');
    taskDeleteButton.addEventListener('click', () => removeTask(taskObject, getProjectObjectOfSearchedProject(taskObject.belongsToProjectNumber)));

    taskHolder.append(taskCompleteButton, taskName, taskContent, taskDueDate, taskEditButton, taskDeleteButton);

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
    taskObject.content = setOfNewValues.taskNewContent;
    taskObject.dateEdited = getTime(new Date());
    taskObject.dueDate = setOfNewValues.taskNewDueDate;
    taskObject.flag = setOfNewValues.taskNewFlag;
    const projectObjectFromWhichToDeleteTask = getProjectObjectOfSearchedProject(taskObject.belongsToProjectNumber)
    taskObject.belongsToProjectNumber = setOfNewValues.taskNewBelongToProject.projectNumber;
    const newProjectObject = setOfNewValues.taskNewBelongToProject
    newProjectObject.taskList.push(taskObject)
    removeTask(taskObject, projectObjectFromWhichToDeleteTask)
    regenerateTaskList(newProjectObject)
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
            listOfTaskParameters.append(getTaskNameDiv('New task name'), getTaskContentDiv('Enter your notes here'), getTaskDueDate(null), getTaskBelongToProjectDiv(projectObject), getTaskFlagDiv(newTask.flag), getSubmitAndCancelButtons(newTask));
            break;

        default:
            listOfTaskParameters.append(getTaskNameDiv(taskObject.name), getTaskContentDiv(taskObject.content), getTaskDueDate(taskObject.dueDate, 'yyyy-MM-dd'), getTaskBelongToProjectDiv(projectObject), getTaskFlagDiv(taskObject.flag), getSubmitAndCancelButtons(taskObject));
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

function getTaskContentDiv(taskObjectContent) {
    const taskContent = document.createElement('li');
    taskContent.classList.add('task-content-input')
    const taskContentInput = document.createElement('textarea');
    taskContentInput.setAttribute('id', 'task-content-input');
    taskContentInput.value = taskObjectContent;
    const taskContentInputLabel = document.createElement('label');
    taskContentInputLabel.innerHTML = 'Task:';
    taskContent.append(taskContentInputLabel, taskContentInput);
    return taskContent;
}

function getTaskDueDate(currentDueDate) {
    const taskDueDate = document.createElement('li');
    taskDueDate.classList.add('task-duedate-input')
    const taskDueDateInput = document.createElement('input');
    taskDueDateInput.setAttribute('min', `${(format(getTime(new Date()), 'yyyy-MM-dd'))}`);
    taskDueDateInput.setAttribute('max', '2050-12-31');
    currentDueDate !== null && taskDueDateInput.setAttribute('value', `${format(currentDueDate, 'yyyy-MM-dd')}`);
    taskDueDateInput.setAttribute('type', 'date');
    taskDueDateInput.setAttribute('id', 'task-duedate-input');
    const taskDueDateInputLabel = document.createElement('label');
    taskDueDateInputLabel.innerHTML = 'Due Date:';
    taskDueDate.append(taskDueDateInputLabel, taskDueDateInput);
    return taskDueDate;
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
    taskFlagFieldset.id = 'flag-chooser';
    const taskFlagFieldsetLegend = document.createElement('legend');
    taskFlagFieldsetLegend.setAttribute('for', 'flag-chooser')
    taskFlag.append(taskFlagFieldsetLegend);
    taskFlagFieldsetLegend.innerHTML = 'Choose flag:'
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
    if (taskObject.name === null) {
        submitButton.innerText = 'Add new task'
        submitButton.addEventListener('click', () => createNewTask(taskObject, readNewTaskParameters()))
    } else {
        submitButton.innerText = 'Edit task'
        submitButton.addEventListener('click', () => editTask(taskObject, readNewTaskParameters()))
    }
    buttonHolder.append(cancelButton, submitButton)
    return buttonHolder
}

function readNewTaskParameters(currentProjectObject) {
    const taskNewName = document.getElementById('task-name-input').value
    const taskNewContent = document.getElementById('task-content-input').value
    const taskNewDueDateUnformatted = document.getElementById('task-duedate-input').value;      //move to separate function?
    let taskNewDueDate = 0;
    (taskNewDueDateUnformatted === '') ? taskNewDueDate = null : taskNewDueDate = (Math.floor(new Date(`${taskNewDueDateUnformatted}`).getTime()));
    const taskNewBelongToProjectList = document.getElementById('project-list-belongs')
    const taskNewBelongToProjectNumber = taskNewBelongToProjectList.options[taskNewBelongToProjectList.selectedIndex].attributes.dataset.value;
    const taskNewFlag = parseInt(document.querySelector('input[name="task-flag"]:checked').attributes.dataset.value);
    document.getElementById('edit-window-holder').remove()
    return {
        'taskNewName': taskNewName,
        'taskNewContent': taskNewContent,
        'taskNewDueDate': taskNewDueDate,
        'taskNewBelongToProject': getProjectObjectOfSearchedProject(taskNewBelongToProjectNumber),
        'taskNewFlag': taskNewFlag,
        'currentProjectObject': currentProjectObject
    }
};

