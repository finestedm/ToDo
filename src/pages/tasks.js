import { getTime, format } from 'date-fns'

export default class Task {
    constructor(name) {
        this.name = name;
        this.dateCreated = getTime(new Date());
        this.dateEdited = 0;
        this.dueDate = 0;
    }

    // set dateEdited(date) {
    //     this.dateEdited = date;
    // }

    // set dueDate(date) {
    //     this.dueDate = date;
    // }

}

