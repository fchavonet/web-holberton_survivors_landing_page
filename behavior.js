/*jshint esversion: 6 */

////////// SCROLLING ELEMENTS BEHAVIOR \\\\\\\\\\

// Select the Holberton Survivors top logo
const holbertonSurvivorsTopLogo = document.querySelector("#holberton_survivors_top_logo");
// Select the move-to-top button
const moveToTopButton = document.querySelector("#move_to_top_button");

// Listen for scroll events
window.addEventListener("scroll", () => {
  // Get the current scroll position
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Show or hide the button and logo based on scroll position
  if (scrollPosition > 400) {
    // Make the Holberton Survivors top logo visible
    holbertonSurvivorsTopLogo.style.opacity = "1";
    // Show the move-to-top button
    moveToTopButton.style.bottom = "25px";
  } else {
    // Hide the Holberton Survivors top logo
    holbertonSurvivorsTopLogo.style.opacity = "0";
    // Hide the move-to-top button
    moveToTopButton.style.bottom = "-50px";
  }
});

// Listen for click events on the move-to-top button
moveToTopButton.addEventListener("click", (onclick) => {
  // Prevent default click behavior
  onclick.preventDefault();

  // Scroll to the top of the page smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
