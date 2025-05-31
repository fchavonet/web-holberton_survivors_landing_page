/*********
* LOADER *
*********/

window.addEventListener("load", function () {
	const pageLoader = document.getElementById("page-loader");
	const progressBar = document.getElementById("progress-bar");

	let progress = 0;

	const interval = setInterval(function () {
		progress += 2;
		progressBar.style.width = progress + "%";

		if (progress >= 100) {
			clearInterval(interval);
			pageLoader.style.opacity = "0";
			
			setTimeout(function () {
				pageLoader.style.display = "none";
			}, 300);
		}
	}, 50);
});


/*********************************
* RESPONSIVE NAVIGATION BEHAVIOR *
*********************************/

// Get DOM elements for navigation and UI components.
const holbertonSurvivorsBrand = document.getElementById("holberton-survivors-brand");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const downloadNavButton = document.getElementById("download-nav-button");
const hamburgerIcon = document.getElementById("hamburger-icon");
const responsiveMenuBackground = document.getElementById("responsive-menu-background");

// Get all section elements and the "move to top" button.
const sections = document.querySelectorAll("section");
const moveToTopButton = document.getElementById("move-to-top-button");

// Smoothly scrolls to the specified section.
function scrollToSection(sectionId) {
	const section = document.getElementById(sectionId);
	section.scrollIntoView({ behavior: "smooth" });
}

// Updates the active navigation link based on the scroll position.
function updateActiveLink() {
	let currentSection = "";

	// Determine which section is currently in view.
	sections.forEach(function (section) {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;

		if (window.scrollY >= sectionTop - sectionHeight / 3) {
			currentSection = section.getAttribute("id");
		}
	});

	// Toggle active class for the download navigation button.
	if (currentSection === "download-section") {
		downloadNavButton.classList.add("download-nav-button-active");
	} else {
		downloadNavButton.classList.remove("download-nav-button-active");
	}

	// Update active class for navigation links, except for the download link.
	navLinks.forEach(function (link) {
		// Ignore the download section link.
		if (link.getAttribute("data-section-id") === "download-section") {
			link.classList.remove("active");
		} else {
			link.classList.toggle("active", link.getAttribute("data-section-id") === currentSection);
		}
	});
}

// Adjusts the visibility of the brand and move to top& button based on scroll position.
function handleScrollBehavior() {
	const scrollPosition = window.scrollY || document.documentElement.scrollTop;

	if (scrollPosition > 400) {
		holbertonSurvivorsBrand.style.opacity = "1";
		moveToTopButton.style.bottom = "3rem";
	}
	else {
		holbertonSurvivorsBrand.style.opacity = "0";
		moveToTopButton.style.bottom = "-3rem";
	}
}

// Add click event listener to each navigation link for smooth scrolling and mobile menu toggling.
navLinks.forEach(function (link) {
	link.addEventListener("click", function (event) {
		event.preventDefault();

		navMenu.classList.remove("show");
		responsiveMenuBackground.classList.remove("show");
		hamburgerIcon.classList.remove("active")

		const sectionId = link.getAttribute("data-section-id");

		scrollToSection(sectionId);
	});
});

// Toggle responsive menu visibility when the hamburger icon is clicked.
hamburgerIcon.addEventListener("click", function (event) {
	event.preventDefault();

	navMenu.classList.toggle("show");
	hamburgerIcon.classList.toggle("active")
	responsiveMenuBackground.classList.toggle("show");
});

// Enable smooth scroll to top when the move to top button is clicked.
moveToTopButton.addEventListener("click", function (onclick) {
	onclick.preventDefault();
	window.scrollTo({ top: 0, behavior: "smooth" });
});

// Make the scrollToSection function accessible via the window object.
window.scrollToSection = scrollToSection;

// Initialize active link highlighting and scroll behavior on page load.
updateActiveLink();
handleScrollBehavior()

// Update the active link and scroll behavior when the page is scrolled.
window.addEventListener("scroll", function () {
	updateActiveLink();
	handleScrollBehavior();
});


/***********************************************
* CALCULATE HEADER HEIGHT FOR SECTIONS PADDING *
***********************************************/

const header = document.querySelector("header");

function updateDownloadSectionPadding() {
	// Get the header's current height.
	const headerHeight = header.offsetHeight;
	// Set all the section's top padding equal to the header height.
	sections.forEach(function (section) {
		section.style.paddingTop = headerHeight + "px";
	});
}

// Update padding on load and when the window is resized.
updateDownloadSectionPadding();
window.addEventListener("resize", updateDownloadSectionPadding);


/************************
* VIDEO PLAYER BEHAVIOR *
************************/

// Get DOM elements for video, overlay, and play button.
const videoPlayer = document.getElementById("video-player");
const videoOverlay = document.getElementById("video-overlay");
const playButton = document.getElementById("play-video-button");
let isVideoPlaying = false;

// On play button click: hide overlay, start video, and mark as playing.
playButton.addEventListener("click", function () {
	videoOverlay.style.display = "none";
	videoPlayer.play();
	isVideoPlaying = true;
});

// When video ends: show overlay, reset time, pause video, and update state.
videoPlayer.addEventListener("ended", function () {
	videoOverlay.style.display = "flex";
	videoPlayer.currentTime = 0;
	videoPlayer.pause();
	isVideoPlaying = false;
});

// On window scroll: if the video is playing but not fully in view, pause it and show overlay.
window.addEventListener("scroll", function () {
	if (isVideoPlaying) {
		const videoRect = videoPlayer.getBoundingClientRect();
		const isInView = (videoRect.top >= 0 && videoRect.bottom <= (window.innerHeight || document.documentElement.clientHeight));

		if (!isInView) {
			videoOverlay.style.display = "flex";
			videoPlayer.pause();
			isVideoPlaying = false;
		}
	}
});


/*******************************
* SCREENSHOTS GALLERY BEHAVIOR *
*******************************/

// Retrieve all screenshot images from the container.
const screenshots = Array.from(document.querySelectorAll("#screenshots-container img"));

// Retrieve the overlay elements.
const overlay = document.getElementById("screenshot-overlay");
const overlayImage = document.getElementById("overlay-image");
const closeOverlay = document.getElementById("close-overlay");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

let currentIndex = 0;

// Function to display the overlay with the clicked image.
const openOverlay = function (index) {
	currentIndex = index;
	overlayImage.src = screenshots[currentIndex].src;
	overlay.classList.remove("hidden-overlay");
};

// Add an event listener to each image.
screenshots.forEach(function (img, index) {
	img.addEventListener("click", () => openOverlay(index));
});

// Close the overlay when clicking the close button.
closeOverlay.addEventListener("click", function () {
	overlay.classList.add("hidden-overlay");
});

// Next button: switch to the next image.
nextButton.addEventListener("click", function () {
	currentIndex = (currentIndex + 1) % screenshots.length;
	overlayImage.src = screenshots[currentIndex].src;
});

// Previous button: go back to the previous image.
prevButton.addEventListener("click", function () {
	currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
	overlayImage.src = screenshots[currentIndex].src;
});

// Optional: close the overlay when clicking outside the image.
overlay.addEventListener("click", function (event) {
	if (event.target === overlay) {
		overlay.classList.add("hidden-overlay");
	}
});


/***********************
* LEADERBOARD BEHAVIOR *
***********************/

// Select all table cells with the class ".dreamloLBTable".
const scoreCells = document.querySelectorAll(".dreamloLBTable td:nth-child(2)");

// Iterate over each selected cell.
scoreCells.forEach(function (cell) {
	// Parse the content of the cell assuming it's in seconds and converts it into an integer.
	const score = parseInt(cell.textContent);

	// Calculate the number of minutes and seconds from the total score.
	const minutes = Math.floor(score / 60);
	const seconds = score % 60;

	// Format the time into a string as minutes:seconds.
	const formattedTime = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

	// Update the content of the cell with the formatted time.
	cell.textContent = formattedTime;
});

// Modify the text "Name" to "NICKNAME" and "Score" to "TIMER".
const tableHeaders = document.querySelectorAll(".dreamloLBTable th");
tableHeaders.forEach(function (header) {
	if (header.textContent === "Name") {
		header.textContent = "NICKNAME";
	} else if (header.textContent === "Score") {
		header.textContent = "TIMER";
	}
});

// Select all table cells with the class ".dreamloLBTable".
const tableCells = document.querySelectorAll(".dreamloLBTable td, .dreamloLBTable th");

// Iterate over each selected cell.
tableCells.forEach(function (cell) {
	// Convert the content of each cell to uppercase.
	cell.textContent = cell.textContent.toUpperCase();
});


/*************************
* GLOBAL PAGE ANIMATIONS *
*************************/

// Create an IntersectionObserver to handle animations based on element visibility.
const observer = new IntersectionObserver(function (entries) {
	entries.forEach(function (entry) {
		// Check if the observed element is intersecting with the viewport.
		if (entry.isIntersecting) {
			// Add animation classes based on the type of hidden class.
			if (entry.target.classList.contains("hidden")) {
				entry.target.classList.add("show");
			} else if (entry.target.classList.contains("hidden-top")) {
				entry.target.classList.add("show-top");
			} else if (entry.target.classList.contains("hidden-right")) {
				entry.target.classList.add("show-right");
			} else if (entry.target.classList.contains("hidden-bottom")) {
				entry.target.classList.add("show-bottom");
			} else if (entry.target.classList.contains("hidden-left")) {
				entry.target.classList.add("show-left");
			}
		} else {
			// Remove animation classes if element is not intersecting.
			entry.target.classList.remove("show", "show-top", "show-right", "show-bottom", "show-left");
		}
	});
});

// Select all elements with hidden animation classes and observe them.
const hiddenElements = document.querySelectorAll(".hidden, .hidden-top, .hidden-right, .hidden-bottom, .hidden-left");
hiddenElements.forEach((el) => observer.observe(el));


/*************************************************
* UPDATING PAGE ANIMATIONS FOR RESPONSIVE DESIGN *
*************************************************/

function updateElementAnimation() {
	// Update for left elements
	const leftElements = document.getElementsByClassName("left-element");
	if (leftElements && leftElements.length > 0) {
		for (let i = 0; i < leftElements.length; i++) {
			const element = leftElements[i];

			if (window.innerWidth < 1200) {
				// On mobile screens, replace "hidden" with "hidden-left" for left elements.
				if (element.classList.contains("hidden")) {
					element.classList.replace("hidden", "hidden-left");
				} else if (!element.classList.contains("hidden-left")) {
					element.classList.add("hidden-left");
				}
			} else {
				// On larger screens, revert left elements back to "hidden"
				if (element.classList.contains("hidden-left")) {
					element.classList.replace("hidden-left", "hidden");
				} else if (!element.classList.contains("hidden")) {
					element.classList.add("hidden");
				}
			}
		}
	}

	// Update for right elements
	const rightElements = document.getElementsByClassName("right-element");
	if (rightElements && rightElements.length > 0) {
		for (let i = 0; i < rightElements.length; i++) {
			const element = rightElements[i];

			if (window.innerWidth < 1200) {
				// On mobile screens, replace "hidden" with "hidden-right" for right elements.
				if (element.classList.contains("hidden")) {
					element.classList.replace("hidden", "hidden-right");
				} else if (!element.classList.contains("hidden-right")) {
					element.classList.add("hidden-right");
				}
			} else {
				// On larger screens, revert right elements back to "hidden"
				if (element.classList.contains("hidden-right")) {
					element.classList.replace("hidden-right", "hidden");
				} else if (!element.classList.contains("hidden")) {
					element.classList.add("hidden");
				}
			}
		}
	}
}

// Execute the function when the page loads.
updateElementAnimation();

// Update on window resize.
window.addEventListener("resize", updateElementAnimation);


/***************
* PARTICLES.JS *
****************/

particlesJS.load("particles-js", "assets/particles.json", function () {
	console.log("Particles.js configuration loaded.");
});