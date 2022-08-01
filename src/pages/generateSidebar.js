import { projectList, Project } from './projectList';

export default function generateSidebar() {
    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerText = 'Project List';
    sidebar.append(sidebarTitle, iterateThroughProjectList());
    return sidebar;
}

function iterateThroughProjectList() {
    const listOfProjectsTitles = document.createElement('ul')
    for (let i = 0; i < projectList.length; i++) {
        const newButton = createProjectButton(projectList[i])
        listOfProjectsTitles.appendChild(newButton);
    }
    return listOfProjectsTitles
}

function createProjectButton(projectObject) {
    const projectHolder = document.createElement('li');
    const projectButton = document.createElement('button');
    projectButton.innerText = projectObject.name;
    projectButton.addEventListener('click', () => projectObject.appendSelectedProjectsTasksToMain()) // this event listener for now only console logs tasks added to 'this' specific project. Later show it as list of tasks
    projectHolder.append(projectButton);
    return projectHolder;
}