export default function generateMain() {
    const main = document.createElement('main');
    return main;
}

export function appendSelectedProjectsTasksToMain(taskList) {
    const main = document.querySelector('main')
    for (let i = 0; i < taskList.length; i++) {
        main.append(taskList[i]);

    }
}