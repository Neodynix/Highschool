document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const counters = document.querySelectorAll('.stat-box h3');
    let hasAnimated = false;

    // Easing function: easeOutQuart (feels premium)
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const startCounter = (counter) => {
        // --- FIX: Read the final target from the data attribute ---
        const targetText = counter.getAttribute('data-target').trim();
        // --------------------------------------------------------
        
        const isPercent = targetText.includes('%');
        const isPlus = targetText.includes('+');
        // Now, finalValue correctly parses the number from the data-target attribute
        const finalValue = parseInt(targetText.replace(/[%+,]/g, ''), 10);

        if (isNaN(finalValue)) return;

        let startValue = 0;
        const duration = window.innerWidth < 768 ? 1800 : 2400; // Faster on mobile
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * finalValue);

            if (isPercent) {
                counter.textContent = formatNumber(current) + '%';
            } else if (isPlus) {
                counter.textContent = formatNumber(current) + '+';
            } else {
                counter.textContent = formatNumber(current);
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Final exact value is now the stored targetText from the data attribute
                counter.textContent = targetText; 
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const runAnimation = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        counters.forEach(startCounter);

        // Add a nice fade-in-up to the whole section
        statsSection.style.opacity = '0';
        statsSection.style.transform = 'translateY(30px)';
        statsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            statsSection.style.opacity = '1';
            statsSection.style.transform = 'translateY(0)';
        }, 100);
    };

    // Intersection Observer – trigger when 60% visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runAnimation();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.6 }
    );

    observer.observe(statsSection);

    // Optional: Allow re-trigger on resize (rarely needed but nice)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (!hasAnimated && statsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
                runAnimation();
            }
        }, 200);
    });
});
