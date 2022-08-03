import { appendSelectedProjectsTasksToMain, checkIfSelectedProjectIsAlreadyShown } from './generateMain'
import { Task, regenerateTaskList } from './tasks'
import { regenerateProjectList } from './generateSidebar'

export const projectList = []

export class Project {
    constructor(name) {
        this.name = name;
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

export function deleteProject(projectObject) {
    let indexOfSearchedObject = projectList.indexOf(projectObject)
    projectList.splice(indexOfSearchedObject, 1)
    regenerateProjectList()
    let indexOfPreviousProjectInArray = (indexOfSearchedObject - 1)
    regenerateTaskList(projectList[indexOfPreviousProjectInArray])
}

export function removeProjectTasksFromMain() {
    try {
        (document.querySelector('main>ul')).remove();
    } catch (e) {
        { }
    }
}

const exampleProject = new Project('example')
const exampleTask = (new Task('chleb'))
exampleTask.dueDate = new Date();
exampleProject.addTask = exampleTask
console.log(exampleProject.listOfTasks)

const exampleProject2 = new Project('example2')
const exampleTask2 = (new Task('chleb2'))
exampleTask2.dueDate = new Date();
exampleProject2.addTask = exampleTask2
console.log(exampleProject2.listOfTasks)



const exampleProject3 = new Project('example3')
const exampleTask3 = (new Task('chleb3'))
exampleTask3.dueDate = new Date();
exampleProject3.addTask = exampleTask3
console.log(exampleProject2.listOfTasks)


