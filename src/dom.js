import { removeElementsByClass } from "./remove-element";

export  let domItems = {
    toDoButton: document.getElementById("to-do-btn"),
    // TODO Add functionality to project button
    projectButton: document.getElementById("project-btn"),
    toDoDiv: document.getElementById("to-do-list")
}

/// TODO Rework rendering functionality to use nested accordions
export  const renderProjectItems = function(project){
    for (let i = 0; i < project.items.length; i++){
        let toDoAccordion = document.createElement("details");
        toDoAccordion.classList.add("to-do-item");
        toDoAccordion.dataset.index = i;

        let summary = document.createElement("summary");
        let summaryText = document.createTextNode(`${project.items[i].title}`);
        summary.appendChild(summaryText);

        let description = document.createElement("p");
        let descriptionText = document.createTextNode(`${project.items[i].description}`);
        description.appendChild(descriptionText);

        const deleteBttn = document.createElement('button')
        const deleteTxt = document.createTextNode('delete');
        deleteBttn.appendChild(deleteTxt);
        deleteBttn.classList.add("delete");
        deleteBttn.addEventListener('click' , () => {
            removeToDo(toDoAccordion.dataset.index, project);
         }); 

        
        toDoAccordion.appendChild(summary);
        toDoAccordion.appendChild(description);
        toDoAccordion.appendChild(deleteBttn);

        // domItems.toDoDiv.appendChild(toDoAccordion);
        return toDoAccordion;
    }
}

export const renderProjectList = function(projectList) {
    for (let i = 0; i < projectList.length; i++){
        let projectAccordion = document.createElement("details");
        projectAccordion.classList.add("project-list");

        let summary = document.createElement("summary");
        let summaryText = document.createTextNode(`${projectList[i].name}`);
        summary.appendChild(summaryText);

        projectAccordion.appendChild(summary);

        let projectToDoList = renderProjectItems(projectList[i]);
        console.log(projectToDoList);
        let projectToDoListDiv = document.createElement("div");
        projectToDoListDiv.innerHTML = projectToDoList
        
        projectAccordion.appendChild(projectToDoListDiv);

        domItems.toDoDiv.appendChild(projectAccordion);
    }
}

function removeToDo(index, project){
    project.items.splice(index, 1);

    removeElementsByClass("to-do-item");
    renderProjectItems(project);
}