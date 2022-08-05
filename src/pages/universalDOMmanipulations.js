
export function hideActiveTaskCount() {
    const projectActiveTaskCounters = document.querySelectorAll('.active-task-counter');
    projectActiveTaskCounters.forEach(projectCounter => {
        changeActiveTaskCounterColor(projectCounter)
    })
}

function changeActiveTaskCounterColor(projectCounter) {
    projectCounter.innerHTML === '(0)' ? projectCounter.style.color = 'gray' : projectCounter.style.color = '#4fc97e'
}