//Module to create the project

import {localStorageModule} from "./localStorage.js"
import {stylesModule} from "./createStyles.js"
import {taskModule} from "./createTask.js"

//Factory with projects
const Projects = (name, dueDate, tasks) => {
    return {name, dueDate, tasks}
}

const projectsModule = (() => {
    let projectsList = [];
    let currentProjectIndex;
    const newProjectButton = document.querySelector('#new-project-button');
    const newProjectForm = document.querySelector('#new-project-form')
    newProjectButton.addEventListener('click', () => {
        stylesModule.visibleDiv(newProjectForm);
    });
    const submitProjectButton = document.querySelector('#submit-project-button');
    submitProjectButton.addEventListener('click', () => {
        let projectName = document.querySelector('#pname').value;
        if(projectName == ''){
            projectName = 'Project'
        }
        let dueDate = document.querySelector('#duedate').value;
        if (dueDate == ''){
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear();
            let currentMonth = (currentDate.getMonth() + 1).toString();
            while(currentMonth.length < 2){
                currentMonth = '0' + currentMonth;
            }
            let currentDay = (currentDate.getDate()).toString();
            while(currentDay.length < 2){
                currentDay = '0' + currentDay;
            }
            dueDate = `${currentYear}-${currentMonth}-${currentDay}`;
        }
        dueDate = dueDate.split('-').reverse().join('/');
        projectsModule.projectsList.push(Projects(projectName, dueDate, []));
        projectsDisplay(projectsModule.projectsList.length - 1);
        stylesModule.visibleDiv(newProjectForm);
        localStorageModule.saveLocalStorage();
    })
    const projectsDisplay = function(a = 0) {
        const projectsFullDiv = document.querySelector('#projects');
        for (let i = a; i < projectsModule.projectsList.length; i++){
            console.log(projectsModule.projectsList[i])
            const projectDiv = document.createElement('div');
                projectDiv.classList.add('projects-div');
                const projectName = document.createElement('button');
                projectName.type = 'button';
                projectName.classList.add('project-name');
                projectName.textContent = projectsModule.projectsList[i].name;
                    projectName.addEventListener('click', () => {
                        stylesModule.selectedDiv(document.querySelectorAll('.project-name'), projectName)
                        updateCurrentProject(i);
                        const listOfTasks = document.querySelector('#list');
                        if (listOfTasks.style.visibility != 'visible'){
                            listOfTasks.style.visibility = 'visible';
                        }
                        taskModule.taskTitleDivDisplay();
                        taskModule.clearTaskDisplay();
                        taskModule.tasksDisplay();
                    });
                const button = document.createElement('button');
                button.classList.add('delete-button-project');
                button.type = 'button';
                    const icon = document.createElement('i');
                    icon.classList.add('material-icons');
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
    const updateCurrentProject = function(x){
        projectsModule.currentProjectIndex = x;
    }
    const removeProject = function(target, index){
        projectsModule.projectsList.splice(index, 1);
        target.parentElement.remove();
        if (projectsModule.projectsList.length == 0){
            const listOfTasks = document.querySelector('#list');
            listOfTasks.style.visibility = 'hidden';
        }
        localStorageModule.saveLocalStorage();
    }
    return {projectsList, currentProjectIndex, projectsDisplay}
})()    

export {projectsModule}