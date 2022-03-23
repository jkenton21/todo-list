//Module to create the project

import {localStorageModule} from "./localStorage"
import {stylesModule} from "./createStyles.js"
import {tasks} from "./createTask.js"

//Projects
const project = (name, dueDate, tasks) => {
    return {name, dueDate, tasks}
}

//create projects
const projects = (() => {
    let projectsList = [];
    let currentProjectIndex;
    const newProjectButton = document.querySelector('#newProjectButton');
    const newProjectForm = document.querySelector('#newProjectForm');
    newProjectButton.addEventListener('click', () => {
        stylesModule.visibleDiv(newProjectForm);
    });
    const submitProjectButton = document.querySelector('#submitProjectButton');
    submitProjectButton.addEventListener('click', ()=> {
        let projectName = document.querySelector("#projectName").value;
        if (projectName == '') {
            projectName = 'Project';
        }
        let dueDate = document.querySelector('#dueDate').value;
        if (dueDate == ''){
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear();
            let currentMonth = (currentDate.getMonth() + 1).toString();
            while(currentMonth.length <2){
                currentMonth = '0' + currentMonth;
            }
            let currentDay = (currentDate.getDate()).toString();
            while(currentDay.length < 2){
                currentDat = '0' + currentDay;
            }
            dueDate = `${currentYear}-${currentMonth}-${currentDay}`;
        }
        dueDate = dueDate.split('-').reverse().join('/');
        projects.projectsList.push(project(projectName, dueDate, []));
        displayProjects(projects.projectsList.length - 1);
        stylesModule.visibleDiv(newProjectForm);
        localStorageModule.saveToLocal();
    })

    //Display projects
    const displayProjects = function(a = 0) {
        const projectsFullDiv = document.querySelector('#projects');
        for (let i = a; i < projects.projectsList.length; i++) {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('projectsDiv');
            const projectName = document.createElement('button');
            projectName.type = 'button';
            projectName.classList.add('projectName');
            projectName.textContent = projects.projectsList[i].name;
            projectName.addEventListener('click', ()=> {
                stylesModule.selectedDiv(document.querySelectorAll('.projectName'), projectName)
                updateCurrentProject(i);
                const listOfTasks = document.querySelector('#taskList');
                if (listOfTasts.style.visibility != 'visible') {
                    listOfTasks.style.visibility = 'visible';
                }
                tasks.taskTitleDivDisplay();
                tasks.clearTaskDisplay();
                tasks.tasksDisplay();
            });
            const button = document.createElement('button');
            button.classList.add('deleteProjectButton');
            button.type = 'button';
            const icon = document.createElement('i');
            icon.classList.add('materialIcons');
            icon.textContent = 'remove';
            button.appendChild(icon);
            button.addEventListener('click', () => {
                removeProject(button, i);
            })
            projectDiv.appendChild(projectName);
            projectDiv.appendChild(button);
            projectsFullDiv.appendChild(projectDiv);
        }
    }
    
    //edit project
    const updateCurrentProject = function(x) {
        projects.currentProjectIndex = x;
    }

    //deletes project
    const removeProject = function(target, index){
        projects.projectsList.splice(index, 1);
        target.parentElement.remove();
        if (projects.projectsList.length == 0) {
            const listOfTasks = document.querySelector('#taskList');
            listOfTasks.style.visibility = 'hidden';
        }
        localStorageModule.saveToLocal();
    }
    return {projectsList, currentProjectIndex, displayProjects}
})()

export {projects}