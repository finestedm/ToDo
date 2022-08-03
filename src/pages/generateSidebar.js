import { projectList, Project, deleteProject } from './projects';
import { regenerateTaskList } from './tasks';

export default function generateSidebar() {

    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerText = 'Project List';

    let newProjectButton = document.createElement('button')
    newProjectButton.setAttribute('id', 'new-project-button')
    newProjectButton.addEventListener('click', () => askForNewProjectName())

    sidebar.append(sidebarTitle, iterateThroughProjectList(), newProjectButton);

    console.log(projectList)
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

function createProjectDiv(projectObject) {
    const projectHolder = document.createElement('li');
    const projectButton = document.createElement('button');
    projectButton.innerText = projectObject.name;
    projectButton.addEventListener('click', () => projectObject.sendSelectedProjectsTasks()) // this event listener for now only console logs tasks added to 'this' specific project. Later show it as list of tasks

    const projectEditButton = document.createElement('button');
    projectEditButton.classList.add('project', 'edit-button');
    projectEditButton.addEventListener('click', () => console.log('this'));

    const projectDeleteButton = document.createElement('button');
    projectDeleteButton.classList.add('project', 'delete-button');
    projectDeleteButton.addEventListener('click', () => deleteProject(projectObject));

    projectHolder.append(projectButton, projectEditButton, projectDeleteButton);

    return projectHolder;
}

function askForNewProjectName() {
    let newProjectName = prompt('Please enter new projects name');
    new Project(newProjectName)
    regenerateProjectList()
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
    

}
