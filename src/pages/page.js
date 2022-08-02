import generateSidebar from './generateSidebar'
import generateMain from './generateMain'

export default function mainWindowGenerate() {
    const mainWindow = document.createElement('div');
    mainWindow.classList.add('main-window');
    (document.getElementById('content')).append(mainWindow);
    mainWindow.append(generateHeader(), generateSidebar(), generateMain());
}

export function generateHeader() {
    const header = document.createElement('header');
    const headerTitle = document.createElement('h1')
    headerTitle.innerText = 'My To Do App';
    header.append(headerTitle);
    return header;
}

