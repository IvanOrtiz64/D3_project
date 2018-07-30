/**
 * Purpose: Script to handle functionality for the "About" button in the main page
 *
 */


// Get elements
var modal = document.getElementById('modal1');
var aboutBtn = document.getElementById("aboutBtn");
var span = document.getElementsByClassName("close")[0];
var viz = document.getElementById("vis-container");


// When the user clicks on the button, open the modal
aboutBtn.onclick = function() {
    modal.style.display = "block";
    viz.style.display   = "none";
}


// close the modal when clicked on x
span.onclick = function() {
    modal.style.display = "none";
    viz.style.display   = "block";
}


// Close when user clicks outside of Modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        viz.style.display   = "block";
    }
}