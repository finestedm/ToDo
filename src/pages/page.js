import generateSidebar from './generateSidebar'
import generateMain from './generateMain'
import logoImage from '../images/logo.svg'

export default function mainWindowGenerate() {
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('main-window');
    (document.getElementById('content')).append(mainWindow);
    mainWindow.append(generateHeader(), generateSidebar(), generateMain());
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

