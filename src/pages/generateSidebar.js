import { projectList, Project } from './projects';

export default function generateSidebar() {
    const sidebar = document.createElement('nav');
    sidebar.classList.add('sidebar');
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.innerText = 'Project List';
    sidebar.append(sidebarTitle, iterateThroughProjectList());
    return sidebar;
}

function iterateThroughProjectList() {
    const listOfProjects = document.createElement('ul')
    for (let i = 0; i < projectList.length; i++) {
        const newButton = createProjectDiv(projectList[i])
        listOfProjects.appendChild(newButton);
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
    projectEditButton.addEventListener('click', () => console.log('edit action'));

    const projectDeleteButton = document.createElement('button');
    projectDeleteButton.classList.add('project', 'delete-button');
    projectDeleteButton.addEventListener('click', () => console.log('delete action'));

    projectHolder.append(projectButton, projectEditButton, projectDeleteButton);

    return projectHolder;
}