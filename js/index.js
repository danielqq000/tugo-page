/* index.js
 * Made by Daniel Huang
 * Last update: 8/4/24
 */

document.addEventListener("DOMContentLoaded", function () {
	let slideIndex = 0;
	const slides = document.querySelectorAll(".carousel-item");

	// Function to show slides
	function showSlides() {
		// Hide all slides
		slides.forEach((slide) => slide.classList.remove("active"));
		// Show the current slide
		slides[slideIndex].classList.add("active");
		// Move to the next slide
		slideIndex++;
		// If we've reached the end, start from the beginning
		if (slideIndex >= slides.length) {
			slideIndex = 0;
		}
	}

	// Function to start the carousel rotation
	function startCarousel() {
		showSlides();
		setInterval(showSlides, 2000);
	}

	// Start the carousel rotation initially
	startCarousel();
});

document.addEventListener('DOMContentLoaded', (event) => {
	const menuItems = document.querySelectorAll('.menu-item');

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = 1;
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, { threshold: 0.1 });

	menuItems.forEach(item => {
		item.style.opacity = 0;
		item.style.transform = 'translateY(20px)';
		item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
		observer.observe(item);
	});
});

