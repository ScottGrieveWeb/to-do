import "./style.css";
import { ToDoItem } from "./to-do-item";
import { ProjectItem } from "./project-item";

let webDevProject = new ProjectItem("Web Development Journey", "Personal");

//test cases
let testItem0 = new ToDoItem("Make a To Do web app", "For my TOP progress, I need to create a To Do web app", "15th Dec", "1");
let testItem1 = new ToDoItem("Walk more", "I want to get my steps up", "31st Dec", "2");
let testItem2 = new ToDoItem("Finalise Work for 2024", "Wrap up all loose ends at work before the new year", "24th Dec", "1");


webDevProject.items.push(testItem0);
webDevProject.items.push(testItem1);
webDevProject.items.push(testItem2);
webDevProject.printProject();
webDevProject.deleteToDo(1);
webDevProject.printProject();