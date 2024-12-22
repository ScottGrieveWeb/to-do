import { removeElementsByClass } from "./remove-element";
// import { projectList } from "./index";
import { ProjectItem } from "./project-item";
import { ToDoItem } from "./to-do-item";

let projectList = [];

export let domItems = {
  toDoButton: document.getElementById("to-do-btn"),
  projectButton: document.getElementById("project-btn"),
  toDoDiv: document.getElementById("to-do-list"),
  newToDoDialog: document.getElementById("newToDoDialog"),
  cancelToDoDialog: document.getElementById("cancel-todo"),
  confirmToDoDialog: document.getElementById("confirm-todo"),
  dialogForm: document.getElementById("toDoForm"),
  titleInput: document.getElementById("toDoTitle"),
  descriptionInput: document.getElementById("toDoDescription"),
  dueDateInput: document.getElementById("toDoDate"),
  priorityInput: document.getElementById("toDoPriority"),
  newProjectDialog: document.getElementById("newProjectDialog"),
  cancelProjectDialog: document.getElementById("cancel-project"),
  confirmProjectDialog: document.getElementById("confirm-project"),
  projectTitleInput: document.getElementById("projectTitle"),
  projectTitleCounter: document.getElementById("counter"),
  projectDialogForm: document.getElementById("projectForm"),
  projectDeleteDialog: document.getElementById("deleteProjectCheck"),
  cancelProjectButton: document.getElementById("no-btn")
};

export const renderProjectItems = function (project, id) {
  for (let i = 0; i < project.items.length; i++) {
    let toDoAccordion = document.createElement("details");
    toDoAccordion.classList.add("to-do-item");
    toDoAccordion.classList.add(`priority${project.items[i].priority}`);
    toDoAccordion.dataset.index = i;

    let summary = document.createElement("summary");
    let summaryText = document.createTextNode(`${project.items[i].title}`);
    summary.appendChild(summaryText);

    let description = document.createElement("p");
    let descriptionText = document.createTextNode(
      `${project.items[i].description}`
    );
    description.classList.add("todo-description");
    description.appendChild(descriptionText);

    let due = document.createElement("p");
    let dueText = document.createTextNode(`Due: ${project.items[i].dueDate}`);
    due.classList.add("todo-due");
    due.appendChild(dueText);

    let priority = document.createElement("p");
    let priorityText = document.createTextNode(
      `Priority: ${project.items[i].priority}`
    );
    priority.classList.add("todo-priority");
    priority.appendChild(priorityText);

    const completedCheckBoxLabel = document.createElement("label");
    completedCheckBoxLabel.setAttribute(
      "for",
      `checkbox-${project.items[i].title}`
    );
    const checkBoxLabelText = document.createTextNode("completed:");
    completedCheckBoxLabel.appendChild(checkBoxLabelText);

    const completedCheckBox = document.createElement("input");
    completedCheckBox.setAttribute("type", "checkbox");
    completedCheckBox.setAttribute(
      "name",
      `checkbox-${project.items[i].title}`
    );
    completedCheckBoxLabel.appendChild(completedCheckBox);

    completedCheckBox.addEventListener("change", () => {
      project.items[i].completeStatus = true;
      toDoAccordion.classList.add("completed-todo");
      summary.classList.add("completed-todo-title");

      project.completed.push(project.items[i]);
      project.items.splice([i], 1);
      removeElementsByClass("project-list");
      renderProjectList(projectList);
    });

    const deleteBttn = document.createElement("button");
    const deleteTxt = document.createTextNode("delete");
    deleteBttn.appendChild(deleteTxt);
    deleteBttn.classList.add("delete");
    deleteBttn.addEventListener("click", () => {
      removeToDo(toDoAccordion.dataset.index, project, "incomplete");
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
};

export const renderProjectCompletedItems = function (project, id) {
  for (let i = 0; i < project.completed.length; i++) {
    let toDoAccordion = document.createElement("details");
    toDoAccordion.classList.add("to-do-item");
    toDoAccordion.classList.add(`priority${project.completed[i].priority}`);
    toDoAccordion.dataset.index = i;

    let summary = document.createElement("summary");
    let summaryText = document.createTextNode(`${project.completed[i].title}`);
    summary.appendChild(summaryText);

    let description = document.createElement("p");
    let descriptionText = document.createTextNode(
      `${project.completed[i].description}`
    );
    description.classList.add("todo-description");
    description.appendChild(descriptionText);

    let due = document.createElement("p");
    let dueText = document.createTextNode(
      `Due: ${project.completed[i].dueDate}`
    );
    due.classList.add("todo-due");
    due.appendChild(dueText);

    let priority = document.createElement("p");
    let priorityText = document.createTextNode(
      `Priority: ${project.completed[i].priority}`
    );
    priority.classList.add("todo-priority");
    priority.appendChild(priorityText);

    const completedCheckBoxLabel = document.createElement("label");
    completedCheckBoxLabel.setAttribute(
      "for",
      `checkbox-${project.completed[i].title}`
    );
    const checkBoxLabelText = document.createTextNode("completed:");
    completedCheckBoxLabel.appendChild(checkBoxLabelText);

    const completedCheckBox = document.createElement("input");
    completedCheckBox.setAttribute("type", "checkbox");
    completedCheckBox.setAttribute(
      "name",
      `checkbox-${project.completed[i].title}`
    );
    completedCheckBoxLabel.appendChild(completedCheckBox);
    completedCheckBox.checked = true;
    project.completed[i].completeStatus == true;
    toDoAccordion.classList.add("completed-todo");
    summary.classList.add("completed-todo-title");

    completedCheckBox.addEventListener("change", () => {
      project.completed[i].completeStatus = false;
      toDoAccordion.classList.remove("completed-todo");
      summary.classList.remove("completed-todo-title");

      project.items.push(project.completed[i]);
      project.completed.splice([i], 1);
      removeElementsByClass("project-list");
      renderProjectList(projectList);
    });

    const deleteBttn = document.createElement("button");
    const deleteTxt = document.createTextNode("delete");
    deleteBttn.appendChild(deleteTxt);
    deleteBttn.classList.add("delete");
    deleteBttn.addEventListener("click", () => {
      removeToDo(toDoAccordion.dataset.index, project, "complete");
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
};

export const renderProjectList = function (projectList) {
  //updates "projects" in localStorage to new version of projectList
  //each change to any part of the projectList (i.e new proj, new todo, completing a todo, etc) calls
  //the renderProjectList function to update the DOM, which also ensures localStorage is kept updated
  localStorage.setItem("projects", JSON.stringify(projectList));
  for (let i = 0; i < projectList.length; i++) {
    let projectAccordion = document.createElement("details");
    projectAccordion.classList.add("project-list");
    projectAccordion.setAttribute("id", `project${i}`);
    if (window.matchMedia("(min-width: 450px)").matches) {
      projectAccordion.open = true;
    }

    let summary = document.createElement("summary");
    let summaryText = document.createTextNode(`${projectList[i].name}`);
    summary.appendChild(summaryText);

    projectAccordion.appendChild(summary);

    domItems.toDoDiv.appendChild(projectAccordion);
    renderProjectItems(projectList[i], `project${i}`);
    renderProjectCompletedItems(projectList[i], `project${i}`);

    const addBttn = document.createElement("button");
    const addBttnText = document.createTextNode("+");
    addBttn.appendChild(addBttnText);
    addBttn.classList.add("add-btn");
    addBttn.setAttribute("data-tooltip", "Add new To Do");
    addBttn.setAttribute("data-placement", "right");
    addBttn.addEventListener("click", () => {
      domItems.newToDoDialog.showModal();
      domItems.confirmToDoDialog.addEventListener(
        "click",
        () => {
          if (
            domItems.titleInput.value == "" ||
            domItems.dueDateInput.value == ""
          ) {
            // do nothing
          } else {
            let newToDoItem = new ToDoItem(
              domItems.titleInput.value,
              domItems.descriptionInput.value,
              domItems.dueDateInput.value,
              domItems.priorityInput.value
            );
            projectList[i].items.push(newToDoItem);

            removeElementsByClass("project-list");
            renderProjectList(projectList);

            domItems.newToDoDialog.close();
            domItems.dialogForm.reset();
          }
        },
        { once: true }
      );
    });
    projectAccordion.appendChild(addBttn);
  }
};

function removeToDo(index, project, type) {
  if ( type === "incomplete"){
    project.items.splice(index, 1);
  } else if ( type === "complete") {
    project.completed.splice(index, 1);
  }
  removeElementsByClass("project-list");
  renderProjectList(projectList);
}

domItems.projectButton.addEventListener("click", () => {
  domItems.newProjectDialog.showModal();
});

domItems.confirmProjectDialog.addEventListener("click", () => {
  if (domItems.projectTitleInput.value == "") {
    //do nothing
  } else {
    let newProject = new ProjectItem(domItems.projectTitleInput.value);
    projectList.push(newProject);

    removeElementsByClass("project-list");
    renderProjectList(projectList);

    domItems.newProjectDialog.close();
    domItems.projectDialogForm.reset();
  }
});

// max character counter for project title input
domItems.projectTitleInput.onkeyup = () => {
  domItems.projectTitleCounter.innerText = `${domItems.projectTitleInput.value.length}/50`;
}

domItems.cancelToDoDialog.addEventListener("click", () => {
  domItems.newToDoDialog.close();
  domItems.dialogForm.reset();
});

domItems.cancelProjectDialog.addEventListener("click", () => {
  domItems.newProjectDialog.close();
  domItems.projectDialogForm.reset();
});

domItems.cancelProjectButton.addEventListener("click", () => {
  domItems.projectDeleteDialog.close();
})

window.onload = () => {
  if (localStorage.getItem("projects") === null) {
    //if there's nothing in storage, this sets up a new item and assigns the projectList array
    localStorage.setItem("projects", JSON.stringify(projectList));
  } else {
    //if there's something in storage, this sets the projectList array to the array in storage
    projectList = JSON.parse(localStorage.getItem("projects"));
  }
  renderProjectList(projectList);
};

