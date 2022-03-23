//Module to create the tasks for each project

import {localStorageModule} from "./localStorage.js"
import {projects} from "./createProject.js"
import {stylesModule} from "./createStyles.js"

//create task
const task = (name, status, priority) => {
    return {name, status, priority}
}

const tasks = (() => {
    const newTaskButton = document.querySelector('#newTaskButton');
    const newTaskForm = document.querySelector('#newTaskForm');
    newTaskButton.addEventListener('click', () => {
        stylesModule.visibleDiv(newTaskFOrm);
    })

    const submitTaskButton = document.querySelector('#submitTaskButton');
    submitTaskButton.addEventListener('click', () => {
        const taskName = document.querySelector('#taskName').Value;
        if (taskName == '') {
            taskName = 'Task';
        }
        const priority = document.querySelector('input[type=radio][name=priority]:checked').value;
        projects.projectsList[projects.currentProjectIndex].tasks.push(task(taskName, 'NotDone', priority));
        stylesModule.visibleDiv(newTaskForm);
        tasksDisplay(projets.projectsList[projects.currentProjectIndex].tasks.length - 1);
        localStorageModule.saveToLocal();
    })

    const taskTitleDivDisplay = function() {
        const projectDataName = document.querySelector('#projectDataName');
        const projectDataDate = document.querySelector('#projectDataDate');
        projectDataName.textContent = projects.projectsList[projects.currentProjectIndex].name;
        projectDataDate.textContent = projects.projectsList[projects.currentProjectIndex].dueDate;
    }

    const tasksDisplay = function(a = 0) {
        const tasks = document.querySelector('#tasks');
        let x = projects.projectsList[projects.currentProjectIndex].tasks;
        for (let i = a; i < x.length; i++) {
            const listTask = document.createElement('div');
            listTask.classList.add('listTask');
            const icon0 = document.createElement('i');
            icon0.classList.add('materialIcons');
            icon0.classList.add('taskStatus');
            icon0.classList.add(`taskStatus${x[i].status}`);
            icon0.textContent = 'radio_button_unchecked';
            const p = document.createElement('p');
            p.textContent = x[i].name;
            const taskButtons = document.createElement('div');
            taskButtons.classList.add('taskButtons');
            const priorityButton = document.createElement('button');
            priorityButton.type = 'button';
            priorityButton.classList.add('priorityButtons');
            priorityButton.classList.add(x[i].priority);
            const icon1 = document.createElement('i');
            icon1.classList.add('materialIcons');
            icon1.textContent = 'priorityHigh';
            priorityButton.appendChild(icon1);
            priorityButton.addEventListener('click', () => {
                if (x[i].priority == 'lowPriority') {
                    projects.projectsList[projects.currentProjectIndex].tasks[i].priority = 'mediumPriority';
                    priorityButton.classList.remove('lowPriority');
                    priorityButton.classList.add('mediumPriority');
                } else if (x[i].priority == 'mediumPriority') {
                    projects.projectsList[projects.currentProjectIndex].tasks[i].priority = 'highPriority';
                    priorityButton.classList.remove('mediumPriority');
                    priorityButton.classList.add('highPriority');
                } else if (x[i].priority == 'highPriority') {
                    projects.projectsList[projects.currentProjectIndex].tasks[i].priority = 'lowPriority';
                    priorityButton.classList.remove('highPriority');
                    priorityButton.classList.add('lowPriority');
                }
                localStorageModule.saveToLocal();
            })

            const taskStatusButton = document.createElement('button');
            taskStatusButton.type = 'button';
            taskStatusButton.classList.add('taskStatusButton');
            taskStatusButton.textContent = 'Change Status';
            taskStatusButton.addEventListener('click', () => {
                if(x[i].status == 'notDone') {
                    projects.projectsList[projects.currentProjectIndex].tasks[i].status = 'done';
                } else if (x[i].status == 'done') {
                    projects.projectsList[projects.currentProjectIndex].tasks[i].status = 'failed';
                } else if (x[i].status == 'failed') {
                    projects.projectsList[projects.currentProjectIndex].tasks[i].status = 'notDone';
                } 
                stylesModule.taskStatusDisplay(i);
                localStorageModule.saveToLocal();
            })

            const deleteTaskButton = document.createElement('button');
            deleteTaskButton.type = 'button';
            deleteTaskButton.classList.add('deleteTaskButton');
            const icon2 = document.createElement('i');
            icon2.classList.add('materialIcons');
            icon2.textContent = 'remove';
            deleteTaskButton.appendChild(icon2);
            deleteTaskButton.addEventListener('click', () => {
                removeTask(deleteTaskButton, i);
            })
            taskButtons.appendChild(priorityButton);
            taskButtons.appendChild(taskStatusButton);
            taskButtons.appendChild(deleteTaskButton);
            listTask.appendChild(icon0);
            listTask.appendChild(p);
            listTask.appendChild(taskButtons);
            tasks.appendChild(listTask);
        }
    }

    const clearTaskDisplay = function() {
        const tasks = document.querySelector('#tasks');
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
            localStorageModule.saveToLocal();
        }
    }

    const removeTask = function (target, index) {
        projects.projectsList[projects.currentProjectIndex].tasks.splice(index, 1);
        target.parentElement.parentElement.remove();
    }

    return {taskTitleDivDisplay, tasksDisplay, clearTaskDisplay}
})()

export {tasks}