document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    // Select all navigation list items that might act as scroll-to links
    const navLinks = document.querySelectorAll('nav li');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent default link behavior if it's a hash link (e.g., #about)
            // You might need to adjust this if your nav items are actual <a> tags
            // For this example, we assume nav li elements will trigger the scroll.
            // If your nav items are <a> tags, target them instead: document.querySelectorAll('nav a[href^="#"]')
            const targetId = event.target.textContent.toLowerCase().replace(/\s/g, '-'); // Simple conversion (e.g., "About Us" -> "about-us")
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                event.preventDefault(); // Stop the browser's default jump
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll effect
                    block: 'start'      // Align the top of the element with the top of the viewport
                });

                // Optional: Close mobile nav if it's open (requires additional HTML/CSS for mobile nav toggle)
                // if (window.innerWidth <= 1024) { /* Assuming 1024px is your breakpoint */
                //     // Code to hide mobile nav
                // }
            }
        });
    });

    // 2. Dynamic Active Navigation State using Intersection Observer
    // Select all sections that correspond to navigation items
    const sections = document.querySelectorAll('main section');
    const headerNav = document.querySelector('header nav ul'); // The navigation list

    // Options for the Intersection Observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -50% 0px', // When 50% of the section is visible
        threshold: 0 // As soon as any part of the element enters/leaves
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const targetId = entry.target.id; // Get the ID of the section (e.g., 'about', 'services')
            const correspondingNavLink = headerNav.querySelector(`li[data-target="${targetId}"]`); // Find the nav link

            if (correspondingNavLink) {
                if (entry.isIntersecting) {
                    // Add 'active' class when the section is in view
                    // First, remove 'active' from all other links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Then, add 'active' to the current one
                    correspondingNavLink.classList.add('active');
                }
                // You might want an 'else' here to remove active when leaving,
                // but the logic of adding it to the new intersecting one handles it.
            }
        });
    }, observerOptions);

    // Start observing each section
    sections.forEach(section => {
        // Ensure your sections have IDs that match your nav link targets
        // e.g., <section id="about"> and <li data-target="about">About</li>
        // If your nav links are based on textContent, you'll need to ensure consistency.
        // For this example, let's assume section IDs match nav text (lowercase, hyphenated).
        // You'll need to add `id="about-us"` to your HTML sections.
        // And `data-target="about-us"` to your nav `<li>` elements.
        sectionObserver.observe(section);
    });

    // Initial check for active state on page load (important for when page loads scrolled)
    // This is a simplified approach; a more robust solution might involve
    // manually triggering the observer callback or checking initial scroll position.
    // For now, the observer will pick it up as soon as it's attached.
});