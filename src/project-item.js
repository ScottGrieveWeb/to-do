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
        // for (let i = 0; i < this.items.length; i ++){
        //     this.items[i].printItem();
        // }
    }
}