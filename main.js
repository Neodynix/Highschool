// script.js – Main JavaScript (hamburger menu + close button)

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const hamburgerIcon = hamburger.querySelector('i');

    // Toggle menu and switch between bars and X
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');

        // Switch icon: bars ↔ times (X)
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link (improves UX on mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });
});