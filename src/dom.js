import { removeElementsByClass } from "./remove-element";

export  let domItems = {
    button: document.getElementById("test-btn"),
    toDoDiv: document.getElementById("to-do-list")
}


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

        domItems.toDoDiv.appendChild(toDoAccordion);
    }
}

function removeToDo(index, project){
    project.items.splice(index, 1);

    removeElementsByClass("to-do-item");
    renderProjectItems(project);
}