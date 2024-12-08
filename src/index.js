import "./pico.min.css";
import { ToDoItem } from "./to-do-item";
import { ProjectItem } from "./project-item";
import { newToDo } from "./create-to-do";
import { domItems, renderProjectItems } from "./dom";


let defaultProject = new ProjectItem("Default");
let webDevProject = new ProjectItem("Web Development Journey");

//test cases
let testItem0 = new ToDoItem("Make a To Do web app", "For my TOP progress, I need to create a To Do web app", "15th Dec", "1", "Web Dev Project");
let testItem1 = new ToDoItem("Walk more", "I want to get my steps up", "31st Dec", "2", "Web Dev Project");
let testItem2 = new ToDoItem("Finalise Work for 2024", "Wrap up all loose ends at work before the new year", "24th Dec", "1", "Web Dev Project");
let noProjectItem = new ToDoItem("Make my bed", "Wake up and maky my bed", "Daily", "3", "Default");


webDevProject.items.push(testItem0);
webDevProject.items.push(testItem1);
webDevProject.items.push(testItem2);


defaultProject.items.push(noProjectItem);

webDevProject.printProject();
defaultProject.printProject();
renderProjectItems(webDevProject);


domItems.button.addEventListener("click", () => {
    let userInput = newToDo();
    let userToDo = new ToDoItem(userInput.title, userInput.description, userInput.dueDate, userInput.priority, userInput.project);
    defaultProject.items.push(userToDo);
    defaultProject.printProject();
});


