/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("sidenav-container").style.width = "150px";
  document.getElementById("main").style.marginLeft = "150px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("sidenav-container").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}