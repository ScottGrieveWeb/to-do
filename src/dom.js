import { removeElementsByClass } from "./remove-element";
import { projectList } from "./index";
import { ProjectItem } from "./project-item";
import { newToDo } from "./create-to-do";
import { ToDoItem } from "./to-do-item";

export  let domItems = {
    toDoButton: document.getElementById("to-do-btn"),
    // TODO Add functionality to project button
    projectButton: document.getElementById("project-btn"),
    toDoDiv: document.getElementById("to-do-list")
}

export  const renderProjectItems = function(project, id){
    for (let i = 0; i < project.items.length; i++){
        let toDoAccordion = document.createElement("details");
        toDoAccordion.classList.add("to-do-item");
        toDoAccordion.classList.add(`priority${project.items[i].priority}`);
        toDoAccordion.dataset.index = i;

        let summary = document.createElement("summary");
        let summaryText = document.createTextNode(`${project.items[i].title}`);
        summary.appendChild(summaryText);

        let description = document.createElement("p");
        let descriptionText = document.createTextNode(`${project.items[i].description}`);
        description.classList.add("todo-description");
        description.appendChild(descriptionText);

        let due = document.createElement("p");
        let dueText = document.createTextNode(`Due: ${project.items[i].dueDate}`);
        due.classList.add("todo-due");
        due.appendChild(dueText);

        let priority = document.createElement("p");
        let priorityText = document.createTextNode(`Priority: ${project.items[i].priority}`);
        priority.classList.add("todo-priority");
        priority.appendChild(priorityText);
        const completedCheckBoxLabel = document.createElement('label');
        completedCheckBoxLabel.setAttribute('for', `checkbox-${project.items[i].title}`);
        const checkBoxLabelText = document.createTextNode("completed:");
        completedCheckBoxLabel.appendChild(checkBoxLabelText);

        const completedCheckBox = document.createElement('input');
        completedCheckBox.setAttribute('type', 'checkbox');
        completedCheckBox.setAttribute('name', `checkbox-${project.items[i].title}`);
        completedCheckBoxLabel.appendChild(completedCheckBox);

        const deleteBttn = document.createElement('button')
        const deleteTxt = document.createTextNode('delete');
        deleteBttn.appendChild(deleteTxt);
        deleteBttn.classList.add("delete");
        deleteBttn.addEventListener('click' , () => {
            removeToDo(toDoAccordion.dataset.index, project);
         }); 
        
        toDoAccordion.appendChild(summary);
        toDoAccordion.appendChild(description);
        toDoAccordion.appendChild(due);
        toDoAccordion.appendChild(priority);
        toDoAccordion.appendChild(completedCheckBoxLabel);
        toDoAccordion.appendChild(deleteBttn);

        let currentProjectDiv = document.getElementById(id);
        currentProjectDiv.appendChild(toDoAccordion);
    }
}

export const renderProjectList = function(projectList) {
    for (let i = 0; i < projectList.length; i++){
        let projectAccordion = document.createElement("details");
        projectAccordion.classList.add("project-list");
        projectAccordion.setAttribute("id", `project${i}`);
        projectAccordion.open = true;

        let summary = document.createElement("summary");
        let summaryText = document.createTextNode(`${projectList[i].name}`);
        summary.appendChild(summaryText);

        projectAccordion.appendChild(summary);

        domItems.toDoDiv.appendChild(projectAccordion);
        renderProjectItems(projectList[i], `project${i}`);

        const addBttn = document.createElement("button");
        const addBttnText = document.createTextNode("+");
        addBttn.appendChild(addBttnText);
        addBttn.classList.add("add-btn");
        addBttn.addEventListener('click', () => {
            let userInput = newToDo();
            let newToDoItem = new ToDoItem(userInput.title, userInput.description, userInput.dueDate, userInput.priority);
            
            projectList[i].items.push(newToDoItem);
            
            removeElementsByClass("project-list");
            renderProjectList(projectList);
         });

         projectAccordion.appendChild(addBttn);
    }
}



function removeToDo(index, project){
    project.items.splice(index, 1);

    removeElementsByClass("project-list");
    renderProjectList(projectList);
}


domItems.projectButton.addEventListener("click", () => {
    let userInput = prompt("What is the name of your new project?");
    let newProject = new ProjectItem(userInput);

    projectList.push(newProject);

    removeElementsByClass("project-list");
    renderProjectList(projectList);
});