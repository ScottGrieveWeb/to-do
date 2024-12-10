import "./pico.min.css";
import { ToDoItem } from "./to-do-item";
import { ProjectItem } from "./project-item";
import { newToDo } from "./create-to-do";
import { domItems, renderProjectItems, renderProjectList } from "./dom";
import { removeElementsByClass } from "./remove-element";

// temporary projectlist variable, will rework to not be a global variable further down the line
let projectList = [];


let defaultProject = new ProjectItem("Default");
let webDevProject = new ProjectItem("Web Development Journey");

projectList.push(defaultProject);
projectList.push(webDevProject);

renderProjectList(projectList);
//test cases
let testItem0 = new ToDoItem("Make a To Do web app", "For my TOP progress, I need to create a To Do web app", "15th Dec", "1", "Default");
let testItem1 = new ToDoItem("Walk more", "I want to get my steps up", "31st Dec", "2", "Default");
let testItem2 = new ToDoItem("Finalise Work for 2024", "Wrap up all loose ends at work before the new year", "24th Dec", "1", "Default");
let noProjectItem = new ToDoItem("Make my bed", "Wake up and maky my bed", "Daily", "3", "Default");


defaultProject.items.push(testItem0);
defaultProject.items.push(testItem1);
defaultProject.items.push(testItem2);

defaultProject.items.push(noProjectItem);

defaultProject.printProject();
// renderProjectItems(defaultProject);


domItems.toDoButton.addEventListener("click", () => {
    let userInput = newToDo();
    let userToDo = new ToDoItem(userInput.title, userInput.description, userInput.dueDate, userInput.priority, userInput.project);
    defaultProject.items.push(userToDo);
    defaultProject.printProject();
    removeElementsByClass("to-do-item");
    renderProjectItems(defaultProject);
});
