/**
 * Admin Panel Controller
 */

const AdminPanel = {
    currentSection: 'profile',

    // 초기화
    init() {
        PortfolioData.init();
        this.setupNavigation();
        this.loadAllData();
        this.setupImagePreviews();
    },

    // 이미지 미리보기 설정
    setupImagePreviews() {
        // 프로필 이미지 미리보기
        const profileImage = document.getElementById('profile-image');
        if (profileImage) {
            profileImage.addEventListener('input', () => {
                this.updatePreview('profile-image', profileImage.value);
            });
            // 초기 로드 시 미리보기
            if (profileImage.value) {
                this.updatePreview('profile-image', profileImage.value);
            }
        }
    },

    // 미리보기 업데이트
    updatePreview(inputId, src) {
        const previewContainer = document.getElementById(inputId + '-preview');
        if (!previewContainer) return;

        if (!src) {
            previewContainer.classList.remove('active');
            previewContainer.innerHTML = '';
            return;
        }

        const isVideo = /\.(mp4|webm|mov|avi)$/i.test(src) || src.includes('video');

        previewContainer.classList.add('active');
        if (isVideo) {
            previewContainer.innerHTML = `
                <video src="${src}" controls muted style="max-width:100%; max-height:200px;"></video>
                <div class="preview-info">${src}</div>
            `;
        } else {
            previewContainer.innerHTML = `
                <img src="${src}" alt="Preview" onerror="this.style.display='none'">
                <div class="preview-info">${src}</div>
            `;
        }
    },

    // 파일 업로드 처리
    handleFileUpload(input, targetInputId, folder) {
        const file = input.files[0];
        if (!file) return;

        // 파일 타입에 따라 폴더 자동 결정
        let targetFolder = folder;
        if (folder === 'auto') {
            targetFolder = file.type.startsWith('video/') ? 'videos' : 'images';
        }

        // 파일명 생성 (URL-safe, 원본명 기반)
        const safeName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9가-힣._-]/g, '_');
        const filePath = `assets/${targetFolder}/${safeName}`;

        // FileReader로 Base64 읽기 (미리보기용)
        const reader = new FileReader();
        reader.onload = (e) => {
            // 입력 필드에 경로 설정
            const targetInput = document.getElementById(targetInputId);
            if (targetInput) {
                targetInput.value = filePath;
            }

            // 미리보기 표시
            this.updatePreview(targetInputId, e.target.result);

            // 실제 파일 저장 (로컬 스토리지에 Base64로 저장)
            this.saveUploadedFile(filePath, e.target.result, file.type);

            this.showToast(`파일이 업로드되었습니다: ${safeName}`);
        };

        reader.onerror = () => {
            this.showToast('파일 읽기 실패', true);
        };

        if (file.type.startsWith('video/')) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsDataURL(file);
        }
    },

    // 업로드된 파일 저장 (LocalStorage)
    saveUploadedFile(path, dataUrl, mimeType) {
        try {
            const uploads = JSON.parse(localStorage.getItem('portfolio_uploads') || '{}');
            uploads[path] = {
                data: dataUrl,
                type: mimeType,
                uploadedAt: new Date().toISOString()
            };
            localStorage.setItem('portfolio_uploads', JSON.stringify(uploads));
        } catch (e) {
            console.warn('파일 저장 실패 (용량 초과 가능):', e);
            this.showToast('파일이 너무 큽니다. 더 작은 파일을 사용하세요.', true);
        }
    },

    // 업로드된 파일 가져오기
    getUploadedFile(path) {
        const uploads = JSON.parse(localStorage.getItem('portfolio_uploads') || '{}');
        return uploads[path] || null;
    },

    // 네비게이션 설정
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // URL 해시 확인
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            this.switchSection(hash);
        }
    },

    // 섹션 전환
    switchSection(section) {
        // 네비게이션 업데이트
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === section) {
                item.classList.add('active');
            }
        });

        // 섹션 표시
        document.querySelectorAll('.admin-section').forEach(sec => {
            sec.classList.remove('active');
        });
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        this.currentSection = section;
        window.location.hash = section;
    },

    // 모든 데이터 로드
    loadAllData() {
        this.loadProfile();
        this.loadHeroSlides();
        this.loadWorks();
        this.loadStats();
        this.loadContact();
        this.loadTogether();
        this.loadSettings();
        this.loadCategories();
        this.loadHeroContentSettings();
        this.loadTypography();
        this.loadChannels();
        this.loadChannelSettings();
        this.loadVisitors();
    },

    // 프로필 로드
    loadProfile() {
        const profile = PortfolioData.getProfile();
        const skills = PortfolioData.getSkills();

        document.getElementById('profile-name').value = profile.name || '';
        document.getElementById('profile-nameEn').value = profile.nameEn || '';
        document.getElementById('profile-role').value = profile.role || '';
        document.getElementById('profile-location').value = profile.location || '';
        document.getElementById('profile-image').value = profile.image || '';
        document.getElementById('profile-description').value =
            Array.isArray(profile.description) ? profile.description.join('\n') : profile.description || '';
        document.getElementById('profile-skills').value = skills.join(', ');

        // 이미지 미리보기
        if (profile.image) {
            this.showImagePreview('profile-image', profile.image);
        }
    },

    // 이미지 미리보기 표시
    showImagePreview(inputId, src) {
        // 업로드된 파일인지 확인
        const uploaded = this.getUploadedFile(src);
        const displaySrc = uploaded ? uploaded.data : src;
        this.updatePreview(inputId, displaySrc);
    },

    // 프로필 저장
    saveProfile() {
        const description = document.getElementById('profile-description').value;
        const skillsInput = document.getElementById('profile-skills').value;

        const profileData = {
            name: document.getElementById('profile-name').value,
            nameEn: document.getElementById('profile-nameEn').value,
            role: document.getElementById('profile-role').value,
            location: document.getElementById('profile-location').value,
            image: document.getElementById('profile-image').value,
            description: description.split('\n').filter(line => line.trim())
        };

        const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);

        PortfolioData.updateProfile(profileData);
        PortfolioData.updateSkills(skills);

        this.showToast('프로필이 저장되었습니다.');
    },

    // 히어로 슬라이드 로드
    loadHeroSlides() {
        const slides = PortfolioData.getHeroSlides();
        const container = document.getElementById('hero-slides-list');

        container.innerHTML = slides.map(slide => `
            <div class="slide-item" data-id="${slide.id}">
                <div class="slide-item-preview">
                    ${slide.type === 'video'
                        ? `<video src="${slide.src}" muted></video>`
                        : `<img src="${slide.src}" alt="">`}
                </div>
                <div class="slide-item-info">
                    <div class="slide-item-type">${slide.type.toUpperCase()}</div>
                    <div class="slide-item-src">${slide.src}</div>
                </div>
                <div class="slide-item-actions">
                    <button class="btn-edit" onclick="AdminPanel.editHeroSlide(${slide.id})">수정</button>
                    <button class="btn-delete" onclick="AdminPanel.deleteHeroSlide(${slide.id})">삭제</button>
                </div>
            </div>
        `).join('');
    },

    // 히어로 슬라이드 추가 모달
    addHeroSlide() {
        document.getElementById('hero-modal-title').textContent = '슬라이드 추가';
        document.getElementById('hero-id').value = '';
        document.getElementById('hero-type').value = 'video';
        document.getElementById('hero-src').value = '';
        document.getElementById('hero-poster').value = '';
        document.getElementById('hero-title').value = '';
        document.getElementById('hero-subtitle').value = '';
        document.getElementById('hero-modal').classList.add('active');
    },

    // 히어로 슬라이드 수정 모달
    editHeroSlide(id) {
        const slides = PortfolioData.getHeroSlides();
        const slide = slides.find(s => s.id === id);
        if (!slide) return;

        document.getElementById('hero-modal-title').textContent = '슬라이드 수정';
        document.getElementById('hero-id').value = slide.id;
        document.getElementById('hero-type').value = slide.type;
        document.getElementById('hero-src').value = slide.src;
        document.getElementById('hero-poster').value = slide.poster || '';
        document.getElementById('hero-title').value = slide.title || '';
        document.getElementById('hero-subtitle').value = slide.subtitle || '';
        document.getElementById('hero-modal').classList.add('active');
    },

    // 히어로 슬라이드 저장
    saveHeroSlide() {
        const id = document.getElementById('hero-id').value;
        const slideData = {
            type: document.getElementById('hero-type').value,
            src: document.getElementById('hero-src').value,
            poster: document.getElementById('hero-poster').value,
            title: document.getElementById('hero-title').value,
            subtitle: document.getElementById('hero-subtitle').value
        };

        if (id) {
            PortfolioData.updateHeroSlide(parseInt(id), slideData);
        } else {
            PortfolioData.addHeroSlide(slideData);
        }

        this.closeHeroModal();
        this.loadHeroSlides();
        this.showToast('슬라이드가 저장되었습니다.');
    },

    // 히어로 슬라이드 삭제
    deleteHeroSlide(id) {
        if (confirm('이 슬라이드를 삭제하시겠습니까?')) {
            PortfolioData.deleteHeroSlide(id);
            this.loadHeroSlides();
            this.showToast('슬라이드가 삭제되었습니다.');
        }
    },

    closeHeroModal() {
        document.getElementById('hero-modal').classList.remove('active');
    },

    // 작품 로드
    loadWorks() {
        const works = PortfolioData.getWorks();
        const container = document.getElementById('works-list');

        container.innerHTML = works.map(work => `
            <div class="work-card" data-id="${work.id}">
                <div class="work-card-image">
                    ${work.thumbnail
                        ? `<img src="${work.thumbnail}" alt="${work.title}" onerror="this.style.display='none'">`
                        : ''}
                    <div class="placeholder">No Image</div>
                    ${work.featured ? '<span class="work-card-featured">FEATURED</span>' : ''}
                </div>
                <div class="work-card-body">
                    <div class="work-card-category">${work.categoryLabel}</div>
                    <h4 class="work-card-title">${work.title}</h4>
                    <p class="work-card-desc">${work.description}</p>
                    <div class="work-card-actions">
                        <button class="btn-edit" onclick="AdminPanel.editWork(${work.id})">수정</button>
                        <button class="btn-delete" onclick="AdminPanel.deleteWork(${work.id})">삭제</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 작품 추가 모달
    showWorkModal() {
        this.loadCategoryOptions();
        document.getElementById('work-modal-title').textContent = '작품 추가';
        document.getElementById('work-id').value = '';
        document.getElementById('work-category').value = '';
        document.getElementById('work-categoryLabel').value = '';
        document.getElementById('work-title').value = '';
        document.getElementById('work-description').value = '';
        document.getElementById('work-thumbnail').value = '';
        document.getElementById('work-videoUrl').value = '';
        document.getElementById('work-link').value = '#';
        document.getElementById('work-featured').checked = false;
        document.getElementById('work-modal').classList.add('active');
    },

    // 작품 수정 모달
    editWork(id) {
        const work = PortfolioData.getWorkById(id);
        if (!work) return;

        this.loadCategoryOptions();
        document.getElementById('work-modal-title').textContent = '작품 수정';
        document.getElementById('work-id').value = work.id;
        document.getElementById('work-category').value = work.category;
        document.getElementById('work-categoryLabel').value = work.categoryLabel;
        document.getElementById('work-title').value = work.title;
        document.getElementById('work-description').value = work.description;
        document.getElementById('work-thumbnail').value = work.thumbnail;
        document.getElementById('work-videoUrl').value = work.videoUrl || '';
        document.getElementById('work-link').value = work.link;
        document.getElementById('work-featured').checked = work.featured;
        document.getElementById('work-modal').classList.add('active');
    },

    // 카테고리 옵션 로드 (텍스트 입력으로 변경됨)
    loadCategoryOptions() {
        // 더 이상 select가 아닌 text input 사용
    },

    // 작품 저장
    saveWork() {
        const id = document.getElementById('work-id').value;
        const workData = {
            category: document.getElementById('work-category').value,
            categoryLabel: document.getElementById('work-categoryLabel').value,
            title: document.getElementById('work-title').value,
            description: document.getElementById('work-description').value,
            thumbnail: document.getElementById('work-thumbnail').value,
            videoUrl: document.getElementById('work-videoUrl').value,
            link: document.getElementById('work-link').value,
            featured: document.getElementById('work-featured').checked
        };

        if (id) {
            PortfolioData.updateWork(parseInt(id), workData);
        } else {
            PortfolioData.addWork(workData);
        }

        this.closeWorkModal();
        this.loadWorks();
        this.showToast('작품이 저장되었습니다.');
    },

    // 작품 삭제
    deleteWork(id) {
        if (confirm('이 작품을 삭제하시겠습니까?')) {
            PortfolioData.deleteWork(id);
            this.loadWorks();
            this.showToast('작품이 삭제되었습니다.');
        }
    },

    closeWorkModal() {
        document.getElementById('work-modal').classList.remove('active');
    },

    // 통계 로드
    loadStats() {
        const stats = PortfolioData.getStats();
        document.getElementById('stats-projects').value = stats.projects || 0;
        document.getElementById('stats-clients').value = stats.clients || 0;
        document.getElementById('stats-years').value = stats.years || 0;
    },

    // 통계 저장
    saveStats() {
        const statsData = {
            projects: parseInt(document.getElementById('stats-projects').value) || 0,
            clients: parseInt(document.getElementById('stats-clients').value) || 0,
            years: parseInt(document.getElementById('stats-years').value) || 0
        };

        PortfolioData.updateStats(statsData);
        this.showToast('통계가 저장되었습니다.');
    },

    // 연락처 로드
    loadContact() {
        const contact = PortfolioData.getContact();
        document.getElementById('contact-email').value = contact.email || '';
        document.getElementById('contact-phone').value = contact.phone || '';
        document.getElementById('contact-youtube').value = contact.youtube || '';
        document.getElementById('contact-instagram').value = contact.instagram || '';
        document.getElementById('contact-vimeo').value = contact.vimeo || '';
        document.getElementById('contact-behance').value = contact.behance || '';
    },

    // 연락처 저장
    saveContact() {
        const contactData = {
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            youtube: document.getElementById('contact-youtube').value,
            instagram: document.getElementById('contact-instagram').value,
            vimeo: document.getElementById('contact-vimeo').value,
            behance: document.getElementById('contact-behance').value
        };

        PortfolioData.updateContact(contactData);
        this.showToast('연락처가 저장되었습니다.');
    },

    // Together 로드
    loadTogether() {
        const together = PortfolioData.getTogether() || { intro: '', members: [] };
        document.getElementById('together-intro').value = together.intro || '';
        this.renderTogetherMembers(together.members || []);
    },

    // Together 멤버 렌더링
    renderTogetherMembers(members) {
        const container = document.getElementById('together-members-list');
        if (!container) return;

        container.innerHTML = members.map((member, index) => `
            <div class="together-member-item" data-id="${member.id || index}">
                <div class="member-header">
                    <span class="member-number">#${index + 1}</span>
                    <button class="btn-remove" onclick="AdminPanel.removeTogetherMember(${member.id || index})">삭제</button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>이름</label>
                        <input type="text" class="member-name" value="${member.name || ''}" placeholder="멤버 이름">
                    </div>
                    <div class="form-group">
                        <label>역할/직책</label>
                        <input type="text" class="member-role" value="${member.role || ''}" placeholder="역할 / 직책">
                    </div>
                    <div class="form-group full-width">
                        <label>프로필 사진</label>
                        <div class="file-input-group">
                            <input type="text" class="member-photo" value="${member.photo || ''}" placeholder="이미지 경로 또는 URL">
                            <input type="file" accept="image/*" onchange="AdminPanel.handleTogetherPhotoUpload(this, ${member.id || index})" style="display:none" id="together-photo-${member.id || index}">
                            <button class="btn-upload" onclick="document.getElementById('together-photo-${member.id || index}').click()">업로드</button>
                        </div>
                    </div>
                    <div class="form-group full-width">
                        <label>소개글</label>
                        <textarea class="member-bio" rows="3" placeholder="간단한 소개글">${member.bio || ''}</textarea>
                    </div>
                    <div class="form-group full-width">
                        <label>스킬 (쉼표로 구분)</label>
                        <input type="text" class="member-skills" value="${(member.skills || []).join(', ')}" placeholder="스킬1, 스킬2, 스킬3">
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Together 멤버 추가
    addTogetherMember() {
        const together = PortfolioData.getTogether() || { intro: '', members: [] };
        const newId = together.members.length > 0 ? Math.max(...together.members.map(m => m.id || 0)) + 1 : 1;

        together.members.push({
            id: newId,
            name: '',
            role: '',
            bio: '',
            photo: '',
            skills: []
        });

        PortfolioData.updateTogether(together);
        this.renderTogetherMembers(together.members);
        this.showToast('새 멤버가 추가되었습니다.');
    },

    // Together 멤버 삭제
    removeTogetherMember(id) {
        if (!confirm('이 멤버를 삭제하시겠습니까?')) return;

        const together = PortfolioData.getTogether() || { intro: '', members: [] };
        together.members = together.members.filter(m => m.id !== id);

        PortfolioData.updateTogether(together);
        this.renderTogetherMembers(together.members);
        this.showToast('멤버가 삭제되었습니다.');
    },

    // Together 사진 업로드
    handleTogetherPhotoUpload(input, memberId) {
        if (!input.files || !input.files[0]) return;

        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const memberItem = input.closest('.together-member-item');
            const photoInput = memberItem.querySelector('.member-photo');
            photoInput.value = e.target.result;
            this.showToast('사진이 업로드되었습니다.');
        };

        reader.readAsDataURL(file);
    },

    // Together 저장
    saveTogether() {
        const intro = document.getElementById('together-intro').value;
        const memberItems = document.querySelectorAll('.together-member-item');
        const members = [];

        memberItems.forEach((item, index) => {
            const id = parseInt(item.dataset.id) || index + 1;
            const skillsText = item.querySelector('.member-skills').value;

            members.push({
                id: id,
                name: item.querySelector('.member-name').value,
                role: item.querySelector('.member-role').value,
                bio: item.querySelector('.member-bio').value,
                photo: item.querySelector('.member-photo').value,
                skills: skillsText ? skillsText.split(',').map(s => s.trim()).filter(s => s) : []
            });
        });

        PortfolioData.updateTogether({ intro, members });
        this.showToast('함께하는 사람들 정보가 저장되었습니다.');
    },

    // 사이트 설정 로드
    loadSettings() {
        const settings = PortfolioData.getSiteSettings();
        document.getElementById('settings-siteName').value = settings.siteName || '';
        document.getElementById('settings-heroTitle').value =
            Array.isArray(settings.heroTitle) ? settings.heroTitle.join('\n') : settings.heroTitle || '';
        document.getElementById('settings-heroSubtitle').value = settings.heroSubtitle || '';
        document.getElementById('settings-showreelUrl').value = settings.showreelUrl || '';
        document.getElementById('settings-showreelTitle').value = settings.showreelTitle || '';
        document.getElementById('settings-footerText').value = settings.footerText || '';
    },

    // 사이트 설정 저장
    saveSettings() {
        const heroTitle = document.getElementById('settings-heroTitle').value;

        const settingsData = {
            siteName: document.getElementById('settings-siteName').value,
            heroTitle: heroTitle.split('\n').filter(line => line.trim()),
            heroSubtitle: document.getElementById('settings-heroSubtitle').value,
            showreelUrl: document.getElementById('settings-showreelUrl').value,
            showreelTitle: document.getElementById('settings-showreelTitle').value,
            footerText: document.getElementById('settings-footerText').value
        };

        PortfolioData.updateSiteSettings(settingsData);
        this.showToast('설정이 저장되었습니다.');
    },

    // 카테고리 로드
    loadCategories() {
        const categories = PortfolioData.getCategories();
        const container = document.getElementById('categories-list');

        container.innerHTML = categories.map(cat => `
            <div class="category-item" data-id="${cat.id}">
                <span>${cat.label}</span>
                ${cat.id !== 'all'
                    ? `<button onclick="AdminPanel.deleteCategory('${cat.id}')">&times;</button>`
                    : ''}
            </div>
        `).join('');
    },

    // 카테고리 추가
    addCategory() {
        const id = prompt('카테고리 ID (영문, 소문자):');
        if (!id) return;

        const label = prompt('카테고리 라벨:');
        if (!label) return;

        PortfolioData.addCategory({ id: id.toLowerCase(), label: label.toUpperCase() });
        this.loadCategories();
        this.showToast('카테고리가 추가되었습니다.');
    },

    // 카테고리 삭제
    deleteCategory(id) {
        if (confirm('이 카테고리를 삭제하시겠습니까?')) {
            PortfolioData.deleteCategory(id);
            this.loadCategories();
            this.showToast('카테고리가 삭제되었습니다.');
        }
    },

    // Hero Content 설정 로드
    loadHeroContentSettings() {
        const settings = PortfolioData.getHeroContentSettings();
        if (!settings) return;

        const bgType = document.getElementById('hero-content-bgType');
        const overlay = document.getElementById('hero-content-overlay');
        const effect = document.getElementById('hero-content-effect');
        const src = document.getElementById('hero-content-src');

        if (bgType) bgType.value = settings.backgroundType || 'none';
        if (overlay) {
            overlay.value = (settings.overlayOpacity || 0.8) * 100;
            document.getElementById('hero-content-overlay-value').textContent = overlay.value + '%';
        }
        if (effect) effect.value = settings.titleEffect || 'none';
        if (src) src.value = settings.backgroundSrc || '';

        this.toggleHeroContentBg();
        this.previewHeroContent();
    },

    // Hero Content 배경 타입 토글
    toggleHeroContentBg() {
        const bgType = document.getElementById('hero-content-bgType').value;
        const srcGroup = document.getElementById('hero-content-src-group');
        srcGroup.style.display = bgType === 'none' ? 'none' : 'block';
    },

    // 오버레이 미리보기 업데이트
    updateOverlayPreview() {
        const value = document.getElementById('hero-content-overlay').value;
        document.getElementById('hero-content-overlay-value').textContent = value + '%';
        this.previewHeroContent();
    },

    // Hero Content 미리보기
    previewHeroContent() {
        const bgType = document.getElementById('hero-content-bgType').value;
        const src = document.getElementById('hero-content-src').value;
        const overlay = document.getElementById('hero-content-overlay').value / 100;
        const effect = document.getElementById('hero-content-effect').value;

        const previewBg = document.getElementById('preview-hero-bg');
        const previewOverlay = document.getElementById('preview-hero-overlay');
        const previewTitle = document.getElementById('preview-hero-title');

        // 배경 설정
        if (bgType === 'none' || !src) {
            previewBg.innerHTML = '';
        } else if (bgType === 'video') {
            const mediaSrc = this.getUploadedFile(src)?.data || src;
            previewBg.innerHTML = `<video src="${mediaSrc}" autoplay muted loop playsinline></video>`;
        } else if (bgType === 'image') {
            const mediaSrc = this.getUploadedFile(src)?.data || src;
            previewBg.innerHTML = `<img src="${mediaSrc}" alt="">`;
        }

        // 오버레이 설정
        previewOverlay.style.background = `rgba(10, 10, 10, ${overlay})`;

        // 타이틀 효과 설정
        previewTitle.className = 'preview-title';
        if (effect !== 'none') {
            previewTitle.classList.add('effect-' + effect);
        }
    },

    // Hero Content 설정 저장
    saveHeroContentSettings() {
        const settings = {
            backgroundType: document.getElementById('hero-content-bgType').value,
            backgroundSrc: document.getElementById('hero-content-src').value,
            overlayOpacity: document.getElementById('hero-content-overlay').value / 100,
            titleEffect: document.getElementById('hero-content-effect').value
        };

        PortfolioData.updateHeroContentSettings(settings);
        this.showToast('히어로 콘텐츠 설정이 저장되었습니다.');
    },

    // 타이포그래피 로드
    loadTypography() {
        const typo = PortfolioData.getTypography();
        if (!typo) return;

        // Hero Title
        const heroTitle = typo.heroTitle || {};
        this.setSelectValue('typo-hero-font', heroTitle.fontFamily || "'Bebas Neue', 'Montserrat', sans-serif");
        document.getElementById('typo-hero-size').value = parseFloat(heroTitle.fontSize) || 10;
        this.setSelectValue('typo-hero-weight', heroTitle.fontWeight || '400');
        document.getElementById('typo-hero-spacing').value = parseInt(heroTitle.letterSpacing) || 5;
        document.getElementById('typo-hero-line').value = parseFloat(heroTitle.lineHeight) || 0.95;

        // Hero Subtitle
        const subtitle = typo.heroSubtitle || {};
        this.setSelectValue('typo-subtitle-font', subtitle.fontFamily || "'Noto Sans KR', sans-serif");
        document.getElementById('typo-subtitle-size').value = parseFloat(subtitle.fontSize) || 1.2;
        this.setSelectValue('typo-subtitle-weight', subtitle.fontWeight || '300');
        document.getElementById('typo-subtitle-spacing').value = parseInt(subtitle.letterSpacing) || 2;

        // Greeting Text
        const greeting = typo.greetingText || {};
        this.setSelectValue('typo-greeting-font', greeting.fontFamily || "'Rocket', 'Noto Sans KR', sans-serif");
        document.getElementById('typo-greeting-size').value = parseFloat(greeting.fontSize) || 3;
        this.setSelectValue('typo-greeting-weight', greeting.fontWeight || 'normal');
        document.getElementById('typo-greeting-spacing').value = parseInt(greeting.letterSpacing) || 0;
        document.getElementById('typo-greeting-line').value = parseFloat(greeting.lineHeight) || 1.8;

        this.updateTypographyPreview();
    },

    // select 값 설정 헬퍼
    setSelectValue(id, value) {
        const select = document.getElementById(id);
        if (!select) return;
        for (let option of select.options) {
            if (option.value === value) {
                select.value = value;
                return;
            }
        }
    },

    // 타이포그래피 미리보기 업데이트
    updateTypographyPreview() {
        const previewTitle = document.getElementById('preview-typo-title');
        const previewSubtitle = document.getElementById('preview-typo-subtitle');
        const previewGreeting = document.getElementById('preview-typo-greeting');

        if (previewTitle) {
            previewTitle.style.fontFamily = document.getElementById('typo-hero-font').value;
            previewTitle.style.fontSize = document.getElementById('typo-hero-size').value + 'rem';
            previewTitle.style.fontWeight = document.getElementById('typo-hero-weight').value;
            previewTitle.style.letterSpacing = document.getElementById('typo-hero-spacing').value + 'px';
            previewTitle.style.lineHeight = document.getElementById('typo-hero-line').value;
        }

        if (previewSubtitle) {
            previewSubtitle.style.fontFamily = document.getElementById('typo-subtitle-font').value;
            previewSubtitle.style.fontSize = document.getElementById('typo-subtitle-size').value + 'rem';
            previewSubtitle.style.fontWeight = document.getElementById('typo-subtitle-weight').value;
            previewSubtitle.style.letterSpacing = document.getElementById('typo-subtitle-spacing').value + 'px';
        }

        if (previewGreeting) {
            previewGreeting.style.fontFamily = document.getElementById('typo-greeting-font').value;
            previewGreeting.style.fontSize = document.getElementById('typo-greeting-size').value + 'rem';
            previewGreeting.style.fontWeight = document.getElementById('typo-greeting-weight').value;
            previewGreeting.style.letterSpacing = document.getElementById('typo-greeting-spacing').value + 'px';
            previewGreeting.style.lineHeight = document.getElementById('typo-greeting-line').value;
        }
    },

    // 타이포그래피 저장
    saveTypography() {
        const typography = {
            heroTitle: {
                fontFamily: document.getElementById('typo-hero-font').value,
                fontSize: document.getElementById('typo-hero-size').value + 'rem',
                fontWeight: document.getElementById('typo-hero-weight').value,
                letterSpacing: document.getElementById('typo-hero-spacing').value + 'px',
                lineHeight: document.getElementById('typo-hero-line').value
            },
            heroSubtitle: {
                fontFamily: document.getElementById('typo-subtitle-font').value,
                fontSize: document.getElementById('typo-subtitle-size').value + 'rem',
                fontWeight: document.getElementById('typo-subtitle-weight').value,
                letterSpacing: document.getElementById('typo-subtitle-spacing').value + 'px',
                lineHeight: '1.6'
            },
            greetingText: {
                fontFamily: document.getElementById('typo-greeting-font').value,
                fontSize: document.getElementById('typo-greeting-size').value + 'rem',
                fontWeight: document.getElementById('typo-greeting-weight').value,
                letterSpacing: document.getElementById('typo-greeting-spacing').value + 'px',
                lineHeight: document.getElementById('typo-greeting-line').value
            }
        };

        PortfolioData.updateTypography(typography);
        this.showToast('타이포그래피 설정이 저장되었습니다.');
    },

    // 데이터 내보내기
    exportData() {
        const data = PortfolioData.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('데이터가 내보내기 되었습니다.');
    },

    // 데이터 가져오기
    importData(input) {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (PortfolioData.importData(e.target.result)) {
                this.loadAllData();
                this.showToast('데이터를 가져왔습니다.');
            } else {
                this.showToast('데이터 가져오기 실패', true);
            }
        };
        reader.readAsText(file);
        input.value = '';
    },

    // 데이터 초기화
    resetData() {
        if (confirm('모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            PortfolioData.resetToDefault();
            this.loadAllData();
            this.showToast('데이터가 초기화되었습니다.');
        }
    },

    // 토스트 메시지
    showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast' + (isError ? ' error' : '');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    // ========== 채널 관리 ==========

    // 채널 목록 로드
    loadChannels() {
        const channels = PortfolioData.getChannels();
        const container = document.getElementById('channels-admin-list');
        if (!container) return;

        if (!channels || channels.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">등록된 채널이 없습니다.</p>';
            return;
        }

        container.innerHTML = channels.map((channel, index) => `
            <div class="channel-admin-card" data-id="${channel.id}">
                <div class="channel-admin-header">
                    <div class="channel-admin-info">
                        <div class="channel-order-controls">
                            <button class="btn-order-up" onclick="AdminPanel.moveChannelUp(${index})" ${index === 0 ? 'disabled' : ''} title="위로 이동">▲</button>
                            <button class="btn-order-down" onclick="AdminPanel.moveChannelDown(${index})" ${index === channels.length - 1 ? 'disabled' : ''} title="아래로 이동">▼</button>
                        </div>
                        ${channel.logo
                            ? `<img src="${channel.logo}" alt="${channel.name}" class="channel-admin-logo">`
                            : `<div class="channel-admin-logo-placeholder">${channel.name.charAt(0)}</div>`
                        }
                        <div>
                            <h4 class="channel-admin-name">
                                ${channel.name}
                                ${channel.isGroup ? '<span class="channel-group-badge">그룹</span>' : ''}
                            </h4>
                            <p class="channel-admin-desc">${channel.description || ''}</p>
                            ${channel.isGroup && channel.subChannels?.length > 0 ? `<p class="channel-admin-desc" style="color: var(--admin-accent);">하위 채널 ${channel.subChannels.length}개</p>` : ''}
                        </div>
                    </div>
                    <div class="channel-admin-actions">
                        <button class="btn-edit" onclick="AdminPanel.editChannel(${channel.id})">수정</button>
                        <button class="btn-delete" onclick="AdminPanel.deleteChannel(${channel.id})">삭제</button>
                    </div>
                </div>
                <div class="channel-videos-admin">
                    <div class="channel-videos-header">
                        <span>영상 목록 (${channel.videos ? channel.videos.length : 0}개)</span>
                        <button class="btn-add-small" onclick="AdminPanel.showChannelVideoModal(${channel.id})">+ 영상 추가</button>
                    </div>
                    <div class="channel-videos-list">
                        ${channel.videos && channel.videos.length > 0
                            ? channel.videos.map(video => `
                                <div class="channel-video-item" data-video-id="${video.id}">
                                    <div class="channel-video-thumb">
                                        ${video.thumbnail
                                            ? `<img src="${video.thumbnail}" alt="${video.title}">`
                                            : `<div class="thumb-placeholder">📹</div>`
                                        }
                                    </div>
                                    <div class="channel-video-info">
                                        <span class="channel-video-title">${video.title}</span>
                                        <span class="channel-video-date">${video.date || ''}</span>
                                    </div>
                                    <div class="channel-video-actions">
                                        <button onclick="AdminPanel.editChannelVideo(${channel.id}, ${video.id})">수정</button>
                                        <button onclick="AdminPanel.deleteChannelVideo(${channel.id}, ${video.id})">삭제</button>
                                    </div>
                                </div>
                            `).join('')
                            : '<p class="no-videos">등록된 영상이 없습니다.</p>'
                        }
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 채널 설정 로드
    loadChannelSettings() {
        const settings = PortfolioData.getChannelSettings();
        if (!settings) return;

        const intervalInput = document.getElementById('channel-autoSlideInterval');
        const showCountInput = document.getElementById('channel-showVideoCount');

        if (intervalInput) intervalInput.value = settings.autoSlideInterval || 3000;
        if (showCountInput) showCountInput.checked = settings.showVideoCount !== false;
    },

    // 채널 설정 저장
    saveChannelSettings() {
        const settings = {
            autoSlideInterval: parseInt(document.getElementById('channel-autoSlideInterval').value) || 3000,
            showVideoCount: document.getElementById('channel-showVideoCount').checked
        };

        PortfolioData.updateChannelSettings(settings);
        this.showToast('채널 설정이 저장되었습니다.');
    },

    // 채널 추가 모달 표시
    showChannelModal() {
        document.getElementById('channel-modal-title').textContent = '채널 추가';
        document.getElementById('channel-id').value = '';
        document.getElementById('channel-name').value = '';
        document.getElementById('channel-description').value = '';
        document.getElementById('channel-logo').value = '';
        document.getElementById('channel-subscribers').value = '';
        document.getElementById('channel-link').value = '';
        document.getElementById('channel-youtube-url').value = '';
        // 그룹 옵션 초기화
        document.getElementById('channel-isGroup').checked = false;
        document.getElementById('channel-groupDescription').value = '';
        document.getElementById('subchannels-list').innerHTML = '';
        document.getElementById('group-options').style.display = 'none';
        document.getElementById('channel-modal').classList.add('active');
    },

    // 채널 수정 모달 표시
    editChannel(id) {
        const channel = PortfolioData.getChannelById(id);
        if (!channel) return;

        document.getElementById('channel-modal-title').textContent = '채널 수정';
        document.getElementById('channel-id').value = channel.id;
        document.getElementById('channel-name').value = channel.name || '';
        document.getElementById('channel-description').value = channel.description || '';
        document.getElementById('channel-logo').value = channel.logo || '';
        document.getElementById('channel-subscribers').value = channel.subscribers || '';
        document.getElementById('channel-link').value = channel.link || '';
        document.getElementById('channel-youtube-url').value = channel.link || '';

        // 그룹 옵션 로드
        const isGroup = channel.isGroup || false;
        document.getElementById('channel-isGroup').checked = isGroup;
        document.getElementById('channel-groupDescription').value = channel.groupDescription || '';
        document.getElementById('group-options').style.display = isGroup ? 'block' : 'none';

        // 하위 채널 로드
        const subchannelsList = document.getElementById('subchannels-list');
        subchannelsList.innerHTML = '';
        if (channel.subChannels && channel.subChannels.length > 0) {
            channel.subChannels.forEach((sub, idx) => {
                this.addSubChannelRow(sub.name, sub.subscribers);
            });
        }

        document.getElementById('channel-modal').classList.add('active');
    },

    // 채널 모달 닫기
    closeChannelModal() {
        document.getElementById('channel-modal').classList.remove('active');
    },

    // 채널 저장
    saveChannel() {
        const id = document.getElementById('channel-id').value;
        const subscribersValue = document.getElementById('channel-subscribers').value.trim();
        const isGroup = document.getElementById('channel-isGroup').checked;

        const channelData = {
            name: document.getElementById('channel-name').value,
            description: document.getElementById('channel-description').value,
            logo: document.getElementById('channel-logo').value,
            subscribers: subscribersValue || null,
            link: document.getElementById('channel-link').value || '',
            isGroup: isGroup,
            groupDescription: isGroup ? document.getElementById('channel-groupDescription').value : '',
            subChannels: isGroup ? this.getSubChannelsFromForm() : []
        };

        if (!channelData.name) {
            this.showToast('채널 이름을 입력하세요.', true);
            return;
        }

        let result;
        if (id) {
            result = PortfolioData.updateChannel(parseInt(id), channelData);
        } else {
            result = PortfolioData.addChannel(channelData);
        }

        // 저장 실패 시 에러 표시
        if (result && result.success === false) {
            this.showToast('⚠️ 저장 실패: ' + (result.error || 'localStorage 용량 초과 가능'), true);
            console.error('채널 저장 실패:', result.error);
            return;
        }

        this.closeChannelModal();
        this.loadChannels();
        this.showToast('채널이 저장되었습니다.');
    },

    // 그룹 옵션 토글
    toggleGroupOptions() {
        const isGroup = document.getElementById('channel-isGroup').checked;
        document.getElementById('group-options').style.display = isGroup ? 'block' : 'none';
    },

    // 하위 채널 행 추가
    addSubChannelRow(name = '', subscribers = '') {
        const list = document.getElementById('subchannels-list');
        const row = document.createElement('div');
        row.className = 'subchannel-row';
        row.innerHTML = `
            <input type="text" class="subchannel-name" placeholder="채널 이름" value="${name}">
            <input type="text" class="subchannel-subs" placeholder="구독자 수" value="${subscribers}">
            <button type="button" class="btn-remove-subchannel" onclick="this.parentElement.remove()">×</button>
        `;
        list.appendChild(row);
    },

    // 폼에서 하위 채널 데이터 수집
    getSubChannelsFromForm() {
        const rows = document.querySelectorAll('.subchannel-row');
        const subChannels = [];
        rows.forEach(row => {
            const name = row.querySelector('.subchannel-name').value.trim();
            const subscribers = row.querySelector('.subchannel-subs').value.trim();
            if (name) {
                subChannels.push({ name, subscribers });
            }
        });
        return subChannels;
    },

    // 채널 삭제
    deleteChannel(id) {
        if (confirm('이 채널과 모든 영상을 삭제하시겠습니까?')) {
            PortfolioData.deleteChannel(id);
            this.loadChannels();
            this.showToast('채널이 삭제되었습니다.');
        }
    },

    // 채널 순서 위로 이동
    moveChannelUp(index) {
        if (index <= 0) return;
        const channels = PortfolioData.getChannels();
        if (!channels || channels.length < 2) return;

        // 배열에서 순서 교환
        [channels[index], channels[index - 1]] = [channels[index - 1], channels[index]];

        // 저장
        PortfolioData.saveChannels(channels);
        this.loadChannels();
        this.showToast('채널 순서가 변경되었습니다.');
    },

    // 채널 순서 아래로 이동
    moveChannelDown(index) {
        const channels = PortfolioData.getChannels();
        if (!channels || index >= channels.length - 1) return;

        // 배열에서 순서 교환
        [channels[index], channels[index + 1]] = [channels[index + 1], channels[index]];

        // 저장
        PortfolioData.saveChannels(channels);
        this.loadChannels();
        this.showToast('채널 순서가 변경되었습니다.');
    },

    // 채널 영상 추가 모달 표시
    showChannelVideoModal(channelId) {
        document.getElementById('channel-video-modal-title').textContent = '영상 추가';
        document.getElementById('channel-video-channel-id').value = channelId;
        document.getElementById('channel-video-id').value = '';
        document.getElementById('channel-video-title').value = '';
        document.getElementById('channel-video-youtubeUrl').value = '';
        document.getElementById('channel-video-thumbnail').value = '';
        document.getElementById('channel-video-modal').classList.add('active');
    },

    // 채널 영상 수정 모달 표시
    editChannelVideo(channelId, videoId) {
        const channel = PortfolioData.getChannelById(channelId);
        if (!channel || !channel.videos) return;

        const video = channel.videos.find(v => v.id === videoId);
        if (!video) return;

        document.getElementById('channel-video-modal-title').textContent = '영상 수정';
        document.getElementById('channel-video-channel-id').value = channelId;
        document.getElementById('channel-video-id').value = video.id;
        document.getElementById('channel-video-title').value = video.title || '';
        document.getElementById('channel-video-youtubeUrl').value = video.youtubeUrl || '';
        document.getElementById('channel-video-thumbnail').value = video.thumbnail || '';
        document.getElementById('channel-video-modal').classList.add('active');
    },

    // 채널 영상 모달 닫기
    closeChannelVideoModal() {
        document.getElementById('channel-video-modal').classList.remove('active');
    },

    // YouTube URL에서 제목과 썸네일 자동 추출
    async autoFillYoutubeInfo() {
        const urlInput = document.getElementById('channel-video-youtubeUrl');
        const thumbInput = document.getElementById('channel-video-thumbnail');
        const titleInput = document.getElementById('channel-video-title');
        const url = urlInput.value;

        if (!url) {
            this.showToast('YouTube URL을 먼저 입력하세요.', true);
            return;
        }

        // YouTube video ID 추출
        let videoId = null;

        // youtube.com/shorts/VIDEO_ID (쇼츠)
        const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
        if (shortsMatch) videoId = shortsMatch[1];

        // youtu.be/VIDEO_ID
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (shortMatch) videoId = shortMatch[1];

        // youtube.com/watch?v=VIDEO_ID
        const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        if (longMatch) videoId = longMatch[1];

        // youtube.com/embed/VIDEO_ID
        const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) videoId = embedMatch[1];

        if (!videoId) {
            this.showToast('YouTube URL 형식을 확인하세요.', true);
            return;
        }

        // 썸네일 자동 입력
        thumbInput.value = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        // 제목 가져오기 (noembed API 사용)
        try {
            this.showToast('영상 정보를 가져오는 중...');
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
            const data = await response.json();

            if (data.title) {
                titleInput.value = data.title;
                this.showToast('제목과 썸네일이 자동 입력되었습니다.');
            } else {
                this.showToast('썸네일만 입력되었습니다. 제목은 직접 입력해주세요.');
            }
        } catch (error) {
            console.error('YouTube 정보 가져오기 실패:', error);
            this.showToast('썸네일만 입력되었습니다. 제목은 직접 입력해주세요.');
        }
    },

    // YouTube 채널 정보 가져오기
    async fetchYoutubeChannelInfo() {
        const urlInput = document.getElementById('channel-youtube-url');
        let url = urlInput.value.trim();

        if (!url) {
            this.showToast('YouTube 채널 URL을 입력하세요.', true);
            return;
        }

        // URL 디코딩 (인코딩된 한글 등 처리)
        try {
            url = decodeURIComponent(url);
        } catch (e) {
            // 이미 디코딩된 경우 무시
        }

        // 채널 핸들/ID 추출 (한글 및 유니코드 지원)
        let channelHandle = null;

        // @handle 형식 (한글 포함)
        const handleMatch = url.match(/youtube\.com\/@([^\/\?\&]+)/);
        if (handleMatch) channelHandle = handleMatch[1];

        // /channel/UC... 형식
        const channelMatch = url.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/);
        if (channelMatch) channelHandle = channelMatch[1];

        // /c/name 형식 (한글 포함)
        const cMatch = url.match(/youtube\.com\/c\/([^\/\?\&]+)/);
        if (cMatch) channelHandle = cMatch[1];

        // /user/name 형식
        const userMatch = url.match(/youtube\.com\/user\/([^\/\?\&]+)/);
        if (userMatch) channelHandle = userMatch[1];

        if (!channelHandle) {
            this.showToast('YouTube 채널 URL 형식을 확인하세요.', true);
            return;
        }

        // 채널 이름 필드에 핸들 입력
        document.getElementById('channel-name').value = channelHandle;

        // 채널 링크 설정 (원본 URL 유지)
        document.getElementById('channel-link').value = urlInput.value.trim();

        this.showToast(`채널 "${channelHandle}" 정보가 입력되었습니다. 로고는 직접 업로드해주세요.`);
    },

    // 채널 영상 저장
    saveChannelVideo() {
        const channelId = parseInt(document.getElementById('channel-video-channel-id').value);
        const videoId = document.getElementById('channel-video-id').value;
        const youtubeUrl = document.getElementById('channel-video-youtubeUrl').value;
        const videoData = {
            title: document.getElementById('channel-video-title').value,
            youtubeUrl: youtubeUrl,
            thumbnail: document.getElementById('channel-video-thumbnail').value
        };

        if (!videoData.youtubeUrl) {
            this.showToast('YouTube URL을 입력하세요.', true);
            return;
        }

        if (videoId) {
            PortfolioData.updateVideoInChannel(channelId, parseInt(videoId), videoData);
        } else {
            PortfolioData.addVideoToChannel(channelId, videoData);
        }

        this.closeChannelVideoModal();
        this.loadChannels();
        this.showToast('영상이 저장되었습니다.');
    },

    // 채널 영상 삭제
    deleteChannelVideo(channelId, videoId) {
        if (confirm('이 영상을 삭제하시겠습니까?')) {
            PortfolioData.deleteVideoFromChannel(channelId, videoId);
            this.loadChannels();
            this.showToast('영상이 삭제되었습니다.');
        }
    }
,

    // ========== 배포용 내보내기 기능 ==========

    // 배포 전 검증
    validateForDeploy() {
        const data = PortfolioData.getData();
        const uploads = JSON.parse(localStorage.getItem('portfolio_uploads') || '{}');
        const issues = [];

        // 재귀적으로 모든 경로 검사
        const checkPaths = (obj, path = '') => {
            if (!obj || typeof obj !== 'object') return;

            for (const key in obj) {
                const value = obj[key];
                const currentPath = path ? `${path}.${key}` : key;

                if (typeof value === 'string' && value.includes('assets/') && !value.startsWith('data:')) {
                    // Base64도 없고, 알려진 파일도 아니면 경고
                    const hasBase64 = uploads[value] && uploads[value].data;
                    const mappedPath = this.mapToRealFile(value);
                    const isKnownFile = this.knownAssetFiles.includes(mappedPath);

                    if (!hasBase64 && !isKnownFile) {
                        issues.push({
                            path: currentPath,
                            original: value,
                            mapped: mappedPath,
                            status: 'warning'
                        });
                    }
                } else if (Array.isArray(value)) {
                    value.forEach((item, idx) => checkPaths(item, `${currentPath}[${idx}]`));
                } else if (typeof value === 'object') {
                    checkPaths(value, currentPath);
                }
            }
        };

        checkPaths(data);
        return issues;
    },

    // 배포용 내보내기 모달 열기
    exportForDeploy() {
        const data = PortfolioData.getData();

        // 1. 배포 전 검증
        const issues = this.validateForDeploy();
        if (issues.length > 0) {
            console.warn('=== 배포 전 검증 결과 ===');
            issues.forEach(issue => {
                console.warn(`${issue.path}: "${issue.original}" → "${issue.mapped}"`);
            });
        }

        // 2. 데이터 정리
        const cleanedData = this.cleanDataForDeploy(data);

        // 3. defaultData 형식으로 변환
        const outputCode = this.formatAsDefaultData(cleanedData);

        const codeOutput = document.getElementById('deploy-code-output');
        if (codeOutput) {
            codeOutput.textContent = outputCode;
        }

        // 4. 경고 표시
        const warningEl = document.getElementById('deploy-warnings');
        if (warningEl) {
            if (issues.length > 0) {
                warningEl.innerHTML = `<div class="deploy-warning">⚠️ ${issues.length}개 파일 경로 확인 필요 (콘솔 참조)</div>`;
                warningEl.style.display = 'block';
            } else {
                warningEl.innerHTML = '<div class="deploy-success">✅ 모든 파일 경로 확인됨</div>';
                warningEl.style.display = 'block';
            }
        }

        document.getElementById('deploy-modal').classList.add('active');
    },

    // 배포 모달 닫기
    closeDeployModal() {
        document.getElementById('deploy-modal').classList.remove('active');
    },

    // 타임스탬프 접두사 제거: "assets/images/1769198585646_file.jpg" → "assets/images/file.jpg"
    cleanFilePath(filePath) {
        if (!filePath || typeof filePath !== 'string') return filePath;
        // assets/ 경로에서 타임스탬프 접두사(숫자_) 제거
        return filePath.replace(/(assets\/(?:images|videos|videos\/works)\/)(\d{10,}_)/, '$1');
    },

    // 알려진 실제 파일 목록 (assets 폴더에 있는 파일들 - 2026-01-30 기준)
    knownAssetFiles: [
        // images
        'assets/images/channels4_profile.jpg',
        'assets/images/channels4_profile_1.jpg',
        'assets/images/channels4_profile_2.jpg',
        'assets/images/channels4_profile_3.jpg',
        'assets/images/channels4_profile_4.jpg',
        'assets/images/channels4_profile (1).jpg',
        'assets/images/channels4_profile (2).jpg',
        'assets/images/channels4_profile (3).jpg',
        'assets/images/channels4_profile (4).jpg',
        'assets/images/unnamed.jpg',
        'assets/images/unnamed_1.jpg',
        'assets/images/unnamed (1).jpg',
        'assets/images/이다해.jpg',
        'assets/images/8a895711-f980-4ba9-979d-df21bf7c5298_rwc_0x0x639x852x640.png',
        'assets/images/Snipaste_2026-01-26_14-26-46.png',
        'assets/images/profile.jpg',
        // logos
        'assets/logos/channels4_profile.jpg',
        'assets/logos/channels4_profile (1).jpg',
        'assets/logos/channels4_profile (2).jpg',
        'assets/logos/channels4_profile (3).jpg',
        'assets/logos/channels4_profile (4).jpg',
        'assets/logos/channels4_profile (5).jpg',
        'assets/logos/unnamed.jpg',
        'assets/logos/unnamed (1).jpg',
        'assets/logos/이다해.jpg',
        'assets/logos/8a895711-f980-4ba9-979d-df21bf7c5298_rwc_0x0x639x852x640.png',
        // videos
        'assets/videos/hero-video.mp4',
        'assets/videos/works/수정05_DJ.mp4'
    ],

    // 경로를 실제 파일에 매핑
    mapToRealFile(path) {
        if (!path || typeof path !== 'string') return path;
        if (path.startsWith('data:') || path.startsWith('http')) return path;

        // 1. 타임스탬프 제거: "1769198585646_channels4_profile.jpg" → "channels4_profile.jpg"
        let cleanPath = path.replace(/(assets\/(?:images|videos|videos\/works)\/)(\d{10,}_)/, '$1');

        // 2. 특수문자 정리: "2----01-24" → "2---01-24" 등
        cleanPath = cleanPath.replace(/----+/g, '-').replace(/--+/g, '-');

        // 3. 알려진 파일 목록에서 매칭 시도
        const fileName = cleanPath.split('/').pop();
        for (const knownFile of this.knownAssetFiles) {
            const knownFileName = knownFile.split('/').pop();
            // 파일명이 포함되거나 유사하면 매칭
            if (knownFileName === fileName ||
                knownFileName.includes(fileName.replace(/[-_]/g, '')) ||
                fileName.includes(knownFileName.replace(/[-_]/g, '').split('.')[0])) {
                return knownFile;
            }
        }

        return cleanPath;
    },

    // 배포용 데이터 준비: Base64 임베드 또는 실제 파일 경로로 변환
    cleanDataForDeploy(data) {
        const cleaned = JSON.parse(JSON.stringify(data)); // 깊은 복사
        let uploads = {};
        try {
            uploads = JSON.parse(localStorage.getItem('portfolio_uploads') || '{}');
        } catch (e) {}

        const warnings = [];

        // 재귀적으로 경로 정리 및 Base64 치환
        const processData = (obj, path = '') => {
            if (!obj || typeof obj !== 'object') return;

            for (const key in obj) {
                const value = obj[key];
                const currentPath = path ? `${path}.${key}` : key;

                if (typeof value === 'string' && !value.startsWith('data:') && !value.startsWith('http')) {
                    // 1. Base64가 있으면 임베드
                    if (uploads[value] && uploads[value].data) {
                        obj[key] = uploads[value].data;
                    }
                    // 2. assets/ 경로면 실제 파일로 매핑
                    else if (value.includes('assets/')) {
                        const mappedPath = this.mapToRealFile(value);
                        obj[key] = mappedPath;

                        // 경고: 매핑된 파일이 알려진 목록에 없으면
                        if (!this.knownAssetFiles.includes(mappedPath) && !mappedPath.startsWith('data:')) {
                            warnings.push(`⚠️ ${currentPath}: "${value}" → "${mappedPath}" (파일 존재 확인 필요)`);
                        }
                    }
                } else if (Array.isArray(value)) {
                    value.forEach((item, idx) => processData(item, `${currentPath}[${idx}]`));
                } else if (typeof value === 'object') {
                    processData(value, currentPath);
                }
            }
        };

        processData(cleaned);

        // 경고 출력
        if (warnings.length > 0) {
            console.warn('=== 배포 경고 ===');
            warnings.forEach(w => console.warn(w));
            console.warn('위 파일들이 assets 폴더에 실제로 존재하는지 확인하세요!');
        }

        return cleaned;
    },

    // ========== 파일 동기화 기능 ==========

    // 모든 이미지 경로를 실제 파일로 동기화
    syncFilePaths() {
        const data = PortfolioData.getData();
        let syncCount = 0;
        let issues = [];

        // 재귀적으로 모든 경로 수정
        const processData = (obj, path = '') => {
            if (!obj || typeof obj !== 'object') return;

            for (const key in obj) {
                const value = obj[key];
                const currentPath = path ? `${path}.${key}` : key;

                if (typeof value === 'string' && value.includes('assets/') && !value.startsWith('data:') && !value.startsWith('http')) {
                    const originalValue = value;
                    const mappedPath = this.mapToRealFile(value);

                    if (originalValue !== mappedPath) {
                        obj[key] = mappedPath;
                        syncCount++;
                        console.log(`✅ 동기화: ${currentPath}`);
                        console.log(`   ${originalValue} → ${mappedPath}`);
                    }

                    // 매핑 후에도 알려진 파일이 아니면 경고
                    if (!this.knownAssetFiles.includes(mappedPath)) {
                        issues.push({ path: currentPath, value: mappedPath });
                    }
                } else if (Array.isArray(value)) {
                    value.forEach((item, idx) => processData(item, `${currentPath}[${idx}]`));
                } else if (typeof value === 'object') {
                    processData(value, currentPath);
                }
            }
        };

        processData(data);

        // 저장
        PortfolioData.saveData(data);

        // 결과 출력
        if (syncCount > 0) {
            this.showToast(`✅ ${syncCount}개 경로가 동기화되었습니다`);
            console.log(`=== 동기화 완료: ${syncCount}개 경로 수정됨 ===`);
        } else {
            this.showToast('모든 경로가 이미 동기화되어 있습니다');
        }

        if (issues.length > 0) {
            console.warn('=== 확인 필요 ===');
            issues.forEach(issue => {
                console.warn(`⚠️ ${issue.path}: "${issue.value}" - assets 폴더에 파일 존재 여부 확인`);
            });
            alert(`⚠️ ${issues.length}개 파일이 assets 폴더에 없을 수 있습니다.\n\nF12 콘솔에서 상세 내용을 확인하세요.\n\n해당 파일들을 assets/images 폴더에 추가해주세요.`);
        }

        // UI 새로고침
        this.loadAllData();
    },

    // 알려진 파일 목록 업데이트 (실제 assets 폴더 스캔 - 브라우저에서는 불가능하므로 수동 목록)
    updateKnownFiles(fileList) {
        this.knownAssetFiles = fileList;
        this.showToast('파일 목록이 업데이트되었습니다');
    },

    // defaultData 형식으로 포맷팅
    formatAsDefaultData(data) {
        const jsonStr = JSON.stringify(data, null, 4);

        // 들여쓰기 추가 (defaultData 내부이므로)
        const indented = jsonStr.split('\n').map((line, index) => {
            if (index === 0) return '    defaultData: ' + line;
            return '    ' + line;
        }).join('\n');

        return `// data.js의 PortfolioData 객체 내부에 있는 defaultData를 아래 내용으로 교체하세요.
// 파일 위치: js/data.js
// 교체 위치: PortfolioData = { defaultData: { ... } }

${indented},

// 위 내용을 defaultData: { ... } 부분에 붙여넣으세요.`;
    },

    // 코드 복사
    copyDeployCode() {
        const codeOutput = document.getElementById('deploy-code-output');
        const btn = document.querySelector('.btn-copy-code');

        if (codeOutput) {
            navigator.clipboard.writeText(codeOutput.textContent).then(() => {
                btn.textContent = '✅ 복사됨!';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.textContent = '📋 코드 복사';
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                // 폴백: 선택 후 복사
                const range = document.createRange();
                range.selectNode(codeOutput);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();

                btn.textContent = '✅ 복사됨!';
                setTimeout(() => btn.textContent = '📋 코드 복사', 2000);
            });
        }
    },

    // data.js 파일 다운로드
    downloadDeployFile() {
        const data = PortfolioData.getData();

        // 디버그: 현재 localStorage 데이터 확인
        console.log('=== 배포용 내보내기 디버그 ===');
        console.log('1. profile.image 원본:', data.profile?.image);
        console.log('2. youtubePortfolio 개수:', data.youtubePortfolio?.length);

        const cleanedData = this.cleanDataForDeploy(data);

        console.log('3. profile.image 정리 후:', cleanedData.profile?.image);
        console.log('4. youtubePortfolio 정리 후 개수:', cleanedData.youtubePortfolio?.length);

        // 경로 변환 예시 출력
        if (data.youtubePortfolio?.length > 0) {
            console.log('5. 첫번째 유튜브 썸네일 원본:', data.youtubePortfolio[0]?.thumbnail);
            console.log('6. 첫번째 유튜브 썸네일 정리 후:', cleanedData.youtubePortfolio[0]?.thumbnail);
        }

        // 완전한 data.js 파일 생성
        const fullFile = this.generateFullDataJs(cleanedData);

        const blob = new Blob([fullFile], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('data.js 파일이 다운로드되었습니다. F12 콘솔에서 디버그 정보 확인!');
    },

    // ========== 방문기록 관리 ==========

    loadVisitors() {
        const myIP = localStorage.getItem('portfolio_my_ip') || '';
        const ipInput = document.getElementById('my-ip-address');
        if (ipInput) ipInput.value = myIP;

        this.renderVisitorTable();
    },

    getVisitorLogs() {
        try {
            return JSON.parse(localStorage.getItem('portfolio_visitors') || '[]');
        } catch (e) {
            return [];
        }
    },

    renderVisitorTable() {
        const logs = this.getVisitorLogs();
        const myIP = localStorage.getItem('portfolio_my_ip') || '';
        const filtered = myIP ? logs.filter(l => l.ip !== myIP) : logs;

        // 통계 업데이트
        const today = new Date().toISOString().slice(0, 10);
        const uniqueIPs = new Set(filtered.map(l => l.ip));
        const todayLogs = filtered.filter(l => l.timestamp && l.timestamp.slice(0, 10) === today);
        const mobileLogs = filtered.filter(l => l.device === 'Mobile');

        const totalEl = document.getElementById('visitor-total');
        const uniqueEl = document.getElementById('visitor-unique');
        const todayEl = document.getElementById('visitor-today');
        const mobileEl = document.getElementById('visitor-device-mobile');

        if (totalEl) totalEl.textContent = filtered.length;
        if (uniqueEl) uniqueEl.textContent = uniqueIPs.size;
        if (todayEl) todayEl.textContent = todayLogs.length;
        if (mobileEl) mobileEl.textContent = mobileLogs.length;

        // 테이블 렌더링
        const tbody = document.getElementById('visitor-table-body');
        if (!tbody) return;

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="visitor-empty">방문기록이 없습니다.</td></tr>';
            return;
        }

        tbody.innerHTML = filtered.map(log => {
            const date = log.timestamp ? new Date(log.timestamp) : null;
            const timeStr = date ? date.toLocaleString('ko-KR', {
                month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            }) : '-';
            const referrer = log.referrer || 'direct';
            const shortRef = referrer === 'direct' ? 'Direct' :
                referrer.length > 30 ? referrer.slice(0, 30) + '...' : referrer;

            return `<tr>
                <td>${timeStr}</td>
                <td><span class="ip-badge">${log.ip || '-'}</span></td>
                <td>${log.location || '-'}</td>
                <td>${log.browser || '-'}</td>
                <td>${log.device || '-'}</td>
                <td>${log.screenSize || '-'}</td>
                <td title="${referrer}">${shortRef}</td>
            </tr>`;
        }).join('');
    },

    refreshVisitors() {
        this.renderVisitorTable();
        this.showToast('방문기록이 새로고침되었습니다.');
    },

    clearVisitors() {
        if (!confirm('모든 방문기록을 삭제하시겠습니까?')) return;
        localStorage.removeItem('portfolio_visitors');
        this.renderVisitorTable();
        this.showToast('방문기록이 삭제되었습니다.');
    },

    async detectMyIP() {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
            const data = await res.json();
            const ipInput = document.getElementById('my-ip-address');
            if (ipInput) {
                ipInput.value = data.ip || '';
                ipInput.readOnly = true;
            }
            localStorage.setItem('portfolio_my_ip', data.ip || '');
            this.renderVisitorTable();
            this.showToast(`내 IP가 감지되었습니다: ${data.ip}`);
        } catch (e) {
            this.showToast('IP 감지에 실패했습니다.', true);
        }
    },

    enableMyIPEdit() {
        const ipInput = document.getElementById('my-ip-address');
        if (ipInput) {
            ipInput.readOnly = false;
            ipInput.focus();
        }
    },

    saveMyIP() {
        const ipInput = document.getElementById('my-ip-address');
        if (!ipInput) return;
        const ip = ipInput.value.trim();
        localStorage.setItem('portfolio_my_ip', ip);
        ipInput.readOnly = true;
        this.renderVisitorTable();
        this.showToast(ip ? `내 IP가 저장되었습니다: ${ip}` : '내 IP 설정이 해제되었습니다.');
    },

    // 완전한 data.js 파일 생성
    generateFullDataJs(cleanedData) {
        // 배포할 때마다 버전 자동 증가 (타임스탬프 기반)
        const deployVersion = Date.now();

        return `/**
 * Portfolio Data Management System
 * LocalStorage 기반 데이터 저장 및 관리
 *
 * 배포용으로 내보낸 파일입니다.
 * 생성일: ${new Date().toLocaleString('ko-KR')}
 */

// 데이터 버전 - 배포할 때마다 자동 증가하여 모든 방문자의 캐시가 초기화됩니다
const DATA_VERSION = ${deployVersion};

const PortfolioData = {
    // 기본 데이터 구조 (배포용 데이터 포함)
    defaultData: ${JSON.stringify(cleanedData, null, 8).split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')},

    // LocalStorage 키
    STORAGE_KEY: 'portfolio_data',

    // 데이터 초기화 (버전 체크 포함)
    init() {
        const savedVersion = localStorage.getItem('portfolio_data_version');
        const currentVersion = typeof DATA_VERSION !== 'undefined' ? DATA_VERSION : 0;

        // 버전이 다르면 캐시 초기화 (새로운 배포 데이터 적용)
        if (savedVersion !== String(currentVersion)) {
            console.log('데이터 버전 업데이트: ' + savedVersion + ' → ' + currentVersion);
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem('portfolio_uploads');
            localStorage.setItem('portfolio_data_version', String(currentVersion));
        }

        if (!localStorage.getItem(this.STORAGE_KEY)) {
            this.saveData(this.defaultData);
        }
        return this.getData();
    },

    // 전체 데이터 가져오기 (에러 핸들링 포함)
    getData() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                if (parsed && typeof parsed === 'object') {
                    return parsed;
                }
            }
        } catch (e) {
            console.error('데이터 로드 실패, 기본값 사용:', e);
        }
        return this.defaultData;
    },

    // 전체 데이터 저장 (에러 핸들링 포함)
    saveData(data) {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(this.STORAGE_KEY, json);
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (!saved || saved.length !== json.length) {
                console.error('데이터 저장 검증 실패: 저장된 크기 불일치');
                return false;
            }
            return true;
        } catch (e) {
            console.error('데이터 저장 실패:', e);
            return false;
        }
    },

    // 특정 섹션 데이터 가져오기
    getSection(section) {
        const data = this.getData();
        return data[section] || null;
    },

    // 특정 섹션 데이터 업데이트
    updateSection(section, newData) {
        const data = this.getData();
        data[section] = { ...data[section], ...newData };
        this.saveData(data);
        return data[section];
    },

    // 프로필 관련
    getProfile() { return this.getSection('profile'); },
    updateProfile(profileData) { return this.updateSection('profile', profileData); },

    // 연락처 관련
    getContact() { return this.getSection('contact'); },
    updateContact(contactData) { return this.updateSection('contact', contactData); },

    // 투게더 관련
    getTogether() { return this.getSection('together'); },
    updateTogether(togetherData) { return this.updateSection('together', togetherData); },

    // 통계 관련
    getStats() { return this.getSection('stats'); },
    updateStats(statsData) { return this.updateSection('stats', statsData); },

    // 스킬 관련
    getSkills() { return this.getSection('skills'); },
    updateSkills(skills) {
        const data = this.getData();
        data.skills = skills;
        this.saveData(data);
        return skills;
    },

    // 히어로 슬라이드 관련
    getHeroSlides() { return this.getSection('heroSlides'); },
    addHeroSlide(slide) {
        const data = this.getData();
        const newId = Math.max(...data.heroSlides.map(s => s.id), 0) + 1;
        slide.id = newId;
        data.heroSlides.push(slide);
        this.saveData(data);
        return slide;
    },
    updateHeroSlide(id, slideData) {
        const data = this.getData();
        const index = data.heroSlides.findIndex(s => s.id === id);
        if (index !== -1) {
            data.heroSlides[index] = { ...data.heroSlides[index], ...slideData };
            this.saveData(data);
            return data.heroSlides[index];
        }
        return null;
    },
    deleteHeroSlide(id) {
        const data = this.getData();
        data.heroSlides = data.heroSlides.filter(s => s.id !== id);
        this.saveData(data);
    },

    // 작품 관련
    getWorks() { return this.getSection('works'); },
    getWorkById(id) {
        const works = this.getWorks();
        return works.find(w => w.id === id) || null;
    },
    getWorksByCategory(category) {
        const works = this.getWorks();
        if (category === 'all') return works;
        return works.filter(w => w.category === category);
    },
    addWork(work) {
        const data = this.getData();
        const newId = Math.max(...data.works.map(w => w.id), 0) + 1;
        work.id = newId;
        work.order = data.works.length + 1;
        data.works.push(work);
        this.saveData(data);
        return work;
    },
    updateWork(id, workData) {
        const data = this.getData();
        const index = data.works.findIndex(w => w.id === id);
        if (index !== -1) {
            data.works[index] = { ...data.works[index], ...workData };
            this.saveData(data);
            return data.works[index];
        }
        return null;
    },
    deleteWork(id) {
        const data = this.getData();
        data.works = data.works.filter(w => w.id !== id);
        this.saveData(data);
    },
    reorderWorks(orderedIds) {
        const data = this.getData();
        orderedIds.forEach((id, index) => {
            const work = data.works.find(w => w.id === id);
            if (work) work.order = index + 1;
        });
        data.works.sort((a, b) => a.order - b.order);
        this.saveData(data);
    },

    // 카테고리 관련
    getCategories() { return this.getSection('categories'); },
    addCategory(category) {
        const data = this.getData();
        data.categories.push(category);
        this.saveData(data);
        return category;
    },
    deleteCategory(id) {
        const data = this.getData();
        data.categories = data.categories.filter(c => c.id !== id);
        this.saveData(data);
    },

    // 사이트 설정 관련
    getSiteSettings() { return this.getSection('siteSettings'); },
    updateSiteSettings(settings) { return this.updateSection('siteSettings', settings); },

    // Hero Content 설정 관련
    getHeroContentSettings() {
        return this.getSection('heroContentSettings') || this.defaultData.heroContentSettings;
    },
    updateHeroContentSettings(settings) { return this.updateSection('heroContentSettings', settings); },

    // 타이포그래피 설정 관련
    getTypography() { return this.getSection('typography') || this.defaultData.typography; },
    updateTypography(typography) { return this.updateSection('typography', typography); },

    // 채널 관련
    getChannels() { return this.getSection('channels') || this.defaultData.channels; },
    getChannelById(id) {
        const channels = this.getChannels();
        return channels.find(c => c.id === id) || null;
    },
    addChannel(channel) {
        const data = this.getData();
        if (!data.channels) data.channels = [];
        const newId = data.channels.length > 0 ? Math.max(...data.channels.map(c => c.id)) + 1 : 1;
        channel.id = newId;
        channel.order = data.channels.length + 1;
        if (!channel.videos) channel.videos = [];
        data.channels.push(channel);
        const saved = this.saveData(data);
        if (!saved) return { success: false, error: '저장 실패 (용량 초과 가능)' };
        return { success: true, channel: channel };
    },
    updateChannel(id, channelData) {
        const data = this.getData();
        if (!data.channels) return { success: false, error: 'channels 데이터 없음' };
        const index = data.channels.findIndex(c => c.id === id);
        if (index !== -1) {
            data.channels[index] = { ...data.channels[index], ...channelData };
            const saved = this.saveData(data);
            if (!saved) return { success: false, error: '저장 실패 (용량 초과 가능)' };
            return { success: true, channel: data.channels[index] };
        }
        return { success: false, error: '채널을 찾을 수 없음' };
    },
    deleteChannel(id) {
        const data = this.getData();
        if (!data.channels) return;
        data.channels = data.channels.filter(c => c.id !== id);
        this.saveData(data);
    },
    saveChannels(channels) {
        const data = this.getData();
        data.channels = channels;
        this.saveData(data);
    },

    // 채널 비디오 관련
    addVideoToChannel(channelId, video) {
        const data = this.getData();
        const channel = data.channels?.find(c => c.id === channelId);
        if (channel) {
            if (!channel.videos) channel.videos = [];
            const newId = channel.videos.length > 0 ? Math.max(...channel.videos.map(v => v.id)) + 1 : 1;
            video.id = newId;
            channel.videos.push(video);
            this.saveData(data);
            return video;
        }
        return null;
    },
    updateVideoInChannel(channelId, videoId, videoData) {
        const data = this.getData();
        const channel = data.channels?.find(c => c.id === channelId);
        if (channel && channel.videos) {
            const index = channel.videos.findIndex(v => v.id === videoId);
            if (index !== -1) {
                channel.videos[index] = { ...channel.videos[index], ...videoData };
                this.saveData(data);
                return channel.videos[index];
            }
        }
        return null;
    },
    deleteVideoFromChannel(channelId, videoId) {
        const data = this.getData();
        const channel = data.channels?.find(c => c.id === channelId);
        if (channel && channel.videos) {
            channel.videos = channel.videos.filter(v => v.id !== videoId);
            this.saveData(data);
        }
    },

    // 채널 설정 관련
    getChannelSettings() { return this.getSection('channelSettings') || this.defaultData.channelSettings; },
    updateChannelSettings(settings) { return this.updateSection('channelSettings', settings); },

    // 데이터 초기화 (기본값으로)
    resetToDefault() {
        this.saveData(this.defaultData);
        return this.defaultData;
    },

    // 데이터 내보내기 (JSON)
    exportData() { return JSON.stringify(this.getData(), null, 2); },

    // 데이터 가져오기 (JSON)
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.saveData(data);
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }
};

// 전역으로 사용 가능하도록
window.PortfolioData = PortfolioData;
`;
    }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    AdminPanel.init();
});
