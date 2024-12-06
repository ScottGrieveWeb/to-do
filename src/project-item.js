export class ProjectItem {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.items = [];
    }

    printProject(){
        console.log(this.name);
        console.log(`Type: ${this.type}`);
        console.table(this.items);
    }

    deleteToDo(index){
        this.items.splice(index, 1);
    }
}