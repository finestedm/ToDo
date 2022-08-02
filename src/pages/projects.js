import { appendSelectedProjectsTasksToMain, checkIfSelectedProjectIsAlreadyShown } from './generateMain'
import Task from './tasks'

export const projectList = ['project example 1', 'project example 2']

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


