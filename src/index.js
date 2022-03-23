// JavaScript Index file for Todo List project
// The main purpose of this script is to import modules that will be packaged
// up using webpack to run the html. The html will pull from the packaged
// file "main.js" in the dist/ folder in th project directory.

import {localStorageModule} from "./modules/localStorage"

localStorageModule.loadLocalStorage();