import { projectList, getProjectObjectOfSearchedProject, createProjectDiv, removeProjectTasksFromMain } from "./projects"
import { createTaskDiv, showTaskEditWindow } from './tasks'
import { changeProjectHeaderTitle } from './generateProjectTitleHeader'


export function generateOtherTaskLists() {
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerText = 'Easy access lists';
    sidebarTitle.classList.add('sidebar-lists-header');
    const listOfTasksLists = document.createElement('ul')
    listOfTasksLists.id = 'other-task-lists'
    listOfTasksLists.append(sidebarTitle)
    listOfTasksLists.append(createProjectDiv('7days'), createProjectDiv('important')) //
    return listOfTasksLists
}

export function appendSelectedTasksToMain(MainHeader, listOfTasksFiltered) {
    removeProjectTasksFromMain();   // clears Main from different projects tasks
    const main = document.querySelector('main');
    const listOfTasks = document.createElement('ul');
    listOfTasks.setAttribute('id', 'task-list')

    listOfTasksFiltered.forEach(task => {
        listOfTasks.append(createTaskDiv(task, task.belongsToProjectNumber))
    })

    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('id', 'new-task-button');
    newTaskButton.addEventListener('click', () => showTaskEditWindow({}, {}));
    listOfTasks.append(newTaskButton)

    main.append(listOfTasks);

    changeProjectHeaderTitle(`${MainHeader}`)

}

export function searchForTasksNextWeek() {
    const date = new Date();
    const nextWeekDate = date.setDate(date.getDate() + 7);
    const todayDate = Date.now();
    const tasksNextWeek = [];
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            if ((task.dueDate >= todayDate) && (task.dueDate <= nextWeekDate) && (task.isComplete === false)) {
                tasksNextWeek.push(task);
            }
        })
    })
    return tasksNextWeek
}

export function searchForImportantTasks() {
    const importantTasks = []
    projectList.forEach(project => {
        project.taskList.forEach(task => {
            if ((task.flag === 3) && (task.isComplete === false)) {
                importantTasks.push(task);
            }
        })
    })
    return importantTasks
}

