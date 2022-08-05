import { getTime, format } from 'date-fns'
import { appendSelectedProjectsTasksToMain, checkIfSelectedProjectIsAlreadyShown } from './generateMain'
import { Task, regenerateTaskList } from './tasks'
import { regenerateProjectList } from './generateSidebar'

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
        checkIfSelectedProjectIsAlreadyShown(this.name) ? {} : appendSelectedProjectsTasksToMain(this) // if one selects a project that is already shown in Main then it will not be appended.
    }

}

export function createProjectDiv(projectObject) {
    const projectHolder = document.createElement('li');
    const projectButton = document.createElement('button');
    projectButton.innerText = projectObject.name;
    projectButton.addEventListener('click', () => projectObject.sendSelectedProjectsTasks()) // this event listener for now only console logs tasks added to 'this' specific project. Later show it as list of tasks

    const projectEditButton = document.createElement('button');
    projectEditButton.classList.add('project', 'edit-button');
    projectEditButton.addEventListener('click', () => editProjectName(projectObject));

    const projectDeleteButton = document.createElement('button');
    projectDeleteButton.classList.add('project', 'delete-button');
    projectDeleteButton.addEventListener('click', () => deleteProject(projectObject.projectNumber));

    const projectActiveTaskCounter = document.createElement('p');
    projectActiveTaskCounter.classList.add('project', 'active-task-counter');
    projectActiveTaskCounter.innerText = `(${getActiveTaskCount(projectObject)})`;

    projectHolder.append(projectButton, projectActiveTaskCounter, projectEditButton, projectDeleteButton);

    return projectHolder;
}


export function deleteProject(projectToDeleteNumber) {
    let IndexOfSearchedProject = getIndexOfSearchedProject(projectToDeleteNumber)
    projectList.splice(IndexOfSearchedProject, 1)
    regenerateProjectList()
    let numberOfPreviousProjectInArray = (IndexOfSearchedProject - 1)       // new function required to look for the number instead of the index
    regenerateTaskList(projectList[numberOfPreviousProjectInArray])
}

export function removeProjectTasksFromMain() {
    try {
        (document.querySelector('main>ul')).remove();
    } catch (e) {
        { }
    }
}

function getIndexOfSearchedProject(searchedProjectNumber) {

    for (let i = 0; i < projectList.length; i++) {
        if (projectList[i].projectNumber === searchedProjectNumber) {
            return projectList.indexOf(projectList[i])
        }

    }
}

export function editProjectName(projectObject) {
    projectObject.name = prompt('What is the new project name?', projectObject.name)
    regenerateProjectList()
}


const exampleProject = new Project('example')
const exampleTask = (new Task('chleb'))
exampleTask.dueDate = getTime(new Date());
exampleProject.addTask = exampleTask
console.log(exampleProject.listOfTasks)

const exampleProject2 = new Project('example2')
const exampleTask2 = (new Task('chleb2'))
exampleTask2.dueDate = getTime(new Date());
exampleProject2.addTask = exampleTask2
console.log(exampleProject2.listOfTasks)



const exampleProject3 = new Project('example3')
const exampleTask3 = (new Task('chleb3'))
exampleTask3.dueDate = getTime(new Date());
exampleProject3.addTask = exampleTask3
console.log(exampleProject2.listOfTasks);

export function getActiveTaskCount(projectObject) {
    let activeTaskCount = 0;
    for (let i = 0; i < projectObject.taskList.length; i++) {
        projectObject.taskList[i].isComplete ? {} : activeTaskCount++
    }
    return activeTaskCount
};


