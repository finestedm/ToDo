import { projectList, Project, deleteProject, editProjectName, createProjectDiv } from './projects';
import { regenerateTaskList } from './tasks';
import { hideActiveTaskCount } from './universalDOMmanipulations'
import { setLocalStorage } from './page';
import { generateOtherTaskLists } from './generateOtherTaskLists'

export default function generateSidebar() {

    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    sidebar.append(generateOtherTaskLists(), generateProjectListDiv(), createNewProjectButtonDiv());

    return sidebar;
}


function createNewProjectButtonDiv() {
    let newProjectButton = document.createElement('button');
    let newProjectButtonTitle = document.createElement('p');
    newProjectButtonTitle.innerText = 'Create New Project';
    newProjectButton.append(newProjectButtonTitle);
    newProjectButton.setAttribute('id', 'new-project-button');
    newProjectButton.addEventListener('click', () => askForNewProjectName());
    return newProjectButton;
}

function generateProjectListDiv() {
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerText = 'Project List';
    sidebarTitle.classList.add('sidebar-lists-header')
    const listOfProjects = document.createElement('ul')
    listOfProjects.id = 'project-list'
    listOfProjects.append(sidebarTitle);
    for (let i = 0; i < projectList.length; i++) {
        const projectDiv = createProjectDiv(projectList[i])
        listOfProjects.appendChild(projectDiv);
    }
    return listOfProjects
}

function askForNewProjectName() {
    let newProjectName = prompt('Please enter new projects name');
    (newProjectName === '') ? {} : ((new Project(newProjectName)) && (regenerateProjectList()))

}

export function regenerateProjectList() {

    try {           // first we delete the project list
        let currentProjectList = document.getElementById('project-list')
        currentProjectList.remove()
    } catch (e) {
        { }
    }
    let sidebar = document.querySelector('.sidebar')    // we target sidebar
    sidebar.insertBefore(generateProjectListDiv(), document.getElementById('new-project-button')) // and repeat process of creating div per task via generateProjectListDiv() and insert it before the last item (add project button)

    hideActiveTaskCount()
    setLocalStorage()
}

