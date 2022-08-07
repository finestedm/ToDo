
export function hideActiveTaskCount() {
    const projectActiveTaskCounters = document.querySelectorAll('.active-task-counter');
    projectActiveTaskCounters.forEach(projectCounter => {
        changeActiveTaskCounterColor(projectCounter)
    })
}

function changeActiveTaskCounterColor(projectCounter) {
    projectCounter.innerHTML === '(0)' ? projectCounter.style.color = 'gray' : projectCounter.style.color = '#4fc97e'
}

document.querySelector('body').addEventListener('keydown', (e) => {
    try {
        e.key === 'Escape' ? (document.getElementById('edit-window-holder')).remove() : {};           // URGENT: change to check projects unique number instead of name because 2 project with exact name will cause problems / OR / allow only projects with unique name 
    } catch (e) {
        { }
    }
})

