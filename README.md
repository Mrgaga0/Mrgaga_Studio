# Portfolio Website - 사용 설명서

## 파일 구조

```
portfolio/
├── index.html              # 메인 HTML 파일
├── css/
│   └── style.css          # 스타일시트
├── js/
│   └── main.js            # JavaScript 기능
├── assets/
│   ├── videos/
│   │   ├── hero-video.mp4   # 메인 배경 비디오 (여기에 업로드)
│   │   └── showreel.mp4     # 쇼릴 비디오 (선택사항)
│   └── images/
│       ├── profile.jpg      # 프로필 사진
│       ├── work-1.jpg       # 포트폴리오 썸네일 1
│       ├── work-2.jpg       # 포트폴리오 썸네일 2
│       ├── work-3.jpg       # 포트폴리오 썸네일 3
│       ├── work-4.jpg       # 포트폴리오 썸네일 4
│       ├── work-5.jpg       # 포트폴리오 썸네일 5
│       └── work-6.jpg       # 포트폴리오 썸네일 6
└── README.md
```

## 시작하기

### 1. 메인 비디오 추가하기

**가장 중요한 부분!** 메인 화면에 영상이 재생되도록 하려면:

1. 고화질 영상 파일(MP4)을 준비합니다
2. 파일 이름을 `hero-video.mp4`로 변경합니다
3. `assets/videos/` 폴더에 넣습니다

**권장 사양:**
- 형식: MP4 (H.264 코덱)
- 해상도: 1920x1080 또는 그 이상
- 길이: 10-30초 (루프 재생됨)
- 파일 크기: 20MB 이하 권장 (로딩 속도)

**GIF 사용 시:**
CSS에서 `.video-fallback`에 배경 이미지로 설정 가능:
```css
.video-fallback {
    background-image: url('../assets/images/hero-bg.gif');
    background-size: cover;
}
```

### 2. 개인 정보 수정하기

`index.html` 파일을 열어서 다음 내용을 수정하세요:

#### 이름 & 소개
```html
<h3 class="about-name">YOUR NAME</h3>  <!-- 본인 이름으로 변경 -->
<p class="about-role">Video Creator / Motion Designer</p>  <!-- 직함 변경 -->
```

#### 자기소개
```html
<div class="about-description">
    <p>여기에 자기소개를 작성하세요...</p>
</div>
```

#### 통계 수치
```html
<span class="stat-number" data-count="50">0</span>  <!-- 프로젝트 수 -->
<span class="stat-number" data-count="30">0</span>  <!-- 클라이언트 수 -->
<span class="stat-number" data-count="5">0</span>   <!-- 경력 연수 -->
```

#### 스킬 태그
```html
<div class="skill-tags">
    <span class="tag">Premiere Pro</span>
    <!-- 본인 스킬로 변경/추가 -->
</div>
```

#### 연락처
```html
<a href="mailto:your@email.com">your@email.com</a>  <!-- 이메일 -->
<a href="tel:+821012345678">010-1234-5678</a>       <!-- 전화번호 -->
```

#### 소셜 링크
각 소셜 링크의 `href="#"` 부분을 실제 URL로 변경하세요.

### 3. 포트폴리오 작품 추가하기

#### 썸네일 이미지
- `assets/images/` 폴더에 썸네일 이미지 추가
- 권장 크기: 1280x800px (16:10 비율)
- 파일명: work-1.jpg, work-2.jpg 등

#### 작품 정보 수정
```html
<div class="work-item" data-category="video">  <!-- 카테고리: video, motion, commercial -->
    <div class="work-thumbnail">
        <img src="assets/images/work-1.jpg" alt="Project 1">
        <div class="work-overlay">
            <div class="work-info">
                <span class="work-category">VIDEO EDITING</span>
                <h3 class="work-title">프로젝트 제목</h3>
                <p class="work-desc">프로젝트 설명</p>
                <a href="링크" class="work-link">VIEW PROJECT →</a>
            </div>
        </div>
    </div>
</div>
```

### 4. 쇼릴 비디오 추가 (선택)

1. 쇼릴 영상을 `showreel.mp4`로 저장
2. `assets/videos/` 폴더에 넣기

## 사이트 실행하기

### 방법 1: 직접 열기
`index.html` 파일을 브라우저에서 직접 엽니다.

### 방법 2: 로컬 서버 (권장)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx 사용)
npx serve

# VS Code Live Server 확장 사용
```

그 후 브라우저에서 `http://localhost:8000` 접속

## 커스터마이징

### 색상 변경
`css/style.css` 파일의 `:root` 섹션에서:

```css
:root {
    --color-accent: #ff4d4d;           /* 강조 색상 */
    --color-gradient-start: #ff4d4d;   /* 그라데이션 시작 */
    --color-gradient-end: #ff9f43;     /* 그라데이션 끝 */
}
```

### 폰트 변경
HTML의 `<head>`에서 Google Fonts 링크 수정

### 섹션 추가/제거
HTML에서 해당 `<section>` 블록을 복사하거나 삭제

## 주의사항

1. **비디오 파일 크기**: 너무 크면 로딩이 느려집니다
2. **이미지 최적화**: TinyPNG 등으로 압축 권장
3. **모바일 테스트**: 반응형이지만 꼭 테스트해보세요
4. **브라우저 호환성**: 최신 Chrome, Firefox, Safari, Edge 지원

## 배포하기

### GitHub Pages
1. GitHub에 repository 생성
2. 파일 업로드
3. Settings > Pages에서 활성화

### Netlify / Vercel
1. 계정 생성
2. 폴더를 드래그 앤 드롭으로 업로드
3. 자동으로 URL 생성됨

### 일반 웹호스팅
FTP로 모든 파일을 업로드하면 됩니다.

---

문의사항이 있으면 말씀해주세요!
