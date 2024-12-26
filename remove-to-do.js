import { removeElementsByClass } from "./src/remove-element";
import { renderProjectList } from "./src";

export function removeToDo(index, project, type, list) {
    if ( type === "incomplete"){
      project.items.splice(index, 1);
    } else if ( type === "complete") {
      project.completed.splice(index, 1);
    }
    removeElementsByClass("project-list");
    renderProjectList(list);
  }