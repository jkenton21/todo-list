//Handles the local storage on the machine for the projects and tasks

import {projectsModule} from "./createProject.js"

const localStorageModule = (() => {
    function saveLocalStorage() {
        localStorage.setItem("projectsModule.projectsList", JSON.stringify(projectsModule.projectsList));
    }   //JSON.stringify -> local storage only supports strings
    
    function loadLocalStorage() {
        projectsModule.projectsList = JSON.parse(localStorage.getItem("projectsModule.projectsList"));
        if (projectsModule.projectsList === null){
            projectsModule.projectsList = [];
        }
        projectsModule.projectsDisplay(0);
    }
    return {saveLocalStorage, loadLocalStorage}
})()

export {localStorageModule}