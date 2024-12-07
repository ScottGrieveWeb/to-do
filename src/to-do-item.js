export class ToDoItem {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }

    printItem(){
        console.log(`Title: ${this.title}`);
        console.log(`Description: ${this.description}`);
        console.log(`Due: ${this.dueDate}`);
        console.log(`Priority: ${this.priority}`);
        console.log(`Project: ${this.project}`);
    }
}