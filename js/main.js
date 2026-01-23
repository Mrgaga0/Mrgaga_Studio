/**
 * Portfolio - Video Creator
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initHeroVideo();
    initScrollAnimations();
    initWorksFilter();
    initShowreel();
    initContactForm();
    initCounterAnimation();
});

/**
 * Navigation Module
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Hero Video Module
 */
function initHeroVideo() {
    const video = document.getElementById('hero-video');
    const fallback = document.querySelector('.video-fallback');

    if (video) {
        // Check if video can play
        video.addEventListener('canplay', () => {
            video.style.opacity = '1';
            if (fallback) fallback.style.opacity = '0';
        });

        // Handle video error
        video.addEventListener('error', () => {
            video.style.display = 'none';
            if (fallback) fallback.style.opacity = '1';
        });

        // Try to autoplay
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Autoplay was prevented
                console.log('Autoplay prevented:', error);
                // Show fallback or play button
            });
        }

        // Pause video when not in viewport (performance)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.25 });

        observer.observe(video);
    }
}

/**
 * Scroll Animations Module
 */
function initScrollAnimations() {
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .work-item, .contact-content');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

/**
 * Works Filter Module
 */
function initWorksFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter items with animation
            workItems.forEach((item, index) => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = `fadeIn 0.5s ${index * 0.1}s forwards`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Showreel Module
 */
function initShowreel() {
    const playBtn = document.getElementById('play-showreel');
    const closeBtn = document.getElementById('close-showreel');
    const container = document.getElementById('showreel-container');
    const video = document.getElementById('showreel-video');

    if (playBtn && container && video) {
        playBtn.addEventListener('click', () => {
            container.classList.add('active');
            video.play();
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', () => {
            container.classList.remove('active');
            video.pause();
            video.currentTime = 0;
            document.body.style.overflow = '';
        });

        // Close on background click
        container.addEventListener('click', (e) => {
            if (e.target === container) {
                container.classList.remove('active');
                video.pause();
                video.currentTime = 0;
                document.body.style.overflow = '';
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && container.classList.contains('active')) {
                container.classList.remove('active');
                video.pause();
                video.currentTime = 0;
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Contact Form Module
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', data);

            // Show success feedback
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'MESSAGE SENT!';
            btn.style.background = '#4CAF50';

            // Reset form
            form.reset();

            // Reset button after delay
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
}

/**
 * Counter Animation Module
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Video Modal for Work Items (Optional)
 */
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.getElementById('modal-close');
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.dataset.video;
            if (videoSrc && modal && modalVideo) {
                modalVideo.src = videoSrc;
                modal.classList.add('active');
                modalVideo.play();
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = '';
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modalVideo.pause();
                modalVideo.src = '';
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Cursor Effect (Optional - for desktop)
 */
function initCustomCursor() {
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorInner = document.createElement('div');
        cursorInner.className = 'custom-cursor-inner';
        document.body.appendChild(cursorInner);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorInner.style.left = e.clientX + 'px';
            cursorInner.style.top = e.clientY + 'px';
        });

        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .work-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorInner.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorInner.classList.remove('hover');
            });
        });

        // Add styles for custom cursor
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(255, 77, 77, 0.5);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s, border-color 0.2s;
                z-index: 9999;
            }
            .custom-cursor-inner {
                position: fixed;
                width: 8px;
                height: 8px;
                background: #ff4d4d;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
            }
            .custom-cursor.hover {
                width: 60px;
                height: 60px;
                border-color: rgba(255, 77, 77, 1);
            }
            .custom-cursor-inner.hover {
                transform: translate(-50%, -50%) scale(1.5);
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Preloader (Optional)
 */
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">PORTFOLIO</div>
            <div class="preloader-bar">
                <div class="preloader-progress"></div>
            </div>
        </div>
    `;
    document.body.prepend(preloader);

    // Add preloader styles
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s, visibility 0.5s;
        }
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        .preloader-content {
            text-align: center;
        }
        .preloader-logo {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 2rem;
            letter-spacing: 5px;
            margin-bottom: 30px;
            background: linear-gradient(135deg, #ff4d4d, #ff9f43);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .preloader-bar {
            width: 200px;
            height: 2px;
            background: #1a1a1a;
            overflow: hidden;
        }
        .preloader-progress {
            width: 0;
            height: 100%;
            background: linear-gradient(90deg, #ff4d4d, #ff9f43);
            animation: preloaderProgress 1.5s ease forwards;
        }
        @keyframes preloaderProgress {
            to { width: 100%; }
        }
    `;
    document.head.appendChild(style);

    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1500);
    });
}

// Initialize optional features
// Uncomment to enable:
// initCustomCursor();
// initPreloader();
initLazyLoading();
initVideoModal();
