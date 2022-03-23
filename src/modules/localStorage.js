//Handles the local storage on the machine for the projects and tasks

import {projects} from "./createProject.js"

const localStorageModule = (() => {
    function saveToLocal() {
        localStorage.setItem("projects.projectsList", JSON.stringify(projects.projectsList));
    }

    function loadFromStorage() {
        projects.projectsList = JSON.parse(localStorage.getItem("projects.projectsList"));
        if (projects.projectsList === null){
            projects.projectsList = [];
        }
        projects.projectsDisplay(0);
    }
    return {saveToLocal, loadFromLocal}
})()

export {localStorageModule}