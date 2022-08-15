import { projectList } from "./projects"

export function generateOtherTaskLists() {
    generateTasksForNextWeek()
}

function generateTasksForNextWeek() {
    projectList.forEach(project => {
        project.taskList.filter(task => {
            task.dueDate
        }

        )
    })
}