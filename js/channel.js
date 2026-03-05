/**
 * Channel Page Controller
 * 채널별 포트폴리오 전용 페이지
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize data
    PortfolioData.init();

    // Load page content
    loadChannelTabs();
    loadChannelSections();
    loadFooter();

    // Initialize components
    initTabNavigation();
    initBackToTop();
    initMobileMenu();
});

/**
 * Get media source (check for uploaded files)
 */
function getMediaSrc(src) {
    if (!src) return null;

    // Check if it's an uploaded file
    const uploads = JSON.parse(localStorage.getItem('portfolio_uploads') || '{}');
    if (uploads[src]) {
        return uploads[src].data;
    }

    return src;
}

/**
 * Load Channel Tabs
 */
function loadChannelTabs() {
    const channels = PortfolioData.getChannels();
    const container = document.getElementById('channel-tabs');

    if (!container || !channels || channels.length === 0) return;

    container.innerHTML = channels.map((channel, index) => {
        const logoSrc = getMediaSrc(channel.logo);
        const logoHtml = logoSrc
            ? `<img src="${logoSrc}" alt="${channel.name}" class="channel-tab-logo">`
            : `<div class="channel-tab-logo-placeholder">${channel.name.charAt(0)}</div>`;

        const videoCount = channel.videos ? channel.videos.length : 0;

        return `
            <a href="#channel-${channel.id}"
               class="channel-tab ${index === 0 ? 'active' : ''}"
               data-channel-id="${channel.id}">
                ${logoHtml}
                <span class="channel-tab-name">${channel.name}</span>
                <span class="video-count">${videoCount}</span>
            </a>
        `;
    }).join('');
}

/**
 * Load Channel Sections
 */
function loadChannelSections() {
    const channels = PortfolioData.getChannels();
    const container = document.getElementById('channel-sections');

    if (!container || !channels || channels.length === 0) {
        container.innerHTML = `
            <div class="channel-empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M10 9l5 3-5 3V9z"/>
                </svg>
                <p>등록된 채널이 없습니다.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = channels.map((channel, index) => {
        const logoSrc = getMediaSrc(channel.logo);
        const logoHtml = logoSrc
            ? `<img src="${logoSrc}" alt="${channel.name}" class="channel-section-logo">`
            : `<div class="channel-section-logo-placeholder">${channel.name.charAt(0)}</div>`;

        const videoCount = channel.videos ? channel.videos.length : 0;

        // Generate video slides
        let videosHtml = '';
        if (channel.videos && channel.videos.length > 0) {
            const slides = channel.videos.map(video => {
                const thumbSrc = getMediaSrc(video.thumbnail);
                const thumbHtml = thumbSrc
                    ? `<img src="${thumbSrc}" alt="${video.title}">`
                    : `<div class="channel-video-thumbnail-placeholder">No Image</div>`;

                return `
                    <div class="swiper-slide channel-video-slide">
                        <a href="${video.youtubeUrl || '#'}"
                           class="channel-video-card"
                           target="_blank"
                           rel="noopener noreferrer">
                            <div class="channel-video-thumbnail">
                                ${thumbHtml}
                                <div class="channel-video-play">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="channel-video-info">
                                <h4 class="channel-video-title">${video.title}</h4>
                                <div class="channel-video-meta">
                                    <span class="channel-video-date">${video.date || ''}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            }).join('');

            videosHtml = `
                <div class="channel-videos-slider">
                    <div class="swiper channel-swiper channel-swiper-${channel.id}">
                        <div class="swiper-wrapper">
                            ${slides}
                        </div>
                    </div>
                    <div class="channel-slider-nav">
                        <button class="channel-swiper-button channel-swiper-prev-${channel.id}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </button>
                        <div class="channel-swiper-pagination channel-swiper-pagination-${channel.id}"></div>
                        <button class="channel-swiper-button channel-swiper-next-${channel.id}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        } else {
            videosHtml = `
                <div class="channel-empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M10 9l5 3-5 3V9z"/>
                    </svg>
                    <p>등록된 영상이 없습니다.</p>
                </div>
            `;
        }

        // 그룹 채널 여부 확인
        const isGroup = channel.isGroup || false;

        // 그룹 채널일 경우 하위 채널 표시
        let subChannelsHtml = '';
        if (isGroup && channel.subChannels && channel.subChannels.length > 0) {
            subChannelsHtml = `
                <div class="group-subchannels">
                    <h3 class="group-subchannels-title">운영 채널</h3>
                    <div class="group-subchannels-list">
                        ${channel.subChannels.map(sub => `
                            <div class="group-subchannel-item">
                                <span class="subchannel-name">${sub.name}</span>
                                ${sub.subscribers ? `<span class="subchannel-subs">${sub.subscribers}</span>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 그룹 설명 표시
        const groupDescHtml = isGroup && channel.groupDescription
            ? `<p class="group-description">${channel.groupDescription}</p>`
            : '';

        return `
            <section class="channel-section ${isGroup ? 'is-group-channel' : ''}" id="channel-${channel.id}" data-channel-id="${channel.id}">
                <div class="channel-section-header">
                    <div class="channel-section-top">
                        <div class="channel-section-info">
                            ${logoHtml}
                            ${isGroup ? '<span class="channel-group-badge">그룹</span>' : ''}
                        </div>
                    </div>
                    ${groupDescHtml}
                    ${subChannelsHtml}
                </div>
                ${videosHtml}
            </section>
        `;
    }).join('');

    // Initialize Swipers after DOM is ready
    setTimeout(() => {
        initChannelSwipers();
    }, 100);
}

/**
 * Initialize Channel Swipers
 */
function initChannelSwipers() {
    const channels = PortfolioData.getChannels();

    channels.forEach(channel => {
        const swiperEl = document.querySelector(`.channel-swiper-${channel.id}`);
        if (!swiperEl) return;

        // 슬라이드 개수 확인
        const slideCount = swiperEl.querySelectorAll('.swiper-slide').length;

        new Swiper(`.channel-swiper-${channel.id}`, {
            slidesPerView: 1.2,
            spaceBetween: 20,
            grabCursor: true,
            // 슬라이드가 충분할 때만 loop 활성화
            loop: slideCount > 4,
            autoplay: slideCount > 1 ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            } : false,
            // 부드러운 CSS 전환 사용
            cssMode: false,
            // 스크롤 중 autoplay 일시정지
            watchSlidesProgress: true,
            // 레이아웃 재계산 방지
            watchOverflow: true,
            // 부드러운 전환 효과
            speed: 500,
            effect: 'slide',
            navigation: {
                prevEl: `.channel-swiper-prev-${channel.id}`,
                nextEl: `.channel-swiper-next-${channel.id}`,
            },
            pagination: {
                el: `.channel-swiper-pagination-${channel.id}`,
                clickable: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
            on: {
                // 스크롤 중 autoplay 일시정지
                init: function(swiper) {
                    let scrollTimeout;
                    window.addEventListener('scroll', () => {
                        if (swiper.autoplay && swiper.autoplay.running) {
                            swiper.autoplay.stop();
                        }
                        clearTimeout(scrollTimeout);
                        scrollTimeout = setTimeout(() => {
                            if (swiper.autoplay && !swiper.autoplay.running && slideCount > 1) {
                                swiper.autoplay.start();
                            }
                        }, 300);
                    }, { passive: true });
                }
            }
        });
    });
}

/**
 * Initialize Tab Navigation
 */
function initTabNavigation() {
    const tabs = document.querySelectorAll('.channel-tab');
    const sections = document.querySelectorAll('.channel-section');

    // Click handler for tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll spy - update active tab on scroll
    // 현재 화면에 가장 많이 보이는 섹션을 활성화
    let currentActiveId = null;

    const updateActiveTab = () => {
        let maxVisibleSection = null;
        let maxVisibleArea = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 화면에 보이는 영역 계산
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewportHeight, rect.bottom);
            const visibleArea = Math.max(0, visibleBottom - visibleTop);

            if (visibleArea > maxVisibleArea) {
                maxVisibleArea = visibleArea;
                maxVisibleSection = section;
            }
        });

        if (maxVisibleSection) {
            const channelId = maxVisibleSection.dataset.channelId;

            // 이전과 같으면 업데이트 안 함
            if (currentActiveId === channelId) return;
            currentActiveId = channelId;

            // Update active tab
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.channelId === channelId) {
                    tab.classList.add('active');
                    // Scroll tab into view if needed
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            });
        }
    };

    // 스크롤 이벤트에 throttle 적용
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            updateActiveTab();
            scrollTimeout = null;
        }, 100);
    }, { passive: true });

    // 초기 로드 시 실행
    updateActiveTab();

    // Handle URL hash on page load
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
}

/**
 * Initialize Back to Top Button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/**
 * Load Footer
 */
function loadFooter() {
    const settings = PortfolioData.getSiteSettings();
    const copyrightEl = document.getElementById('footer-copyright');

    if (copyrightEl && settings.footerText) {
        copyrightEl.textContent = settings.footerText;
    }
}
