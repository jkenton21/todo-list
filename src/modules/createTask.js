//Module to create the tasks for each project

import {localStorageModule} from "./localStorage.js"
import {projectsModule} from "./createProject.js"
import {stylesModule} from "./createStyles.js"

const Task = (name, status, priority) => {
    return {name, status, priority}
}

const taskModule = (() => {
    const newTaskButton = document.querySelector('#new-task-button');
    const newTaskForm = document.querySelector('#new-task-form');
        newTaskButton.addEventListener('click', () => {
            stylesModule.visibleDiv(newTaskForm);
        })
    const submitTaskButton = document.querySelector('#submit-task-button');
        submitTaskButton.addEventListener('click', () => {
            const tname = document.querySelector('#tname').value;
            if (tname == ''){
                tname = 'Task';
            }
            const priority = document.querySelector('input[type=radio][name=priority]:checked').value;
            projectsModule.projectsList[projectsModule.currentProjectIndex].tasks.push(Task(tname,'not-done', priority));
            stylesModule.visibleDiv(newTaskForm);
            tasksDisplay(projectsModule.projectsList[projectsModule.currentProjectIndex].tasks.length - 1);
            localStorageModule.saveLocalStorage();
        })
    const taskTitleDivDisplay = function(){
        const projectDataName = document.querySelector('#project-data-name');
        const projectDataDate = document.querySelector('#project-data-date');
        projectDataName.textContent = projectsModule.projectsList[projectsModule.currentProjectIndex].name;
        projectDataDate.textContent = projectsModule.projectsList[projectsModule.currentProjectIndex].dueDate;
    }
    const tasksDisplay = function(a = 0){
        const tasks = document.querySelector('#tasks')
        let x = projectsModule.projectsList[projectsModule.currentProjectIndex].tasks;
        for (let i = a; i < x.length; i++){
            const listTask = document.createElement('div');
            listTask.classList.add('list-task');
                const icon0 = document.createElement('i');
                    icon0.classList.add('material-icons');
                    icon0.classList.add('task-status');
                    icon0.classList.add(`task-status-${x[i].status}`);
                    icon0.textContent = 'ral';
                const p = document.createElement('p');
                    p.textContent = x[i].name;
                const taskButtons = document.createElement('div');
                    taskButtons.classList.add('task-buttons');
                    const priorityButton = document.createElement('button')
                        priorityButton.type = 'button';
                        priorityButton.classList.add('priority-buttons')
                        priorityButton.classList.add(x[i].priority);
                            const icon1 = document.createElement('i');
                            icon1.classList.add('material-icons');
                            icon1.textContent = 'High Priority';
                        priorityButton.appendChild(icon1);
                        priorityButton.addEventListener('click', () => {
                            if (x[i].priority == 'low-priority'){
                                projectsModule.projectsList[projectsModule.currentProjectIndex].tasks[i].priority = 'medium-priority';
                                priorityButton.classList.remove('low-priority');
                                priorityButton.classList.add('medium-priority');
                                icon1.textContent = 'Med. Priority'
                            } else if (x[i].priority == 'medium-priority'){
                                projectsModule.projectsList[projectsModule.currentProjectIndex].tasks[i].priority = 'high-priority';
                                priorityButton.classList.remove('medium-priority');
                                priorityButton.classList.add('high-priority');
                                icon1.textContent = 'High Priority'
                            } else if (x[i].priority == 'high-priority'){
                                projectsModule.projectsList[projectsModule.currentProjectIndex].tasks[i].priority = 'low-priority';
                                priorityButton.classList.remove('high-priority');
                                priorityButton.classList.add('low-priority');
                                icon1.textContent = 'Low Priority'
                            }
                            localStorageModule.saveLocalStorage();
                        })
                    const taskStatusButton = document.createElement('button');
                        taskStatusButton.type = 'button';
                        taskStatusButton.classList.add('task-status-button');
                        taskStatusButton.textContent = 'Change Status';
                        taskStatusButton.addEventListener('click', () => {
                            if(x[i].status == 'not-done'){
                                projectsModule.projectsList[projectsModule.currentProjectIndex].tasks[i].status = 'done';
                            } else if (x[i].status == 'done'){
                                projectsModule.projectsList[projectsModule.currentProjectIndex].tasks[i].status = 'failed';
                            } else if (x[i].status == 'failed'){
                                projectsModule.projectsList[projectsModule.currentProjectIndex].tasks[i].status = 'not-done';
                            }
                            stylesModule.taskStatusDisplay(i);
                            localStorageModule.saveLocalStorage();
                        })
                    const deleteTaskButton = document.createElement('button');
                        deleteTaskButton.type = 'button';
                        deleteTaskButton.classList.add('delete-button-task');
                            const icon2 = document.createElement('i');
                            icon2.classList.add('material-icons');
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

    const clearTaskDisplay = function(){
        const tasks = document.querySelector('#tasks');
        while (tasks.firstChild) {
            tasks.removeChild(tasks.firstChild);
            localStorageModule.saveLocalStorage();
        }
    }
    const removeTask = function(target, index){
        projectsModule.projectsList[projectsModule.currentProjectIndex].tasks.splice(index, 1);
        target.parentElement.parentElement.remove();
    }

    return {taskTitleDivDisplay, tasksDisplay, clearTaskDisplay}
})()

export {taskModule}