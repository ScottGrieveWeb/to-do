export const newToDo = function() {

    let title = prompt('Title of new To Do item:');
    let description = prompt(`Details of ${title}:`);
    let dueDate = prompt(`When is ${title} due?`);
    let priority = prompt('What is the priority? 1, 2, or 3');
    // let project = prompt('What project is this for?');

    return {
        title,
        description,
        dueDate,
        priority
    }
}