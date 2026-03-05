/**
 * Portfolio - Video Creator
 * Main JavaScript with Swiper, GSAP, and Data Integration
 */

// Global variables
let heroSwiper = null;
let worksSwiper = null;

/**
 * Get image/video source (supports uploaded files in LocalStorage)
 */
function getMediaSrc(path) {
    if (!path) return '';

    // Check if it's a data URL or external URL
    if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Check LocalStorage for uploaded files
    try {
        const uploads = JSON.parse(localStorage.getItem('portfolio_uploads') || '{}');
        if (uploads[path] && uploads[path].data) {
            return uploads[path].data;
        }
    } catch (e) {
        console.warn('Error reading uploads:', e);
    }

    // Return original path (for existing files)
    return path;
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize data
        PortfolioData.init();

        // Load all data from storage
        loadAllData();

        // Initialize components
        initNavigation();
        initHeroSwiper();
        initWorksSwiper();
        initChannels();
        initGSAPAnimations();
        initShowreel();
        initContactForm();
        initVideoModal();
        initHeroPIP();
    } catch (e) {
        console.error('초기화 오류:', e);
    }
});

/**
 * Load All Data from Storage
 */
function loadAllData() {
    loadSiteSettings();
    loadProfile();
    loadStats();
    loadContact();
    loadTogether();
    loadHeroSlides();
    loadChannels();
    loadWorks();
    loadHeroContentSettings();
    loadTypography();
}

/**
 * Load Site Settings
 */
function loadSiteSettings() {
    const settings = PortfolioData.getSiteSettings();

    // Logo
    const logo = document.getElementById('nav-logo-text');
    const footerLogo = document.getElementById('footer-logo');
    if (logo) logo.textContent = settings.siteName;
    if (footerLogo) footerLogo.textContent = settings.siteName;

    // Hero title - 글자 단위로 분리하여 네온 효과 적용
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && settings.heroTitle) {
        // 네온 효과 클래스 추가
        heroTitle.classList.add('hero-title-neon');

        heroTitle.innerHTML = settings.heroTitle.map((line, i) => {
            const isAccent = i === settings.heroTitle.length - 1;
            // 각 글자를 span으로 감싸기
            const chars = line.split('').map(char => {
                if (char === ' ') {
                    return `<span class="char space">&nbsp;</span>`;
                }
                return `<span class="char">${char}</span>`;
            }).join('');
            return `<span class="line ${isAccent ? 'accent' : ''}">${chars}</span>`;
        }).join('');
    }

    // Hero subtitle
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = settings.heroSubtitle;

    // Showreel
    const showreelTitle = document.getElementById('showreel-title');
    const showreelSubtitle = document.getElementById('showreel-subtitle');
    const showreelSource = document.getElementById('showreel-source');

    if (showreelTitle) showreelTitle.textContent = settings.showreelTitle;
    if (showreelSubtitle) showreelSubtitle.textContent = settings.showreelSubtitle;
    if (showreelSource) showreelSource.src = settings.showreelUrl;

    // Footer
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerCopyright) footerCopyright.textContent = settings.footerText;
}

/**
 * Load Profile Data
 */
function loadProfile() {
    const profile = PortfolioData.getProfile();
    const skills = PortfolioData.getSkills();

    // Profile image - 이미지가 없으면 placeholder 표시
    const profileImage = document.getElementById('profile-image');
    const aboutImageSection = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    const imagePlaceholder = document.querySelector('.image-placeholder');

    if (profileImage && aboutImageSection) {
        const imageSrc = getMediaSrc(profile.image);
        if (!imageSrc || imageSrc.trim() === '') {
            // 이미지가 없으면 placeholder 표시
            profileImage.style.display = 'none';
            if (imagePlaceholder) imagePlaceholder.style.display = 'flex';
        } else {
            profileImage.src = imageSrc;
            profileImage.style.display = 'block';
            if (imagePlaceholder) imagePlaceholder.style.display = 'none';
            profileImage.onerror = () => {
                profileImage.style.display = 'none';
                if (imagePlaceholder) imagePlaceholder.style.display = 'flex';
            };

            // 프로필 이미지 클릭 → 원본 크기 라이트박스
            profileImage.addEventListener('click', () => {
                const lightbox = document.getElementById('image-lightbox');
                const lightboxImg = document.getElementById('lightbox-image');
                if (lightbox && lightboxImg) {
                    lightboxImg.src = profileImage.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    }

    // 라이트박스 닫기
    const lightbox = document.getElementById('image-lightbox');
    const lightboxClose = document.getElementById('lightbox-close');
    if (lightbox) {
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }

    // Name and role
    const aboutName = document.getElementById('about-name');
    const aboutRole = document.getElementById('about-role');
    if (aboutName) aboutName.textContent = profile.name;
    if (aboutRole) aboutRole.textContent = profile.role;

    // Description - 향상된 포맷팅
    const aboutDescription = document.getElementById('about-description');
    if (aboutDescription && profile.description) {
        aboutDescription.innerHTML = profile.description.map(p => {
            // 빈 줄이면 구분용 여백
            if (!p || p.trim() === '' || p === '.') {
                return '<div class="paragraph-break"></div>';
            }
            // **텍스트** → 강조
            let formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // __텍스트__ → 하이라이트
            formatted = formatted.replace(/__(.*?)__/g, '<span class="highlight">$1</span>');
            return `<p>${formatted}</p>`;
        }).join('');
    }

    // Skills
    const skillTags = document.getElementById('skill-tags');
    if (skillTags) {
        skillTags.innerHTML = skills.map(skill => `<span class="tag">${skill}</span>`).join('');
    }

    // Location
    const contactLocation = document.getElementById('contact-location');
    if (contactLocation) contactLocation.textContent = profile.location;
}

/**
 * Load Stats Data
 */
function loadStats() {
    const stats = PortfolioData.getStats();

    // About section stats
    const statProjects = document.getElementById('stat-projects');
    const statClients = document.getElementById('stat-clients');
    const statYears = document.getElementById('stat-years');

    if (statProjects) statProjects.dataset.count = stats.projects;
    if (statClients) statClients.dataset.count = stats.clients;
    if (statYears) statYears.dataset.count = stats.years;

    // Big stats section
    const statBigProjects = document.getElementById('stat-big-projects');
    const statBigClients = document.getElementById('stat-big-clients');
    const statBigYears = document.getElementById('stat-big-years');

    if (statBigProjects) statBigProjects.dataset.count = stats.projects;
    if (statBigClients) statBigClients.dataset.count = stats.clients;
    if (statBigYears) statBigYears.dataset.count = stats.years;
}

/**
 * Load Contact Data
 */
function loadContact() {
    const contact = PortfolioData.getContact();

    // Email
    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) {
        emailLink.href = `mailto:${contact.email}`;
        emailLink.textContent = contact.email;
    }

    // Phone
    const phoneLink = document.getElementById('contact-phone-link');
    if (phoneLink) {
        phoneLink.href = `tel:${contact.phone.replace(/-/g, '')}`;
        phoneLink.textContent = contact.phone;
    }

    // Social links
    const socialYoutube = document.getElementById('social-youtube');
    const socialInstagram = document.getElementById('social-instagram');
    const socialVimeo = document.getElementById('social-vimeo');
    const socialBehance = document.getElementById('social-behance');

    if (socialYoutube) socialYoutube.href = contact.youtube || '#';
    if (socialInstagram) socialInstagram.href = contact.instagram || '#';
    if (socialVimeo) socialVimeo.href = contact.vimeo || '#';
    if (socialBehance) socialBehance.href = contact.behance || '#';
}

/**
 * Load Together Section
 */
function loadTogether() {
    const together = PortfolioData.getTogether();
    const container = document.getElementById('together-members');

    if (!container || !together || !together.members) return;

    container.innerHTML = together.members.map(member => {
        const photoSrc = getMediaSrc(member.photo);
        const initials = member.name ? member.name.charAt(0).toUpperCase() : '?';

        return `
            <div class="together-member-card" data-id="${member.id}">
                <div class="together-member-photo">
                    ${photoSrc ?
                        `<img src="${photoSrc}" alt="${member.name}" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'>${initials}</div>'">` :
                        `<div class="photo-placeholder">${initials}</div>`
                    }
                </div>
                <div class="together-member-info">
                    <h3 class="together-member-name">${member.name || '이름 없음'}</h3>
                    <p class="together-member-role">${member.role || ''}</p>
                    <p class="together-member-bio">${member.bio || ''}</p>
                    ${member.skills && member.skills.length > 0 ? `
                        <div class="together-member-skills">
                            ${member.skills.map(skill => `<span>${skill}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Load Hero Slides
 */
function loadHeroSlides() {
    const slides = PortfolioData.getHeroSlides();
    const container = document.getElementById('hero-slides');

    if (!container) return;

    container.innerHTML = slides.map(slide => {
        let mediaContent = '';
        const mediaSrc = getMediaSrc(slide.src);
        const posterSrc = getMediaSrc(slide.poster);

        if (slide.type === 'video') {
            mediaContent = `
                <video autoplay muted loop playsinline poster="${posterSrc || ''}">
                    <source src="${mediaSrc}" type="video/mp4">
                </video>
            `;
        } else if (slide.type === 'youtube') {
            const videoId = extractYoutubeId(slide.src);
            mediaContent = `
                <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0"
                    frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            `;
        } else {
            mediaContent = `<img src="${mediaSrc}" alt="">`;
        }

        return `
            <div class="swiper-slide hero-slide">
                <div class="slide-media">${mediaContent}</div>
                <div class="slide-overlay"></div>
            </div>
        `;
    }).join('');

    // If no slides, add fallback
    if (slides.length === 0) {
        container.innerHTML = `
            <div class="swiper-slide hero-slide">
                <div class="slide-media"><div class="video-fallback"></div></div>
                <div class="slide-overlay"></div>
            </div>
        `;
    }
}

/**
 * Load Hero Content Settings
 */
function loadHeroContentSettings() {
    const settings = PortfolioData.getHeroContentSettings();
    if (!settings) return;

    const bgContainer = document.getElementById('hero-content-bg');
    const overlay = document.querySelector('.hero-content-overlay');
    const heroTitle = document.getElementById('hero-title');

    // 배경 설정
    if (bgContainer) {
        if (settings.backgroundType === 'none' || !settings.backgroundSrc) {
            bgContainer.innerHTML = '';
        } else {
            const mediaSrc = getMediaSrc(settings.backgroundSrc);
            if (settings.backgroundType === 'video') {
                bgContainer.innerHTML = `<video autoplay muted loop playsinline><source src="${mediaSrc}" type="video/mp4"></video>`;
            } else if (settings.backgroundType === 'image') {
                bgContainer.innerHTML = `<img src="${mediaSrc}" alt="">`;
            }
        }
    }

    // 오버레이 투명도
    if (overlay) {
        overlay.style.background = `rgba(10, 10, 10, ${settings.overlayOpacity || 0.8})`;
    }

    // 타이틀 효과
    if (heroTitle && settings.titleEffect && settings.titleEffect !== 'none') {
        heroTitle.classList.add('effect-' + settings.titleEffect);
    }
}

/**
 * Load Typography Settings
 */
function loadTypography() {
    const typo = PortfolioData.getTypography();
    if (!typo) return;

    // 동적 스타일 생성
    let styleEl = document.getElementById('dynamic-typography');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'dynamic-typography';
        document.head.appendChild(styleEl);
    }

    const heroTitle = typo.heroTitle || {};
    const heroSubtitle = typo.heroSubtitle || {};
    const greetingText = typo.greetingText || {};

    styleEl.textContent = `
        .hero-title {
            font-family: ${heroTitle.fontFamily || "'Bebas Neue', 'Montserrat', sans-serif"};
            font-size: clamp(3rem, 12vw, ${heroTitle.fontSize || '10rem'});
            font-weight: ${heroTitle.fontWeight || '400'};
            letter-spacing: ${heroTitle.letterSpacing || '5px'};
            line-height: ${heroTitle.lineHeight || '0.95'};
        }
        .hero-subtitle {
            font-family: ${heroSubtitle.fontFamily || "'Rocket', 'Noto Sans KR', sans-serif"};
            font-size: ${heroSubtitle.fontSize || '1.4rem'};
            font-weight: ${heroSubtitle.fontWeight || '400'};
            letter-spacing: ${heroSubtitle.letterSpacing || '3px'};
        }
        .greeting-text {
            font-family: ${greetingText.fontFamily || "'Rocket', 'Noto Sans KR', sans-serif"};
            font-size: clamp(1.5rem, 4vw, ${greetingText.fontSize || '3rem'});
            font-weight: ${greetingText.fontWeight || 'normal'};
            letter-spacing: ${greetingText.letterSpacing || '0px'};
            line-height: ${greetingText.lineHeight || '1.8'};
        }
    `;
}

/**
 * Load Channels Preview (파트너 채널 마퀴 - 무한 스크롤)
 */
function loadChannels() {
    const channels = PortfolioData.getChannels();
    const container = document.getElementById('channels-preview');

    if (!container) return;

    if (!channels || channels.length === 0) {
        container.innerHTML = '<p class="channels-empty">등록된 채널이 없습니다.</p>';
        return;
    }

    // 마퀴용 아이템 생성 (원형 로고 + 채널명)
    const itemsHTML = channels.map(channel => {
        const logoSrc = getMediaSrc(channel.logo);
        const hasLogo = logoSrc && logoSrc.trim() !== '';

        return `
            <div class="marquee-item">
                <div class="marquee-logo">
                    ${hasLogo
                        ? `<img src="${logoSrc}" alt="${channel.name}" class="marquee-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                           <div class="marquee-logo-placeholder" style="display:none;">${channel.name.charAt(0)}</div>`
                        : `<div class="marquee-logo-placeholder">${channel.name.charAt(0)}</div>`
                    }
                </div>
                <span class="marquee-name">${channel.name}</span>
            </div>
        `;
    }).join('');

    // 무한 스크롤: 동일한 세트 2개를 나란히 배치, 각 세트에 오른쪽 gap 포함
    container.innerHTML = `
        <div class="marquee-track">
            <div class="marquee-set">${itemsHTML}</div>
            <div class="marquee-set">${itemsHTML}</div>
        </div>
    `;
}

/**
 * Initialize Channel Interactions (파트너 채널 마퀴)
 */
function initChannels() {
    // 마퀴는 CSS animation으로 동작하므로 별도 JS 불필요
}

/**
 * Load Works
 */
function loadWorks() {
    const works = PortfolioData.getWorks();
    const categories = PortfolioData.getCategories();

    // Load filter buttons
    const filterContainer = document.getElementById('works-filter');
    if (filterContainer) {
        filterContainer.innerHTML = categories.map(cat =>
            `<button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">${cat.label}</button>`
        ).join('');

        // Add filter event listeners
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => filterWorks(btn.dataset.filter));
        });
    }

    // Load works slides
    const worksContainer = document.getElementById('works-slides');
    if (worksContainer) {
        worksContainer.innerHTML = works.map(work => {
            const thumbnailSrc = getMediaSrc(work.thumbnail);
            const videoSrc = work.videoUrl ? getMediaSrc(work.videoUrl) : '';
            const hasThumbnail = thumbnailSrc && thumbnailSrc.trim() !== '';
            const hasVideo = videoSrc && videoSrc.trim() !== '';
            const categoryLabel = work.categoryLabel || work.category || '';

            return `
                <div class="swiper-slide work-slide" data-category="${work.category || 'all'}">
                    <div class="work-card" ${hasVideo ? `data-video="${videoSrc}"` : ''}>
                        <div class="work-thumbnail ${!hasThumbnail ? 'no-image' : ''}">
                            ${hasThumbnail
                                ? `<img src="${thumbnailSrc}" alt="${work.title}" onerror="this.parentElement.classList.add('no-image'); this.style.display='none';">`
                                : `<div class="thumbnail-placeholder"><span>No Image</span></div>`
                            }
                            <div class="work-overlay">
                                <div class="work-info">
                                    ${categoryLabel ? `<span class="work-category">${categoryLabel}</span>` : ''}
                                    <h3 class="work-title">${work.title || 'Untitled'}</h3>
                                    <p class="work-desc">${work.description || ''}</p>
                                    <a href="${work.link || '#'}" class="work-link" ${hasVideo ? `data-video="${videoSrc}"` : ''}>
                                        ${hasVideo ? 'PLAY VIDEO →' : 'VIEW PROJECT →'}
                                    </a>
                                </div>
                            </div>
                            ${hasVideo ? `
                                <div class="play-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Update counter
        updateWorksCounter(works.length);
    }
}

/**
 * Filter Works
 */
function filterWorks(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });

    // Filter slides
    const slides = document.querySelectorAll('.work-slide');
    slides.forEach(slide => {
        const slideCategory = slide.dataset.category;
        const show = category === 'all' || slideCategory === category;
        slide.style.display = show ? '' : 'none';
    });

    // Update swiper
    if (worksSwiper) {
        worksSwiper.update();
        worksSwiper.slideTo(0);
    }
}

/**
 * Update Works Counter
 */
function updateWorksCounter(total) {
    const totalEl = document.querySelector('.works-counter .total');
    if (totalEl) {
        totalEl.textContent = String(total).padStart(2, '0');
    }
}

/**
 * Navigation Module
 */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
 * Hero Swiper Initialization
 */
function initHeroSwiper() {
    heroSwiper = new Swiper('.hero-swiper', {
        slidesPerView: 1,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
        on: {
            slideChange: function() {
                // Pause all videos
                document.querySelectorAll('.hero-slide video').forEach(video => {
                    video.pause();
                });
                // Play current slide video
                const activeSlide = this.slides[this.activeIndex];
                const video = activeSlide?.querySelector('video');
                if (video) video.play();
            }
        }
    });
}

/**
 * Works Swiper Initialization
 */
function initWorksSwiper() {
    worksSwiper = new Swiper('.works-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: false,
        speed: 600,
        navigation: {
            nextEl: '.works-next',
            prevEl: '.works-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1280: {
                slidesPerView: 3.5,
                spaceBetween: 40,
            }
        },
        on: {
            slideChange: function() {
                const current = document.querySelector('.works-counter .current');
                if (current) {
                    current.textContent = String(this.realIndex + 1).padStart(2, '0');
                }
            }
        }
    });

    // Click to go to slide
    document.querySelectorAll('.work-slide').forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (worksSwiper) {
                worksSwiper.slideTo(index);
            }
        });
    });
}

/**
 * GSAP Animations
 */
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Neon Light-Up Effect - 스크롤 시 글자가 하나씩 켜지는 효과
    const heroTitleNeon = document.querySelector('.hero-title-neon');
    if (heroTitleNeon) {
        const allChars = heroTitleNeon.querySelectorAll('.char:not(.space)');

        // 스크롤 트리거로 글자 하나씩 켜기
        ScrollTrigger.create({
            trigger: '.hero-content-section',
            start: 'top 80%',
            end: 'center center',
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress;
                const charsToLight = Math.floor(progress * allChars.length);

                allChars.forEach((char, i) => {
                    if (i < charsToLight) {
                        if (!char.classList.contains('lit')) {
                            char.classList.add('lit');
                        }
                    } else {
                        char.classList.remove('lit');
                    }
                });
            }
        });

        // 페이지 로드 시 이미 스크롤된 위치면 효과 적용
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    } else {
        // 네온 효과가 없으면 기존 애니메이션 사용
        gsap.from('.hero-title .line', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // Hero Subtitle - 고장난 전구 깜빡임 효과 (마우스 호버 시 한 번만)
    const heroSubtitleEl = document.querySelector('.hero-subtitle');
    if (heroSubtitleEl) {
        // 로켓 폰트 강제 적용 + 크기 키움
        heroSubtitleEl.style.fontFamily = "'Rocket', 'Noto Sans KR', sans-serif";
        heroSubtitleEl.style.fontSize = "1.8rem";

        let hasFlickered = false;

        heroSubtitleEl.addEventListener('mouseenter', () => {
            if (!hasFlickered) {
                hasFlickered = true;
                heroSubtitleEl.classList.add('flicker-active');

                // 애니메이션 끝나면 lit 상태 유지
                heroSubtitleEl.addEventListener('animationend', () => {
                    heroSubtitleEl.classList.remove('flicker-active');
                    heroSubtitleEl.classList.add('lit');
                }, { once: true });
            }
        });
    }

    gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    // Greeting section - Pin and text reveal
    const greetingSection = document.querySelector('.greeting-section');
    if (greetingSection) {
        const chars = greetingSection.querySelectorAll('.greeting-text span');

        ScrollTrigger.create({
            trigger: '.greeting-section',
            start: 'top top',
            end: '+=1000',
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                chars.forEach((char, i) => {
                    const charProgress = (progress * chars.length) - i;
                    if (charProgress > 0) {
                        char.classList.add('show');
                    } else {
                        char.classList.remove('show');
                    }
                });
            }
        });
    }

    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Key Stats Section - Scroll-triggered motion graphics
    initKeyStatsAnimation();

    // Career Section - 타임라인 모션그래픽 등장
    initCareerAnimation();

    // About content animation
    gsap.from('.about-image', {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.from('.about-text', {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stats counter animation
    initCounterAnimation();

    // Parallax effect for hero
    gsap.to('.hero-content', {
        yPercent: 30,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

/**
 * Counter Animation with GSAP
 */
function initCounterAnimation() {
    // About section counters
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.dataset.count) || 0;

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    textContent: target,
                    duration: 1.5,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.round(parseFloat(counter.textContent));
                    }
                });
            },
            once: true
        });
    });

    // Big stats section counters
    document.querySelectorAll('.stat-big-number').forEach(counter => {
        const target = parseInt(counter.dataset.count) || 0;
        const suffix = counter.dataset.suffix || '';

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        counter.textContent = formatNumber(Math.round(this.targets()[0].val)) + suffix;
                    }
                });
            },
            once: true
        });
    });
}

/**
 * Key Stats Section - Scroll-triggered Motion Graphics
 * 숫자 카운트업 + 스태거 페이드인 + 디바이더 스케일 + 스페셜티 슬라이드업
 */
function initKeyStatsAnimation() {
    const statsSection = document.querySelector('.key-stats-section');
    if (!statsSection) return;

    const statItems = statsSection.querySelectorAll('.key-stat-item');
    const dividers = statsSection.querySelectorAll('.key-stat-divider');
    const specialties = statsSection.querySelector('.key-stats-specialties');
    const statNumbers = statsSection.querySelectorAll('.key-stat-number');

    // 타임라인 생성 - 스크롤 트리거
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: statsSection,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // 1단계: stat items 하나씩 등장 (아래에서 위로 + 페이드인)
    tl.to(statItems, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // 2단계: 디바이더 라인 확장 (동시에)
    tl.to(dividers, {
        opacity: 1,
        scaleY: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.3');

    // 3단계: 숫자 카운트업 애니메이션
    statNumbers.forEach(numEl => {
        const text = numEl.textContent.trim();
        // 숫자 부분과 접미사 분리 (예: "30+" → 30, "+", "92%" → 92, "%", "9년" → 9, "년")
        const match = text.match(/^([\d,]+)(.*)/);
        if (!match) return;

        const targetNum = parseInt(match[1].replace(/,/g, ''));
        const suffix = match[2];

        // 초기값 0으로 설정
        numEl.textContent = '0' + suffix;

        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 75%',
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: targetNum,
                    duration: 1.8,
                    delay: 0.3,
                    ease: 'power2.out',
                    onUpdate: function() {
                        numEl.textContent = formatNumber(Math.round(this.targets()[0].val)) + suffix;
                    }
                });
            },
            once: true
        });
    });

    // 4단계: 스페셜티 태그 슬라이드업
    if (specialties) {
        tl.to(specialties, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.2');

        // 개별 태그 스태거 애니메이션
        const tags = specialties.querySelectorAll('.specialty-tag');
        const dots = specialties.querySelectorAll('.specialty-dot');

        tl.from(tags, {
            opacity: 0,
            x: -15,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3');

        tl.from(dots, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: 'back.out(2)'
        }, '-=0.4');
    }
}

/**
 * Career Section - Scroll-triggered Motion Graphics
 * 타임라인 라인 드로잉 + 아이콘 팝인 + 텍스트 슬라이드 + 배지 바운스
 */
function initCareerAnimation() {
    const careerSection = document.querySelector('.career-section');
    if (!careerSection) return;

    const careerItems = careerSection.querySelectorAll('.career-item');
    const timelineLine = careerSection.querySelector('.career-timeline');

    // 타임라인 세로선: clipPath로 위에서 아래로 드로잉
    if (timelineLine) {
        gsap.set(timelineLine, { '--line-progress': '0%' });
    }

    // 메인 타임라인
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: careerSection,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            onEnter: () => timelineLine && timelineLine.classList.add('animate-line'),
            onLeaveBack: () => timelineLine && timelineLine.classList.remove('animate-line')
        }
    });

    // 2단계: 각 career-item 순차 등장
    careerItems.forEach((item, i) => {
        const icon = item.querySelector('.career-icon');
        const title = item.querySelector('.career-title');
        const company = item.querySelector('.career-company');
        const desc = item.querySelector('.career-desc');
        const badge = item.querySelector('.career-badge');

        const itemTl = gsap.timeline();
        const delay = i * 0.2;

        // 아이콘: 스케일 바운스 + 페이드
        if (icon) {
            gsap.set(icon, { scale: 0, opacity: 0 });
            itemTl.to(icon, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(2)',
            }, 0);
        }

        // 전체 아이템: 왼쪽에서 슬라이드 + 페이드
        itemTl.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
        }, 0);

        // 타이틀: 약간 지연 후 아래에서 등장
        if (title) {
            gsap.set(title, { opacity: 0, y: 15 });
            itemTl.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            }, 0.15);
        }

        // 회사명/설명: 추가 지연
        if (company) {
            gsap.set(company, { opacity: 0, y: 10 });
            itemTl.to(company, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            }, 0.25);
        }

        if (desc) {
            gsap.set(desc, { opacity: 0, y: 10 });
            itemTl.to(desc, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
            }, 0.25);
        }

        // 배지: 스케일 바운스
        if (badge) {
            gsap.set(badge, { opacity: 0, scale: 0.5 });
            itemTl.to(badge, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'back.out(3)',
            }, 0.35);
        }

        // 메인 타임라인에 추가 (순차 지연)
        tl.add(itemTl, delay);
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format subscribers count (e.g., 1.2만, 35만, 120만)
 * 한글이 포함된 경우 그대로 출력, 숫자만 있으면 변환
 */
function formatSubscribers(val) {
    if (!val) return '';
    const str = String(val);
    // 이미 한글(만, 천 등)이 포함되어 있으면 그대로 반환
    if (/[만천억]/.test(str)) {
        return str;
    }
    // 숫자만 있는 경우 변환
    const n = parseInt(str.replace(/,/g, ''));
    if (isNaN(n)) return str;
    if (n >= 10000) {
        const wan = n / 10000;
        if (wan >= 100) {
            return Math.round(wan) + '만';
        }
        return (Math.round(wan * 10) / 10) + '만';
    }
    return formatNumber(n);
}

/**
 * Extract YouTube Video ID
 */
function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
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

        closeBtn.addEventListener('click', closeShowreel);
        container.addEventListener('click', (e) => {
            if (e.target === container) closeShowreel();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && container.classList.contains('active')) {
                closeShowreel();
            }
        });

        function closeShowreel() {
            container.classList.remove('active');
            video.pause();
            video.currentTime = 0;
            document.body.style.overflow = '';
        }
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

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'MESSAGE SENT!';
            btn.style.background = '#4CAF50';

            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // Copy buttons functionality
    initCopyButtons();
}

/**
 * Copy Buttons for Contact Section
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const copyType = btn.dataset.copy;
            let textToCopy = '';

            if (copyType === 'email') {
                const emailLink = document.getElementById('contact-email-link');
                textToCopy = emailLink ? emailLink.textContent : '';
            } else if (copyType === 'phone') {
                const phoneLink = document.getElementById('contact-phone-link');
                textToCopy = phoneLink ? phoneLink.textContent : '';
            }

            if (textToCopy) {
                try {
                    await navigator.clipboard.writeText(textToCopy);

                    // Show success state
                    btn.classList.add('copied');

                    // Reset after animation
                    setTimeout(() => {
                        btn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);

                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-9999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.classList.remove('copied');
                    }, 2000);
                }
            }
        });
    });
}

/**
 * Video Modal Module for WORKS section
 */
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.getElementById('modal-close');

    if (!modal || !modalVideo) return;

    // Play icon click event - delegate to work cards
    document.addEventListener('click', (e) => {
        // Check if clicked on play icon or work card with video
        const playIcon = e.target.closest('.play-icon');
        const workCard = e.target.closest('.work-card');

        if (playIcon && workCard) {
            e.preventDefault();
            e.stopPropagation();

            // work-card에서 직접 video URL 가져오기
            let videoUrl = workCard.dataset.video;

            // 없으면 work-link에서 가져오기
            if (!videoUrl) {
                const workLink = workCard.querySelector('.work-link');
                videoUrl = workLink ? workLink.dataset.video : null;
            }

            if (videoUrl) {
                openVideoModal(videoUrl);
            }
        }
    });

    // VIEW PROJECT / PLAY VIDEO link click event
    document.addEventListener('click', (e) => {
        const workLink = e.target.closest('.work-link');
        if (workLink && workLink.dataset.video) {
            e.preventDefault();
            openVideoModal(workLink.dataset.video);
        }
    });

    // Close button
    if (modalClose) {
        modalClose.addEventListener('click', closeVideoModal);
    }

    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    function openVideoModal(videoUrl) {
        const videoSrc = getMediaSrc(videoUrl);
        const source = modalVideo.querySelector('source') || document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';

        if (!modalVideo.querySelector('source')) {
            modalVideo.appendChild(source);
        }

        modalVideo.load();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Auto play
        modalVideo.play().catch(() => {
            // Autoplay blocked, user needs to click play
        });
    }

    function closeVideoModal() {
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
        document.body.style.overflow = '';
    }
}

/**
 * Hero Video PIP (Picture-in-Picture) Mode
 * 스크롤 시 히어로 영상이 우측 하단 PIP로 전환
 */
function initHeroPIP() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // PIP 컨테이너 생성
    const pipContainer = document.createElement('div');
    pipContainer.className = 'hero-pip-container';
    pipContainer.innerHTML = `
        <div class="pip-video-wrapper">
            <video class="pip-video" muted playsinline></video>
            <div class="pip-controls">
                <button class="pip-close" aria-label="PIP 닫기">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
                <button class="pip-expand" aria-label="전체화면으로 돌아가기">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                </button>
            </div>
            <div class="pip-resize-handle" aria-label="크기 조절">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15l-6 6M21 9l-12 12"/>
                </svg>
            </div>
            <div class="pip-size-indicator"></div>
            <div class="pip-progress">
                <div class="pip-progress-bar"></div>
            </div>
        </div>
    `;
    document.body.appendChild(pipContainer);

    const pipWrapper = pipContainer.querySelector('.pip-video-wrapper');
    const pipVideo = pipContainer.querySelector('.pip-video');
    const pipClose = pipContainer.querySelector('.pip-close');
    const pipExpand = pipContainer.querySelector('.pip-expand');
    const pipProgress = pipContainer.querySelector('.pip-progress-bar');
    const pipResizeHandle = pipContainer.querySelector('.pip-resize-handle');
    const pipSizeIndicator = pipContainer.querySelector('.pip-size-indicator');

    // 크기 설정 (최소, 기본, 최대)
    const PIP_SIZES = {
        min: 280,
        default: 480,
        max: 720
    };
    let currentPipWidth = PIP_SIZES.default;

    let isPIPActive = false;
    let isPIPClosed = false;
    let heroVideo = null;
    let lastScrollY = 0;

    // 히어로 영상 찾기
    function findHeroVideo() {
        const activeSlide = heroSection.querySelector('.swiper-slide-active video');
        return activeSlide || heroSection.querySelector('.hero-slide video') || heroSection.querySelector('video');
    }

    // PIP 활성화
    function activatePIP() {
        if (isPIPActive || isPIPClosed) return;

        heroVideo = findHeroVideo();
        if (!heroVideo || heroVideo.paused) return;

        // PIP 비디오에 소스 복사
        pipVideo.src = heroVideo.currentSrc || heroVideo.src;
        pipVideo.currentTime = heroVideo.currentTime;
        pipVideo.muted = true;
        pipVideo.play().catch(() => {});

        // 원본 영상 음소거 (PIP로 전환되어도 소리가 나지 않도록)
        pipContainer.classList.add('active');
        isPIPActive = true;

        // 진행률 동기화
        syncProgress();
    }

    // PIP 비활성화
    function deactivatePIP() {
        if (!isPIPActive) return;

        pipContainer.classList.remove('active');
        isPIPActive = false;

        // 원본 영상과 시간 동기화
        if (heroVideo && pipVideo) {
            heroVideo.currentTime = pipVideo.currentTime;
        }
        pipVideo.pause();
    }

    // PIP 완전 닫기
    function closePIP() {
        deactivatePIP();
        isPIPClosed = true;
        pipVideo.pause();
    }

    // 전체화면으로 돌아가기
    function expandToFull() {
        if (heroVideo && pipVideo) {
            heroVideo.currentTime = pipVideo.currentTime;
        }
        deactivatePIP();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 진행률 바 업데이트
    function syncProgress() {
        if (!isPIPActive || !pipVideo) return;

        const progress = (pipVideo.currentTime / pipVideo.duration) * 100 || 0;
        pipProgress.style.width = `${progress}%`;

        requestAnimationFrame(syncProgress);
    }

    // 스크롤 이벤트
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (isPIPClosed) return;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const heroRect = heroSection.getBoundingClientRect();
            const heroBottom = heroRect.bottom;
            const threshold = window.innerHeight * 0.3; // 30% 지점

            if (heroBottom < threshold) {
                activatePIP();
            } else if (heroBottom > threshold * 1.5) {
                deactivatePIP();
            }
        }, 50);
    });

    // 닫기 버튼
    pipClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closePIP();
    });

    // 확대 버튼
    pipExpand.addEventListener('click', (e) => {
        e.stopPropagation();
        expandToFull();
    });

    // PIP 클릭 시 전체화면으로
    pipContainer.querySelector('.pip-video-wrapper').addEventListener('click', (e) => {
        if (e.target.closest('.pip-controls')) return;
        expandToFull();
    });

    // Swiper 슬라이드 변경 시 PIP 업데이트
    if (heroSwiper) {
        heroSwiper.on('slideChange', () => {
            if (isPIPActive) {
                const newVideo = findHeroVideo();
                if (newVideo) {
                    pipVideo.src = newVideo.currentSrc || newVideo.src;
                    pipVideo.play().catch(() => {});
                }
            }
            // 슬라이드 변경 시 PIP 다시 활성화 가능하도록
            isPIPClosed = false;
        });
    }

    // 페이지 상단으로 스크롤 시 PIP 닫힘 상태 초기화
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            isPIPClosed = false;
        }
    });
}

/**
 * Section Title Character Split & Click Effects
 * 모든 .char-split 제목에 글자별 클릭 효과 적용
 * CONTACT 제목에만 이스터에그 숨김
 */
(function initCharSplitTitles() {
    // 모든 char-split 제목을 글자별 span으로 분리
    document.querySelectorAll('.section-title.char-split').forEach(title => {
        const text = title.textContent.trim();
        title.innerHTML = text.split('').map((char, i) => {
            if (char === ' ') return `<span class="char-letter space" data-char="${i}">&nbsp;</span>`;
            return `<span class="char-letter" data-char="${i}">${char}</span>`;
        }).join('');

        // 공통 클릭 효과: 클릭 시 잠깐 빛나기
        title.querySelectorAll('.char-letter:not(.space)').forEach(span => {
            span.addEventListener('click', (e) => {
                e.stopPropagation();
                span.classList.add('char-clicked');
                setTimeout(() => span.classList.remove('char-clicked'), 400);
            });
        });
    });

    // CONTACT 이스터에그
    const contactTitle = document.getElementById('contact-title');
    if (!contactTitle) return;

    // CONTACT = C(0) O(1) N(2) T(3) A(4) C(5) T(6)
    // 패턴: O(1) → T(3) → T(6) → A(4) → T(3) → T(6) → O(1)
    const SECRET_SEQ = [1, 3, 6, 4, 3, 6, 1];
    const TIMEOUT = 10000;

    let clickLog = [];
    let timer = null;

    function reset() {
        clickLog = [];
        clearTimeout(timer);
        timer = null;
        contactTitle.querySelectorAll('.char-letter').forEach(s => {
            s.classList.remove('egg-active');
        });
    }

    contactTitle.querySelectorAll('.char-letter:not(.space)').forEach(span => {
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(span.dataset.char);
            const step = clickLog.length;

            // 첫 클릭이 시퀀스 시작과 일치하면 추적 시작
            if (step === 0 && idx !== SECRET_SEQ[0]) return;

            // 첫 클릭 시 타이머 시작
            if (step === 0) {
                timer = setTimeout(reset, TIMEOUT);
            }

            const expected = SECRET_SEQ[step];

            if (idx === expected) {
                clickLog.push(idx);
                span.classList.add('egg-active');

                // 시퀀스 완료
                if (clickLog.length === SECRET_SEQ.length) {
                    contactTitle.classList.add('egg-success');
                    setTimeout(() => {
                        window.location.href = 'admin.html';
                    }, 600);
                }
            } else {
                // 틀리면 리셋 (빨간 깜빡임 없이 조용히)
                reset();
            }
        });
    });
})();

/**
 * Visitor Tracking System
 * IP 기반 방문기록 수집 (localStorage 저장)
 */
(function initVisitorTracking() {
    const STORAGE_KEY = 'portfolio_visitors';
    const MAX_RECORDS = 500;

    function getVisitorLogs() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function saveVisitorLog(log) {
        try {
            const logs = getVisitorLogs();
            logs.unshift(log);
            // 최대 500건 유지
            if (logs.length > MAX_RECORDS) {
                logs.length = MAX_RECORDS;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
        } catch (e) {
            console.warn('Visitor log save failed:', e);
        }
    }

    function getBrowserInfo() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
        if (ua.includes('Edg')) return 'Edge';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
        return 'Other';
    }

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/Mobi|Android/i.test(ua)) return 'Mobile';
        if (/Tablet|iPad/i.test(ua)) return 'Tablet';
        return 'Desktop';
    }

    // IP + 지역 가져오기 (HTTPS 무료 API)
    async function fetchIPAndLocation() {
        try {
            // ipwho.is: HTTPS 지원, 키 불필요
            const res = await fetch('https://ipwho.is/');
            const data = await res.json();
            if (data.success) {
                return {
                    ip: data.ip || 'unknown',
                    location: [data.country, data.region, data.city].filter(Boolean).join(' ')
                };
            }
            throw new Error('ipwho.is failed');
        } catch (e) {
            // 폴백: ipify로 IP만 가져오기
            try {
                const res2 = await fetch('https://api.ipify.org?format=json');
                const data2 = await res2.json();
                return { ip: data2.ip || 'unknown', location: '' };
            } catch (e2) {
                return { ip: 'unknown', location: '' };
            }
        }
    }

    // 방문 기록
    async function trackVisit() {
        const { ip, location } = await fetchIPAndLocation();
        const log = {
            ip: ip,
            location: location,
            timestamp: new Date().toISOString(),
            page: window.location.pathname + window.location.hash,
            referrer: document.referrer || 'direct',
            browser: getBrowserInfo(),
            device: getDeviceType(),
            screenSize: `${screen.width}x${screen.height}`,
            language: navigator.language || 'unknown'
        };
        saveVisitorLog(log);
    }

    // 페이지 로드 시 실행
    trackVisit();
})();
