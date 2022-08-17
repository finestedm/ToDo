import { getTime, format } from 'date-fns'
import { appendSelectedProjectsTasksToMain, checkIfSelectedProjectIsAlreadyShown } from './generateMain'
import { Task, regenerateTaskList } from './tasks'
import { regenerateProjectList } from './generateSidebar'
import { changeProjectHeaderTitle } from './generateProjectTitleHeader'
import { appendSelectedTasksToMain, searchForTasksNextWeek, searchForImportantTasks } from './generateOtherTaskLists'


export const projectList = []

let projectNumber = 0;

function getNewProjectNumber() {
    let newProjectNumber = projectNumber++
    return newProjectNumber
}

export class Project {
    constructor(name) {
        this.name = name;
        this.projectNumber = getNewProjectNumber()
        this.taskList = [];
        projectList.push(this)
    }
    set addTask(task) {
        this.taskList.push(task);
    }

    get listOfTasks() {
        return this.taskList
    }

    sendSelectedProjectsTasks() {
        if (checkIfSelectedProjectIsAlreadyShown(this.name) === false) { // if one selects a project that is already shown in Main then it will not be appended.
            (appendSelectedProjectsTasksToMain(this))
            changeProjectHeaderTitle(this)
        }

    }
}

export function createProjectDiv(projectObject) {
    const projectHolder = document.createElement('li');
    const projectButton = document.createElement('h3');

    if (projectObject === '7days') {
        projectHolder.addEventListener('click', () => appendSelectedTasksToMain('Tasks for the next week', searchForTasksNextWeek()));
        projectButton.innerText = 'Tasks ending this week';
        projectHolder.append(projectButton);
        return projectHolder;

    } else if (projectObject === 'important') {
        projectHolder.addEventListener('click', () => appendSelectedTasksToMain('Tasks with highest priority', searchForImportantTasks()));
        projectButton.innerText = 'High priority';
        projectHolder.append(projectButton);
        return projectHolder;

    } else {
        projectHolder.addEventListener('click', () => projectObject.sendSelectedProjectsTasks());

        projectButton.innerText = projectObject.name;

        const projectEditButton = document.createElement('button');
        projectEditButton.classList.add('project', 'edit-button');
        projectEditButton.addEventListener('click', () => editProjectName(projectObject));

        const projectDeleteButton = document.createElement('button');
        projectDeleteButton.classList.add('project', 'delete-button');
        projectDeleteButton.addEventListener('click', () => deleteProject(projectObject));

        const projectActiveTaskCounter = document.createElement('p');
        projectActiveTaskCounter.classList.add('project', 'active-task-counter');
        projectActiveTaskCounter.innerText = `${getActiveTaskCount(projectObject)}`;

        projectHolder.append(projectButton, projectActiveTaskCounter, projectEditButton, projectDeleteButton);
        return projectHolder;

    }

}


export function deleteProject(projectObject) {
    if (checkIfProjectHasActiveTasks(projectObject)) {
        alert('are you sure you want to delete project with active tasks?') // later add confirmation button

    } else {
        let IndexOfSearchedProject = getIndexOfSearchedProject(projectObject.projectNumber);
        if (projectList.length === 1) {
            alert('cannot delete last project')
        } else {
            projectList.splice(IndexOfSearchedProject, 1);
            regenerateTaskList(projectList[0]);
        }

    }
}

function checkIfProjectHasActiveTasks(projectObject) {
    // console.log(projectObject.taskList.reduce((previousValue, currentValue) => previousValue + currentValue, 0)) // later add function that will count all active tasks within project
    return projectObject.taskList.length !== 0
}

export function removeProjectTasksFromMain() {
    try {
        (document.querySelector('main>ul')).remove();
    } catch (e) {
        { }
    }
}

function getIndexOfSearchedProject(searchedProjectNumber) {

    var searchedProjectObject = projectList.filter(project => {
        return (project.projectNumber === Number(searchedProjectNumber))
    })
    return projectList.indexOf(searchedProjectObject[0])

}

export function getProjectObjectOfSearchedProject(searchedProjectNumber) {

    var searchedProjectObject = projectList.filter(project => {
        return (project.projectNumber === Number(searchedProjectNumber))
    })
    return searchedProjectObject[0]
}

export function editProjectName(projectObject) {
    const projectNewName = prompt('What is the new project name?', projectObject.name);
    if (projectNewName === '') {
        alert('Name cannot be empty');
    } else if (projectNewName === null) {
        { }
    } else {
        projectObject.name = projectNewName;
    }
    regenerateProjectList()
}

export function getActiveTaskCount(projectObject) {
    let activeTaskCount = 0;
    for (let i = 0; i < projectObject.taskList.length; i++) {
        projectObject.taskList[i].isComplete ? {} : activeTaskCount++
    }
    return activeTaskCount
};

