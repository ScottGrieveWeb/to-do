export class ProjectItem {
    constructor(name) {
        this.name = name;
        this.items = [];
        this.completed = [];
    }

    printProject(){
        console.log(this.name);
        console.table(this.items);
    }

    deleteToDo(index){
        this.items.splice(index, 1);
    }
}