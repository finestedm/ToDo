import generateSidebar from './generateSidebar'
import generateMain from './generateMain'
import generateProjectTitleHeader from './generateProjectTitleHeader'
import logoImage from '../images/logo.svg'
import { projectList, Project } from './projects'

(function retrieveLocalStorage() {
    const retrievedLocalStorage = window.localStorage.getItem("projectList");
    const retrievedLocalStorageFormatted = (JSON.parse(retrievedLocalStorage))

    retrievedLocalStorageFormatted.forEach(projectRead => {
        let newProjectPushed = new Project(projectRead.name);
        console.log(projectRead.taskList);
        (projectRead.taskList).forEach(task => newProjectPushed.taskList.push(task))
    })
})()

export default function mainWindowGenerate() {
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('main-window');
    (document.getElementById('content')).append(mainWindow);
    mainWindow.append(generateHeader(), generateSidebar(), generateProjectTitleHeader(), generateMain());
}

export function generateHeader() {
    const header = document.createElement('header');
    const headerTitle = document.createElement('h1')
    const logo = document.createElement('img');
    logo.setAttribute('id', 'header--logo')
    logo.setAttribute('src', logoImage)
    headerTitle.innerText = 'My To Do App';
    header.append(logo, headerTitle);
    return header;
}

export function setLocalStorage() {
    localStorage.setItem('projectList', JSON.stringify(projectList))
}