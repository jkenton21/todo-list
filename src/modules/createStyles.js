//Module to create styling for the project and task cards

const stylesModule = (() => {

    //function to display hidden project/task forms
    const visibleDiv = function(div) {
        if(div.style.visibility === 'visible'){
            div.style.visibility = 'hidden';
        } else {
            div.style.visibility = 'visible';
        }
    }

    const selectedDiv = function(selector, div) {
        if (div.style.color === 'red') {
            blackDivs(selector);
        } else {
            blackDivs(selector);
            div.style.color = 'red';
            div.style.borderColor = 'red';
        }
    }

    const blackDivs = function(selectors) {
        for (let i = 0; i < selectors.length; i++) {
            selectors[i].style.color = 'black';
            selectors[i].style.borderColor = 'black';
        }
    }

    const taskStatusDisplay = function(x) {
        const statusButton = document.querySelectorAll('.taskStatus')[x];
        if (statusButton.classList.contains('taskStatusNotDone')){
            statusButton.classList.remove('taskStatusNotDone');
            statusButton.classList.add('taskStatusDone');
        } else if (statusButton.classList.contains('taskStatusDone')) {
            statusButton.classList.remove('tastStatusDone');
            statusButton.classList.add('taskStatusFailed');
        } else if (statusButton.classList.contains('taskStatusFailed')) {
            statusButton.classList.remove('tastStatusFailed');
            statusButton.classList.add('tastStatusNotDone');
        }
    }

    return {visibleDiv, selectedDiv, tastStatusDisplay}
})()

export {stylesModule}