/*jshint esversion: 6 */

///// RESPONSIVE NAVIGATION BAR BEHAVIOR /////

// Select the hamburger menu icon
const hamburgerMenu = document.querySelector("#hamburger_icon");
// Select the navigation menu container
const navMenuContainer = document.querySelector("#nav_menu_container");

// Listen for click events on the hamburger icon
hamburgerMenu.addEventListener("click", () => {
  // Toggle the "active" class of the hamburger icon
  hamburgerMenu.classList.toggle("active");
  // Toggle the "active" class of the navigation menu container
  navMenuContainer.classList.toggle("active");
});

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

////////// PARALLAX EFFECT BEHAVIOR \\\\\\\\\\

// Function to calculate the offset top of an element
function offsetTop(element, acc = 0) {
  if (!element.offsetParent) {
    return offsetTop(element.offsetParent, acc + element.offsetTop);
  }
  return acc + element.offsetTop;
}

// Class for creating the parallax effect
class Parallax {
  constructor(element) {
    this.element = element;
    this.ratio = parseFloat(element.dataset.parallax); // Get the parallax ratio from the dataset
    this.onScroll = this.onScroll.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2; // Calculate the initial position of the element
    const observer = new IntersectionObserver(this.onIntersection); // Create an IntersectionObserver
    observer.observe(element); // Observe the element
    this.onScroll(); // Call onScroll initially to set the initial state
  }

  // Intersection observer callback function
  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        document.addEventListener("scroll", this.onScroll); // Add scroll event listener when element is intersecting
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2; // Update the element's position
      } else {
        document.removeEventListener("scroll", this.onScroll); // Remove scroll event listener when element is not intersecting
      }
    }
  }

  // Function to handle scroll events and apply parallax effect
  onScroll() {
    window.requestAnimationFrame(() => {
      const screenY = window.scrollY + window.innerHeight / 2;
      const diffY = this.elementY - screenY;
      this.element.style.setProperty("transform", `translateY(${diffY * -1 * this.ratio}px)`); // Apply transform based on scroll position
    });
  }

  // Static method to bind parallax effect to elements
  static bind() {
    return Array.from(document.querySelectorAll("[data-parallax]")).map((element) => {
      return new Parallax(element);
    });
  }
}

// Bind the parallax effect to elements with data-parallax attribute
Parallax.bind();
