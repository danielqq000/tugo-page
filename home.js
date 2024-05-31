document.addEventListener("DOMContentLoaded", function () {
	let slideIndex = 1;
	const slides = document.querySelectorAll(".carousel-item");
	let timer;

	// Hide all slides but the first one
	slides.forEach((slide) => (slide.style.display = "none"));
	slides[0].style.display = "block";

	// Function to show slides
	function showSlides() {
		// Hide all slides
		slides.forEach((slide) => (slide.style.display = "none"));
		// Show the current slide
		slides[slideIndex].style.display = "block";
		// Move to the next slide
		slideIndex++;
		// If we've reached the end, start from the beginning
		if (slideIndex >= slides.length) {
			slideIndex = 0;
		}
	}

	// Function to start the carousel rotation
	function startCarousel() {
		timer = setInterval(showSlides, 2000);
	}

	// Start the carousel rotation initially
	startCarousel();
});

