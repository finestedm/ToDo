export const projectList = ['project 1', 'project 2', 'project 3']

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

    appendSelectedProjectsTasksToMain() {
        console.log(this.taskList)      // tasks from specific projects have to be iterated and appended to the main page.
    }

}

const exampleProject = new Project('example')
exampleProject.addTask = 'task1'
exampleProject.addTask = 'task2'
exampleProject.addTask = 'task2'

