/*jshint esversion: 6 */


////////// RESPONSIVE NAVIGATION BAR BEHAVIOR \\\\\\\\\\

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


////////// GLOBAL PAGE ANIMATION \\\\\\\\\\

// Create an IntersectionObserver to handle animations based on element visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the observed element is intersecting with the viewport
    if (entry.isIntersecting) {
      // Add animation classes based on the type of hidden class
      if (entry.target.classList.contains("hidden")) {
        entry.target.classList.add("show");
      } else if (entry.target.classList.contains("hidden_top")) {
        entry.target.classList.add("show_top");
      } else if (entry.target.classList.contains("hidden_right")) {
        entry.target.classList.add("show_right");
      } else if (entry.target.classList.contains("hidden_bottom")) {
        entry.target.classList.add("show_bottom");
      } else if (entry.target.classList.contains("hidden_left")) {
        entry.target.classList.add("show_left");
      }
    } else {
      // Remove animation classes if element is not intersecting
      entry.target.classList.remove("show", "show_top", "show_right", "show_bottom", "show_left");
    }
  });
});

// Select all elements with hidden animation classes and observe them
const hiddenElements = document.querySelectorAll(".hidden, .hidden_top, .hidden_right, .hidden_bottom, .hidden_left");
hiddenElements.forEach((el) => observer.observe(el));


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


////////// VIDEO PLAYER BEHAVIOR \\\\\\\\\\

document.addEventListener('DOMContentLoaded', function () {
  var playButton = document.getElementById('play_video_button');
  var videoOverlay = document.getElementById('video_overlay');
  var videoPlayer = document.getElementById('video_player');
  var isVideoPlaying = false;

  playButton.addEventListener('click', function () {
    videoOverlay.style.display = 'none';
    videoPlayer.play();
    isVideoPlaying = true;
  });

  videoPlayer.addEventListener('ended', function () {
    videoOverlay.style.display = 'flex';
    videoPlayer.currentTime = 0;
    videoPlayer.pause();
    isVideoPlaying = false;
  });

  window.addEventListener('scroll', function () {
    if (isVideoPlaying) {
      var videoRect = videoPlayer.getBoundingClientRect();
      var isInView = (
        videoRect.top >= 0 &&
        videoRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
      if (!isInView) {
        videoOverlay.style.display = 'flex';
        videoPlayer.pause();
        isVideoPlaying = false;
      }
    }
  });
});


////////// SCREENSHOTS GALLERY BEHAVIOR \\\\\\\\\\

window.onload = () => {
  // Select all the screenshot images within the screenshots container
  const screenshots = document.querySelectorAll("#screenshots_container img");

  // Loop through each screenshot image
  for (let screenshot of screenshots) {
    // Create a function to handle click events
    const handleClick = (screenshot) => {
      return () => {
        // Toggle the "screenshot_overlay" class of the screenshot
        screenshot.classList.toggle("screenshot_overlay");
      };
    };

    // Add event listener for click event
    screenshot.addEventListener("click", handleClick(screenshot));
  }
};


////////// LEADERBOARD BEHAVIOR \\\\\\\\\\

document.addEventListener("DOMContentLoaded", function () {
  // Select all table cells with the class '.dreamloLBTable'
  var scoreCells = document.querySelectorAll('.dreamloLBTable td:nth-child(2)');

  // Iterate over each selected cell
  scoreCells.forEach(function (cell) {
    // Parse the content of the cell assuming it's in seconds and converts it into an integer
    var score = parseInt(cell.textContent);

    // Calculate the number of minutes and seconds from the total score
    var minutes = Math.floor(score / 60);
    var seconds = score % 60;

    // Format the time into a string as minutes:seconds
    var formattedTime = minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

    // Update the content of the cell with the formatted time
    cell.textContent = formattedTime;
  });

  // Modify the text "Name" to "NICKNAME" and "Score" to "TIMER"
  var tableHeaders = document.querySelectorAll(".dreamloLBTable th");
  tableHeaders.forEach(function (header) {
    if (header.textContent === "Name") {
      header.textContent = "NICKNAME";
    } else if (header.textContent === "Score") {
      header.textContent = "TIMER";
    }
  });

  // Select all table cells with the class '.dreamloLBTable'
  var tableCells = document.querySelectorAll('.dreamloLBTable td, .dreamloLBTable th');

  // Iterate over each selected cell
  tableCells.forEach(function (cell) {
    // Convert the content of each cell to uppercase
    cell.textContent = cell.textContent.toUpperCase();
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
