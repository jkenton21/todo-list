//Module to create styling for the project and task cards

const stylesModule = (() => {
    //Makes div visible if hidden and vice versa
    const visibleDiv = function(div){
        if(div.style.visibility === 'visible'){
            div.style.visibility = 'hidden';
        } else {
            div.style.visibility = 'visible';
        }
    }
    const selectedDiv = function(selector, div){
        if (div.style.color === 'red'){
            blackDivs(selector);
        } else {
            blackDivs(selector);
            div.style.color = 'red';
            div.style.borderColor = 'red';
        }
    }
    const blackDivs = function(selectors){
        for (let i = 0; i < selectors.length; i++){
            selectors[i].style.color = 'black';
            selectors[i].style.borderColor = 'black';
        }
    }
    const taskStatusDisplay = function(x) {
        const statusButton = document.querySelectorAll('.task-status')[x];
        if (statusButton.classList.contains('task-status-not-done')){
            statusButton.classList.remove('task-status-not-done');
            statusButton.classList.add('task-status-done');
        } else if(statusButton.classList.contains('task-status-done')){
            statusButton.classList.remove('task-status-done');
            statusButton.classList.add('task-status-failed');
        } else if (statusButton.classList.contains('task-status-failed')){
            statusButton.classList.remove('task-status-failed');
            statusButton.classList.add('task-status-not-done');
        }
    }
    return {visibleDiv, selectedDiv, taskStatusDisplay}
})()

export {stylesModule}