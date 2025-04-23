function convertTemperature() {
    const input = parseFloat(document.getElementById('tempInput').value);
    const from = document.getElementById('tempFrom').value;
    const to = document.getElementById('tempTo').value;
    let celsius;
    
    if (from === 'C') celsius = input;
    else if (from === 'F') celsius = (input - 32) * 5/9;
    else if (from === 'R') celsius = input * 5/4;
    
    let result;
    if (to === 'C') result = celsius;
    else if (to === 'F') result = celsius * 9/5 + 32;
    else if (to === 'R') result = celsius * 4/5;
    
    const resultElement = document.getElementById('tempResult');
    resultElement.innerText = result.toFixed(2);
    resultElement.classList.add('result-animation');
    setTimeout(() => resultElement.classList.remove('result-animation'), 500);
}

function convertLength() {
    const input = parseFloat(document.getElementById('lengthInput').value);
    const from = document.getElementById('lengthFrom').value;
    const to = document.getElementById('lengthTo').value;
    let meters;

    if (from === 'km') meters = input * 1000;
    else if (from === 'm') meters = input;
    else if (from === 'cm') meters = input / 100;
    else if (from === 'mm') meters = input / 1000;
    else if (from === 'mile') meters = input * 1609.34;

    let result;
    if (to === 'km') result = meters / 1000;
    else if (to === 'm') result = meters;
    else if (to === 'cm') result = meters * 100;
    else if (to === 'mm') result = meters * 1000;
    else if (to === 'mile') result = meters / 1609.34;

    const resultElement = document.getElementById('lengthResult');
    resultElement.innerText = result.toFixed(2);
    resultElement.classList.add('result-animation');
    setTimeout(() => resultElement.classList.remove('result-animation'), 500);
}

function convertWeight() {
    const input = parseFloat(document.getElementById('weightInput').value);
    const from = document.getElementById('weightFrom').value;
    const to = document.getElementById('weightTo').value;
    let grams;

    if (from === 'kg') grams = input * 1000;
    else if (from === 'g') grams = input;
    else if (from === 'mg') grams = input / 1000;
    else if (from === 'ton') grams = input * 1000000;
    else if (from === 'oz') grams = input * 28.3495;

    let result;
    if (to === 'kg') result = grams / 1000;
    else if (to === 'g') result = grams;
    else if (to === 'mg') result = grams * 1000;
    else if (to === 'ton') result = grams / 1000000;
    else if (to === 'oz') result = grams / 28.3495;

    const resultElement = document.getElementById('weightResult');
    resultElement.innerText = result.toFixed(2);
    resultElement.classList.add('result-animation');
    setTimeout(() => resultElement.classList.remove('result-animation'), 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    const cursorFollower = document.createElement("div");
    cursorFollower.classList.add("cursor-follower");
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    const progressBar = document.createElement("div");
    progressBar.classList.add("scroll-progress");
    document.body.appendChild(progressBar);

    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener("mousemove", function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function updateCursor() {
        followerX += (cursorX - followerX) * 0.1;
        followerY += (cursorY - followerY) * 0.1;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
        
        const elemBelow = document.elementFromPoint(cursorX, cursorY);
        if (elemBelow && elemBelow.closest('.card')) {
            cursor.classList.add('cursor-card');
            cursorFollower.classList.add('cursor-card');
        } else {
            cursor.classList.remove('cursor-card');
            cursorFollower.classList.remove('cursor-card');
        }
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    const hoverElements = document.querySelectorAll('a, button, select, input, .card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });

    document.addEventListener('click', function() {
        cursor.classList.add('cursor-click');
        setTimeout(() => {
            cursor.classList.remove('cursor-click');
        }, 300);
    });

    document.querySelectorAll('.navbar-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.navbar-nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            const startPosition = window.pageYOffset;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                const easing = function(t) {
                    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                };
                
                window.scrollTo(0, startPosition + distance * easing(percentage));
                
                if (progress < duration) {
                    requestAnimationFrame(step);
                }
            }
            
            requestAnimationFrame(step);
        });
    });

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });
    
    sr.reveal('.card', { interval: 300 });

    const sections = document.querySelectorAll('.card.inputSection');
    const navLinks = document.querySelectorAll('.navbar-nav a');

    const observerOptions = {
        threshold: 0.65,
        rootMargin: "-100px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    let scrollY = window.pageYOffset;
    let ticking = false;

    window.addEventListener('scroll', function() {
        scrollY = window.pageYOffset;
        
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        
        const scrollDownIndicator = document.querySelector('.scroll-down');
        if (scrollDownIndicator) {
            if (scrollY > 100) {
                scrollDownIndicator.classList.add('hidden');
            } else {
                scrollDownIndicator.classList.remove('hidden');
            }
        }
        
        if (!ticking) {
            requestAnimationFrame(() => {
                document.querySelectorAll('.card.inputSection').forEach((card, index) => {
                    const cardY = card.offsetTop;
                    const windowHeight = window.innerHeight;
                    const cardTop = card.getBoundingClientRect().top;
                    
                    if (cardTop < windowHeight && cardTop > -card.offsetHeight) {
                        const scrollPercentage = (windowHeight - cardTop) / (windowHeight + card.offsetHeight);
                        
                        const offset = Math.min(20, Math.max(-20, (scrollPercentage - 0.5) * 40));
                        card.style.transform = `translateY(${offset * (index % 2 === 0 ? 1 : -1)}px)`;
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    const scrollDownIndicator = document.createElement("div");
    scrollDownIndicator.classList.add("scroll-down");
    document.body.appendChild(scrollDownIndicator);
    
    let velocityY = 0;
    let lastScrollTop = 0;
    let isScrolling = false;
    
    function momentumScroll() {
        if (!isScrolling) return;
        
        const currentScrollTop = window.pageYOffset;
        const delta = currentScrollTop - lastScrollTop;
        lastScrollTop = currentScrollTop;
        
        velocityY = velocityY * 0.8 + delta * 0.2;
        
        if (Math.abs(velocityY) > 0.1) {
            window.scrollBy(0, velocityY);
            requestAnimationFrame(momentumScroll);
        } else {
            isScrolling = false;
        }
    }
    
    window.addEventListener('wheel', function() {
        isScrolling = true;
        if (!ticking) {
            requestAnimationFrame(momentumScroll);
            ticking = true;
        }
    }, { passive: true });
    
    let touchStartY = 0;
    let touchEndY = 0;
    let touchVelocity = 0;
    let lastTouchY = 0;
    let touchTime = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        touchTime = Date.now();
        velocityY = 0;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        const currentY = e.touches[0].clientY;
        const deltaY = lastTouchY - currentY;
        lastTouchY = currentY;
        
        const now = Date.now();
        const dt = now - touchTime;
        touchTime = now;
        
        if (dt > 0) {
            touchVelocity = deltaY / dt * 15; 
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        touchEndY = lastTouchY;
        velocityY = touchVelocity;
        
        if (Math.abs(velocityY) > 0.5) {
            isScrolling = true;
            requestAnimationFrame(momentumScroll);
        }
    }, { passive: true });
});
