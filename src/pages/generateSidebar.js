import { projectList, Project, deleteProject, editProjectName, createProjectDiv } from './projects';
import { regenerateTaskList } from './tasks';
import { hideActiveTaskCount } from './universalDOMmanipulations'
import { setLocalStorage } from './page';

export default function generateSidebar() {

    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerText = 'Project List';

    let newProjectButton = document.createElement('button')
    newProjectButton.setAttribute('id', 'new-project-button')
    newProjectButton.addEventListener('click', () => askForNewProjectName())

    sidebar.append(sidebarTitle, iterateThroughProjectList(), newProjectButton);

    return sidebar;


}

function iterateThroughProjectList() {
    const listOfProjects = document.createElement('ul')
    listOfProjects.id = 'project-list'
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
    sidebar.insertBefore(iterateThroughProjectList(), document.getElementById('new-project-button')) // and repeat process of creating div per task via iterateThroughProjectList() and insert it before the last item (add project button)

    hideActiveTaskCount()
    setLocalStorage()
}

