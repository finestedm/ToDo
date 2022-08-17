import { getActiveTaskCount, Project } from "./projects";
import { searchForTasksNextWeek } from "./generateOtherTaskLists";

export default function generateProjectTitleHeader() {
    const ProjectTitleHolder = document.createElement('div');
    const projectTitleHeader = document.createElement('h1');
    ProjectTitleHolder.setAttribute('id', 'main--project-title-header');
    projectTitleHeader.innerText = 'Select a project first';
    const projectTaskCounter = document.createElement('span');
    ProjectTitleHolder.append(projectTitleHeader, projectTaskCounter);

    return ProjectTitleHolder;
}

export function changeProjectHeaderTitle(projectObject) {
    const ProjectTitleHolder = document.getElementById('main--project-title-header');
    const projectTitleHeader = ProjectTitleHolder.querySelector('h1');
    const projectTitleCounter = ProjectTitleHolder.querySelector('span');
    if (typeof projectObject === 'object') {
        projectTitleHeader.innerText = projectObject.name
        const numberOfActiveTasks = getActiveTaskCount(projectObject);
        const numberWord = (numberOfActiveTasks === 1) ? 'is' : 'are';
        const theString = `This project contains ${(projectObject.taskList.length)} tasks, from which ${numberOfActiveTasks} ${numberWord} still active.`;
        projectTitleCounter.innerHTML = theString
    } else {
        projectTitleHeader.innerText = projectObject; // if we send string from 7days list then projectObject is not really an object...
        const numberOfActiveTasks = searchForTasksNextWeek().length;
        const numberWord = (numberOfActiveTasks === 1) ? 'task' : 'tasks';
        const theString = `You have ${(numberOfActiveTasks)} ${numberWord} to finish this week.`;
        projectTitleCounter.innerHTML = theString

    }
}
