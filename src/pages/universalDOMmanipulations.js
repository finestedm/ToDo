
export function hideActiveTaskCount() {
    const projectActiveTaskCounters = document.querySelectorAll('.active-task-counter');
    projectActiveTaskCounters.forEach(projectCounter => {
        changeActiveTaskCounterColor(projectCounter)
    })
}

function changeActiveTaskCounterColor(projectCounter) {
    projectCounter.innerHTML === '0' ? projectCounter.style.visibility = 'collapse' : (projectCounter.style.visibility = 'visible') && (projectCounter.style.color = 'black')
}

document.querySelector('body').addEventListener('keydown', (e) => {
    try {
        e.key === 'Escape' ? (document.getElementById('edit-window-holder')).remove() : {};
    } catch (e) {
        { }
    }
})

