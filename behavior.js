/*jshint esversion: 6 */

////////// SCROLLING ELEMENTS BEHAVIOR \\\\\\\\\\

// Select the move-to-top button
const moveToTopButton = document.querySelector("#move_to_top_button");

// Listen for scroll events
window.addEventListener("scroll", () => {
  // Get the current scroll position
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;

  // Show or hide the button based on scroll position
  if (scrollPosition > 400) {
    moveToTopButton.style.bottom = "25px";
  } else {
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
