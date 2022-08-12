import { Task, removeTask, createNewTask, createTaskDiv, showTaskEditWindow } from './tasks'
import { removeProjectTasksFromMain, projectList } from './projects'
import { changeProjectHeaderTitle } from './generateProjectTitleHeader'
import { } from './universalDOMmanipulations'

export default function generateMain() {
    const main = document.createElement('main');
    return main;
}

export function appendSelectedProjectsTasksToMain(projectObject) {  //entire projects object is send here. It should be appended with first project tasks but does not work. Order problem?
    removeProjectTasksFromMain();   // clears Main from different projects tasks
    const main = document.querySelector('main');
    const listOfTasks = document.createElement('ul');
    listOfTasks.setAttribute('id', 'task-list')
    for (let i = 0; i < projectObject.taskList.length; i++) {
        const taskDiv = createTaskDiv(projectObject.taskList[i], projectObject);
        listOfTasks.append(taskDiv);
    }

    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('id', 'new-task-button');
    newTaskButton.addEventListener('click', () => showTaskEditWindow({}, projectObject));
    listOfTasks.append(newTaskButton)

    main.append(listOfTasks);

    changeProjectHeaderTitle(projectObject)
}


export function checkIfSelectedProjectIsAlreadyShown(projectToCheck) {
    let currentlySelectedProject = null;
    try {
        currentlySelectedProject = (document.querySelector('main>ul')).id;            // URGENT: change to check projects unique number instead of name because 2 project with exact name will cause problems / OR / allow only projects with unique name 
    } catch (e) {
        currentlySelectedProject = null;

    }

    return ((currentlySelectedProject == projectToCheck) ? true : false)

}





