export  let domItems = {
    button: document.getElementById("test-btn"),
    toDoDiv: document.getElementById("to-do-list")
}


export  const renderProjectItems = function(project){
    for (let i = 0; i < project.items.length; i++){
        let toDoAccordion = document.createElement("details");

        let summary = document.createElement("summary");
        let summaryText = document.createTextNode(`${project.items[i].title}`);
        summary.appendChild(summaryText);

        let description = document.createElement("p");
        let descriptionText = document.createTextNode(`${project.items[i].description}`);
        description.appendChild(descriptionText);
        
        toDoAccordion.appendChild(summary);
        toDoAccordion.appendChild(description);

        domItems.toDoDiv.appendChild(toDoAccordion);
    }
}