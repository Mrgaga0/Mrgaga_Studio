/**
 * Portfolio Data Management System
 * LocalStorage 기반 데이터 저장 및 관리
 *
 * 배포용으로 내보낸 파일입니다.
 * 생성일: 2026. 3. 6. 오전 12:06:06
 */

// 데이터 버전 - 배포할 때마다 자동 증가하여 모든 방문자의 캐시가 초기화됩니다
const DATA_VERSION = 1772723166630;

const PortfolioData = {
    // 기본 데이터 구조 (배포용 데이터 포함)
    defaultData: {
            "profile": {
                    "name": "미스터가가_스튜디오_오동진_PD",
                    "nameEn": "Mr.gaga_Studio",
                    "role": "Video Creator / Motion Designer / Producer-Director",
                    "description": [
                            "뉴스 현장부터 드라마 스태프까지의 과정을 거치고",
                            "유튜브 등 영상을 편집한 지",
                            "현재 9년 차 된 오동진 PD라고 합니다",
                            ".",
                            "상단에 전체 포트폴리오 보기 버튼으로",
                            "포트폴리오를 확인해 보실 수 있습니다",
                            ".",
                            "유튜브에 올라가지 않은 영상들은(타 사이트 클래스 영상, 홍보 영상 등등)",
                            "메인 화면에서 종합적으로 확인해 보실 수 있습니다",
                            ".",
                            "양산형 쇼츠 채널을 운영해본 경험이 있습니다 (지금은 운영x)",
                            "왼쪽에 사진은 그 채널의 관리페이지에서 가져왔습니다",
                            ".",
                            "길게 말하는 것보다",
                            "믿고 맡겨 주신만큼 저도 신뢰를 쌓기 위해 최선을 다하며",
                            "만족할 수 있는 작업물로 보답하겠습니다",
                            "감사합니다"
                    ],
                    "image": "assets/images/Snipaste_2026-01-26_14-26-46.png",
                    "location": "Seoul, South Korea"
            },
            "contact": {
                    "email": "djentfive@gmail.com",
                    "phone": "010-6468-8613",
                    "youtube": "#",
                    "instagram": "#",
                    "vimeo": "#",
                    "behance": "#"
            },
            "stats": {
                    "projects": 50,
                    "clients": 30,
                    "years": 5
            },
            "skills": [
                    "Premiere Pro",
                    "After Effects",
                    "Photoshop",
                    "Color Grading",
                    "Light Room",
                    "Audition",
                    "촬영 장비 (조명 마이크 카메라등 필수 장비 보유)"
            ],
            "heroSlides": [
                    {
                            "type": "video",
                            "src": "assets/videos/hero-video.mp4",
                            "poster": "",
                            "title": "",
                            "subtitle": "",
                            "id": 1
                    }
            ],
            "works": [
                    {
                            "category": "",
                            "categoryLabel": "",
                            "title": "홍보영상",
                            "description": "",
                            "thumbnail": "assets/images/_____2026-01-24_061933.png",
                            "videoUrl": "assets/videos/works/__05_DJ.mp4",
                            "link": "#",
                            "featured": false,
                            "id": 1,
                            "order": 1
                    }
            ],
            "categories": [
                    {
                            "id": "all",
                            "label": "ALL"
                    }
            ],
            "siteSettings": {
                    "siteName": "PORTFOLIO",
                    "heroTitle": [
                            "CREATIVE",
                            "VISUAL",
                            "STORYTELLER"
                    ],
                    "heroSubtitle": "영상으로 이야기를 전하는 크리에이터",
                    "showreelUrl": "assets/videos/showreel.mp4",
                    "showreelTitle": "",
                    "showreelSubtitle": "나의 최신 작업들을 모은 쇼릴",
                    "footerText": ""
            },
            "heroContentSettings": {
                    "backgroundType": "none",
                    "backgroundSrc": "",
                    "backgroundPoster": "",
                    "titleEffect": "none",
                    "overlayOpacity": 0.8
            },
            "typography": {
                    "heroTitle": {
                            "fontFamily": "'Bebas Neue', 'Montserrat', sans-serif",
                            "fontSize": "10rem",
                            "fontWeight": "400",
                            "letterSpacing": "5px",
                            "lineHeight": "0.95"
                    },
                    "heroSubtitle": {
                            "fontFamily": "'Noto Sans KR', sans-serif",
                            "fontSize": "1.2rem",
                            "fontWeight": "300",
                            "letterSpacing": "2px",
                            "lineHeight": "1.6"
                    },
                    "greetingText": {
                            "fontFamily": "'Rocket', 'Noto Sans KR', sans-serif",
                            "fontSize": "3rem",
                            "fontWeight": "normal",
                            "letterSpacing": "0px",
                            "lineHeight": "1.8"
                    }
            },
            "channels": [
                    {
                            "id": 1,
                            "name": "효기심",
                            "description": "기획 연출 편집 100%",
                            "logo": "assets/images/channels4_profile.jpg",
                            "videos": [
                                    {
                                            "title": "혼란은 이제 시작입니다. 도와주세요.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=YxcbWHYtxxE",
                                            "thumbnail": "https://img.youtube.com/vi/YxcbWHYtxxE/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "과거 독일과 소름끼치게 똑같은 대한민국(16분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=1s6ayqL76jQ",
                                            "thumbnail": "https://img.youtube.com/vi/1s6ayqL76jQ/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "국가를 지켜야 한다고 했던 독일국민들 (13분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=cc6K2Hn3eyE",
                                            "thumbnail": "https://img.youtube.com/vi/cc6K2Hn3eyE/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "1966년 중국과 비슷한 대한민국 (20분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=9ZYrxteY054",
                                            "thumbnail": "https://img.youtube.com/vi/9ZYrxteY054/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "한국도 베네수엘라처럼 될 수 있다 (16분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=GIYGNTLPuoE",
                                            "thumbnail": "https://img.youtube.com/vi/GIYGNTLPuoE/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "전세계 GDP 3위였던 아르헨티나 (19분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=P2MUSndM0qw",
                                            "thumbnail": "https://img.youtube.com/vi/P2MUSndM0qw/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "본디오빌라도가 예수를 처형한 진짜 이유 (12분 순삭ver.) #효기심94",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=Aa3camRy5UY",
                                            "thumbnail": "https://img.youtube.com/vi/Aa3camRy5UY/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "미국이 초강대국이 되어간 과정과 1,2차세계대전 Full Ver.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=N-mfmiTyUwo",
                                            "thumbnail": "https://img.youtube.com/vi/N-mfmiTyUwo/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "이 영화 아시나요?? (17분 순삭ver.) #효기심106",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=OLidE64dE5Q",
                                            "thumbnail": "https://img.youtube.com/vi/OLidE64dE5Q/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "저렇게 싸웠으니 결과는 뻔했다 (14분 순삭ver.) #효기심104",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=QhUtZC6ccpw",
                                            "thumbnail": "https://img.youtube.com/vi/QhUtZC6ccpw/maxresdefault.jpg",
                                            "id": 10
                                    }
                            ],
                            "order": 1,
                            "link": "https://www.youtube.com/@%ED%9A%A8%EA%B8%B0%EC%8B%AC",
                            "subscribers": "100만"
                    },
                    {
                            "name": "간다효",
                            "description": "기획 연출 편집 80%",
                            "logo": "data:image/jpeg;base64,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",
                            "link": "https://www.youtube.com/channel/UCgOrq46HHPLETItXdQzG0Og",
                            "id": 3,
                            "order": 3,
                            "videos": [
                                    {
                                            "title": "간다효 중국 고대사 (FULL VER.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=rIZFK8rTlIc",
                                            "thumbnail": "https://img.youtube.com/vi/rIZFK8rTlIc/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "미국의 현대사와 2차세계대전 (FULL VER.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=yMli1pUZKDQ",
                                            "thumbnail": "https://img.youtube.com/vi/yMli1pUZKDQ/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "아프가니스탄을 총정리한 영상 (FULL VER.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=rDuGKH37Mc8",
                                            "thumbnail": "https://img.youtube.com/vi/rDuGKH37Mc8/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "가톨릭 개신교의 정체 (FULL VER.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=rCOBFMl8JnA",
                                            "thumbnail": "https://img.youtube.com/vi/rCOBFMl8JnA/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "터키가 지정학적으로 개쩌는 이유",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=RR_JgYNpnqk",
                                            "thumbnail": "https://img.youtube.com/vi/RR_JgYNpnqk/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "남미가 발전하지 못했던 진짜 이유 (12분 순삭VER.) #23",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=Pi9jekBvTz0",
                                            "thumbnail": "https://img.youtube.com/vi/Pi9jekBvTz0/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "불안해진 박정희 - 박정희14",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=aAvUuv8bhIM",
                                            "thumbnail": "https://img.youtube.com/vi/aAvUuv8bhIM/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "박정희를 도와주지 않은 다른 국가들 - 박정희13",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=QY9kSwU9cM0",
                                            "thumbnail": "https://img.youtube.com/vi/QY9kSwU9cM0/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "갑자기 미국땅 밟은 마두로? (41분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=X0LRmGcvvIE",
                                            "thumbnail": "https://img.youtube.com/vi/X0LRmGcvvIE/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "핵개발의 역사 (FULL VER.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=E-4RdO2ea3c",
                                            "thumbnail": "https://img.youtube.com/vi/E-4RdO2ea3c/maxresdefault.jpg",
                                            "id": 10
                                    },
                                    {
                                            "title": "이스라엘에서 한숨나오는 실제 상황",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=kBkGX2ebItU",
                                            "thumbnail": "https://img.youtube.com/vi/kBkGX2ebItU/maxresdefault.jpg",
                                            "id": 11
                                    },
                                    {
                                            "title": "진보와 보수의 진짜 정체 (49분 순삭Ver.)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=GCk0Z9zqakc",
                                            "thumbnail": "https://img.youtube.com/vi/GCk0Z9zqakc/maxresdefault.jpg",
                                            "id": 12
                                    }
                            ],
                            "subscribers": "70만",
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": []
                    },
                    {
                            "name": "smallbigclass",
                            "description": "촬영 및 편집 100%",
                            "logo": "assets/images/unnamed.jpg",
                            "link": "https://www.youtube.com/@smallbigclass",
                            "id": 4,
                            "order": 3,
                            "videos": [
                                    {
                                            "title": "사춘기 아이도 바로 설득되는 방학 공부습관 잡는 법 | 조코칭 Ep.40",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=W6FAoFyvaNM",
                                            "thumbnail": "https://img.youtube.com/vi/W6FAoFyvaNM/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "돈 낭비, 시간 낭비 안하는 겨울방학 스케줄 짜는 법 | 조코칭 Ep.39",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=DUQ5CsHbjk8",
                                            "thumbnail": "https://img.youtube.com/vi/DUQ5CsHbjk8/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "확 바뀐 입시…발 빠른 초등 부모님들은 시간과 돈을 ‘여기’ 씁니다 | 조코칭 Ep.38",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=owJ4D81kAzw",
                                            "thumbnail": "https://img.youtube.com/vi/owJ4D81kAzw/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "집 팔아도 안 된다는 국어, 학원, 문제집비 수억 아끼는 법 (feat. 수능지문 분석) | 조코칭 Ep.37",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=jeMcJCd9UeE",
                                            "thumbnail": "https://img.youtube.com/vi/jeMcJCd9UeE/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "아이에게 이 영상 딱 10분만 보여주세요. 앞으로 시험실수 안합니다 | 조크라테스 Ep.3",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=Jwntxx8IJ3o",
                                            "thumbnail": "https://img.youtube.com/vi/Jwntxx8IJ3o/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "외고 교사가 말하는, 공부 잘하는 아이들 부모님의 놀라운 공통점 '이것' | 신영환 저자 (1부)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=3_CpGEwmPwQ",
                                            "thumbnail": "https://img.youtube.com/vi/3_CpGEwmPwQ/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "어휘력 좋은 아이, 부모님의 ㅇㅇ가 달랐습니다 | 서울대학교 최나야 교수",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=4nTYtGUU0Ps",
                                            "thumbnail": "https://img.youtube.com/vi/4nTYtGUU0Ps/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "부모님 잔소리 없이도 아이를 변하게 하는 아주 단순한 원칙 | 조코칭 EP.5",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=aklh9NLlEhk",
                                            "thumbnail": "https://img.youtube.com/vi/aklh9NLlEhk/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "아들에게 스마트폰, 게임 등 절제력 키워주려면 ‘이렇게’ 해주세요! | “아들의 뇌” 저자 곽윤정 교수 (2부)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=iqx_UugSMsk",
                                            "thumbnail": "https://img.youtube.com/vi/iqx_UugSMsk/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "✏ 아이들의 공부 동기는 ‘이렇게’ 만들어집니다 (feat. 부모님이 절대 하시면 안되는 행동)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=JKQmdWR1TkI",
                                            "thumbnail": "https://img.youtube.com/vi/JKQmdWR1TkI/maxresdefault.jpg",
                                            "id": 10
                                    },
                                    {
                                            "title": "학원, 캠프 아무리 돌려도 공부 안하는 아이들의 특징  | 이병훈 소장 1부",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=ydfJDxJtpZQ",
                                            "thumbnail": "https://img.youtube.com/vi/ydfJDxJtpZQ/maxresdefault.jpg",
                                            "id": 11
                                    }
                            ],
                            "subscribers": "24만"
                    },
                    {
                            "name": "드라마킹",
                            "description": "기획 편집 100%",
                            "logo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMCAggICAgICAoLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoICAgICQkJCAgPDQoIDQgICggBAwQEBgUGCgYGChAOCg0QEBAPDxAQEBANDQ0ODQ4QDQ0NEA8QDw0NDQ8NDQ8PDg0QDw8NDQ0QDQ0PDQ8NDw4NDf/AABEIAKAAoAMBEQACEQEDEQH/xAAdAAEAAQQDAQAAAAAAAAAAAAAACAQFBgcCAwkB/8QAUBAAAgECAwMGCQcKAwUJAQAAAQIDBBEABRIGEyEHFBUiMUEICVFSU2FxkdIjMoGSk9HTFkJjcpSho7HB1GKi8CQzg7LhGCU0Q4KzwsPxF//EABsBAQABBQEAAAAAAAAAAAAAAAADAQIEBQYH/8QAQBEAAQMBBAgDBwEHAwQDAAAAAQACEQMEEiFRBQYTMUFhcZEigaEUMrHB0eHwchUjM1KywvFCgtJDYpKiBxYk/9oADAMBAAIRAxEAPwCbOeH5Vl7owsQ/4ahD72BP048htxisWDc2Gj/aAD6gldxZ/cBzx7mfgumhrNBPDUGVkZbkXDeQjiCCAQfViCz19k4yJBBBG6QefAq+oy+N8QZCr0oppyqJGUQHqgKwjW/azMblmsOLEljaw7hjPFK0WstpsZdZwEENGZJO85kkk7hkscvp0QXOdJ8pPID5bviq+q2VncqqJpjQWUuyqWJ4tIw1FgXPG1uqoUfm4za2jbRVIZTZDG4CSBObiJJlx4cBA4LHZaqTJc53iO+JwyA6epkrtg5OZT850X2amP8AJR+/FzNAVj77mjpJ+Q+KtdpKmPdB9B9VcYOTZPzpGP6qqv8APXjPZq/THv1CegA+MrHdpN3+lo+P0Vxp9hadbGzMRx6zHu9S6QfYRjPp6GsrCDBJGZ+kBYzrfWdxA8lcBs/BcsY1JJJJZQxJJuT1r9pxn+xWe8XGm0kmSSJxPVY/tFWIvGOyrIqdV+aAvsAH8sZTWNb7oA6KEuJ3ldmL1amCJgiYImCJgiYImCLG9pfnr+oP+ZsYdbesyj7qtGIFOmCosoXZmnuW3akkkktd7km5PWJ7Ti/9n2aS40wSTJnHE4nfKxvaasRePlh8FXQUqr81Qv6qhf5AYzGU2MwaAOghQOe528yu3EitTBEwRMETBEwRMETBEwRMETBEwRMETBEAwRRO2v8ACErDWymMR7iOV4kiZL6443K6mk+eHexbqkKtwNLaettPYab2i9MxvWr9vqMcbsRO5bWG3lIIYZpZUhWeJJUWR1D6XUG2m+o6b6WIBAPfjQ+z1C4taCYMYLfe0Uw0OcQJEid6vNDXpKiyRMsiMLq6MGU93Ai44G4PkIPkxA5paYcIKna4OEtMhbCxsVrkwRMETBEwRMETBEwRMETBEwRMETBEwRMEX0DBFCvlB5Wcwnqp7zywIk0iJDDI8KxqjlQrbsqXcW6zOWOq9tIso39KixrRgtBVrPc44q6clPIZJmkUlQ824iDsindmZ5XABduMkYCqWA1XYu2oWW2o1qVgwxCuo2c1BeJhYbyg7GS5fVPTTMHKqrJILgSREdRgCSVsAVKEnSVIBYAMZGODhIUFVhY6D+Bbj8H7J6iKnmaUFIpZEaFGBBNlIkkCniFf5MAm2rQSOBBPP6SexzwG7xv+Q+K6DRzHtYS7cTh8ypHYjUiYImCJgiYImCJgiYImCJgiYImCJgiYImCJgi09y7cmVCaWrrzFpqUj1a42ZNbllQNIgOhyC12bSGYDi2M6z1n3gycFg2miy6XxitK8mPLPWZejU8Ma1EbszrG6uXRyvWKGMglSF1MpB7CQVu19lUpNdicFr6VdzPCBKxLanbaesqWrJntKSpVo+osQT5gj4kqqdoOom9ySSSTKGAC7GChdUc518nH4KZWyOUPLS00tRqSaSCJ5UsF0yMilxYg6TqJ6vd2d2OWqUGhxAOE4LqGV3FoLhjGKy7EijTBEwRMETBEwRMETBEIwRW+q2hgSeGmeRVqKhJpIISflJI6fd7+RV7dERmhDubKrSxC95EBIq8txt3+Tv7u76R7xgioclztKhZGjuVjnmpy3CzSU8jQzabE8EmSSE3sdcb8OAJIq/BEwRMETBFTZll0c0bxSqHjlRkdD2MjCzA2seIPaCCO4g4qCQZCoQCIKwXYnkJoKCoNTDvHkAIj3zq6w6gQ26Cxo1ypK6pGkYKTYi7Xyalpe9t0/5WNTszKbrw/wr5//ADHLt9zjmsO+1a9e7Hz7316Pma79bXp1X43vxxFtnxdkwpNiyb10SsnxEpktgiWwRLYImCJgiYIsH5Y+UVMsommaRYZZnWkpJJIJqmJa2oV1pt5BARPMm8A+QhIlnbTHH8pLGDUCVQla65RKfMqzJsqjqWlpM6zGngpnoqSaaCjizOenjqampqpaR+dGmypKerlFMK9KWqvuJTUtPTFaiJVFlvJilVC1Pl8ktDTJQ0iR9FUs02YVi08a83pZZ66c0jhSqoWBy0F5VYCokAYsKqFiXKvTk5/lsU1TURpmNPUZfTw5dGIZ44FjaqrpqrNWJmpI6iSOlijhy7m1YzUyyLUaYajcBuVOKuu33IFNLNTvllQMsipcuzemSKEOjTVeaVFBUGaWZPl0DPRu09TBIlfIaiUpUQSOZsJzVYWGcgOw1BTw1MiV1bn2YbOb2h11G/jpoKqOiEkiZfl8dqeSWVKhl57Lz6vl38itWzhxepKoFsPwdchzqDL6FM3aNHhy6kpzTJJJWVJnjjVZqquzKXQJ6iXSGMUFOkcTtLeetvG6UMcFULbGLVVD/r/pgcEVsyDPBURbxFZOsy6ZBYgrw4gE8Pp7bjuxpdE6UZpOze00mOYJcIeIcC0wZAJ488xvWXabObPUuOIO44bsVw2WllaL5dlklWSRGMYsoKOV02svEW80dUr6yYdA1LW+y/8A7nsfWD3tcWYN8LyI3DERkMI44m62NptqfugQ0gETvxEzx/zKp9lMzmkpzJLodtcujdEhWVCVAu3AXdWAPm6SeN8Yer1utlrsLrRazTc+88N2UhrmsJbEu4l7XQf5LpOMqS20aVOsGU5AgTe3gnHhyI85Vbs9mTzQpK6bpnGrRfV1Seq17Dgy2axF+ONloa3VrdY6dqr0tm54m5MwCfCZgb2wYIkSoLVSbRqupsdeA48+I8irjjdLFVv6Ai80/Xk+LFlwKTaOToCLyN9pL8eFwJtHfgCdAxeRvtZvxMLg/CU2jvwBOgYv8f28/wCJhcH4Sm0d+AfRfOgI/wDH9vUfi4pcH4T9U2juXYfROgI/0n7RUfi4XB+E/VV2h5dh9FhPKujU8ME0bSxwQ1S1GYVAq5UWny+jgqK2peUyTj5KXm6UraAzDnANgodluDB+E/VUNR3LsPotNbQ1U4yikNVNVV+YQrlVPmWT5RXzU9ZJm+ZzRc4ppcxFYstHDTx1InjpI58vZaenLTVDU8lkuDADh8Srdo7l2H0WXcjuc01Ka6nqo6HKojmzUWWUlFUODVyClp5qwjrxyVtWtfLWQzPHTRm9LKzKQryvQsHPuUFQ8uwWXcqexcSaK+mp99myhaDL5XkqJYqeStlWDnMsHOYo3ipFkkqJXBWfmwqo4pF5y6yA0buCF5mVZdmNn81ysw0jUq5rQB9C11NmE0WZJvJid9X0uYz7qpIVt7U1dPmO9ll3hjoUDLGq40/hVb7vwBW3NeSyvoK+kTIqeLo9osxmrjWZnVRRmvq6ih3FQ6otTVVbUtLDVRxUwNPAqSQpvYRDFoqQ071S+R+BbJ2O2YaNDzup53VNbetEZqWmTSLaKWmNRM0cYOpi0s9RMxY6piqxJFjCpScYB3c1A22McS0OEjor2tFTkEh7gGxIqZbA+S+94HFBVokSHiP1fdUbbqThIqMjdvbvyWIVua09PLI6s88M0l5tErhoZTrKlSrIHR11DSSSN2OsbKuPMK+kLPoG11LTTLqtCu+akOl1Kr4iC3c1zHNkRvbcAvnwMG20fb6GmAaFnqNNSiBuGBaczBxBG8SMdwxKxSo2zkWWZ4iVjkfUEdmNrAKrEhwdekDVdmVj87XYEecv1utdntlotVlcG06rpuvF4CAGtdvEPutEwS3gb0NI7AaOpvpMZUEuaIkdyOk7sJyjFUVBm1T8oImkO9JMm7BbUzX1MdINmNyCVsbcPJjSWO36Su1fZH1SKpJqXAXXnO95xutN1xnEtumIEwABl1KFDwmo1vh3TwA3DHh1VVRc9EZp0WVI5DpI3bgDXZWFyvBTwv2d/ZqfVsbIdMssx0ZRZVZRqGD+6eA2/wCE+It8LDMuAI3EyJdex3+yuqbZxaXD/uHDlOJHD7CM2p9r6QswYTIATpK1FRpYDssqSgJw7FC6QPJYY95paessljg5oGAMkggbt274c14LR12sr3OFVpaOBgOvdhIJ8+qyXL6KCVdSNKRci/OascR28DKMdJQq0q7b9MkiY3uGI6rsbLb6dqZtKJBbMe7GI37wFVdNL5sv2E3wYyb3XsVlbM5juE6aXzJfsJfgwvdexS4cx3C+9Mr5kv2Evw4XuvZLnMdwnTC+ZL9hL8OF7r2S5zHcJ0wPMl+xk+HC917Jc5juE6YHmS/YyfDhe69kucx3CsO3GQ0+Y0z0lSlQaeRkMqRc5pzKqOH3TyQ6Jdy5UCSNXUSpdG1I7qwPj/Cpc5juuOTbLZfTRU8FPRrBDSytPTxQ0RjjhndZVeZESMKJXE82qS2pjK5JJYnC/wBUucx3C55Bs/l9JJUTUtElNLVyvPVS09BuZKmaQ6pJZ5I4leaR2JZnkLMxJJJJOF/r2Krs+ncK+dNr5sv7PP8Ah4Xhz7FNmcx3CwXavbqYHQt4uLcdDhiAeBGtQV4dvDt78cBpbTNopu2bfDvxAMkcOEjt0Xk2n9O22g/YshmJxGJIBwIO8duhWIVOdyOLO7sB5xc/zxyNS3Vaoh73HreXn1a3WisIq1HOHMkrokqybXJNuAuGNvZcYgdWvbyT5FYrqjnReJMbplaWz3wydmKc6XzKGR9WkJTpPVMWJsFApopeN+GNzT0PbKmIpEDn4f6oW7p6Bt1TEUiBzhv9RCzLlY5dcuyGmFVmbOtPNKKYLHHI7PKyPMijQpKkbktqNh1bXGrGHY7D+0b9muXmlviBJbgHAgg8CHQRGK2Wqtqtlmt22sIBeGmQTDS0wMehIOajlmfjWckjLCmoqskXCsIKSINY8GEr1M1QA3b1rG3ao7MdLZdUn0CHUm0qZiJDZf5vcC8/+a9AtR1jtv8AFtYYD/pZLQOwn/2K17nnjb531CLLDa5CmfMpJLi/Asi0qAXHaoc2849uN1/9bqOH7y0OPLH5u+S1B1UqVca9qc7OZPqXH4LIvCg8LDNaPIdnq+ilWgrc2RqiURQxSjdCGNykfOY5rBTPFdhZjccbEjGs0ToyhUtdek8Etp4A4jGSN4jIrUaG0LZqltr0qjbzaZgGSMZI/wBMZFV/i7OWjNs5kziTM6qSrEC0KwhlRUQymrMmlYkRASI0vwvYDEesdks9kFIUWRN6Yk7rsZ5qzWmw2axii2gwNm9O8nC7G+cyvQ/k1zYgSgiRhdSFVCwB46jwFxfh392J9Wa7nCo0kxhAjjjPyW41JqPeKzHOwEEA7gcZPngtjY7temJgiYIvoU4IrJnu2tFSqWqqmnplUEs1RUQwqAOJJMjqAAO84IqTMuUzLoaHpOWsp0y3RHJz9qiLmhjldY4nWo1bplkkdERgxDsygXuMI4ItH7TeMg2KpWKPm0crgXtS01dVLYkjhLBTPBfh2b24FuFiL33CrbwWr9p/HC7KwNpgizCs4fPhpYIo/YTU1UMnr4REYrsyqXgsg8NHwza7JNm8lzrK4Yklzd6RtzmETyNBBU0D1mhkimitPG27ja7Mo640m4INbJgoTgsK8XP4X+ebSzZ5LmskcsVDBQmnp6enhgRJJ5KrW+sK0rFlhVbSSuoC8FBLE49sqbCkagExwzWHarSaFF9UNvXRMDioo+Ff4eG0cGd5jRUlSkENLUmJGWlp5JSqoLqzVCTCwcm2lVYWHHtvoLDoqha6TbTaQXPcJMkxvwiI4LjrBoez2+iy12sF9R4kySBvwiIwA4SVpDbnl92zaJJ6yrzKmgdgI5lWbL4pGKswVZII6dHugZglzcC9uFxs6Fg0cHFtNjCcsHH1lbWzaN0WHFtJlMu4jBxHkSY6qTniy9sKuqOfz1dRNVNDFl+lqieWcqG5+zaTKzEX3YvbtsMczrNRp09i2m0CS7cAP5clyWttCnS2DabQ2S7cAP5cuqgvyT0IlzXLIjxEmYUcZHqepjX+uO4tbrtCocmu+BXodtdds9R2TXf0lep3h453lEGWUj5zSzV0HPlEMFPOac7/AJvUEPJICraAgdbKSbuOBtw8u0Cy0PrOFncGm7iSJwkLx7VynaX2h4srw113EkThIwHnCgnSeETs7T6uabL0t78Grswqq/2EpNHYcO1VIHt7cdydHWt/8S1O/wBrQ34FeinRdtqfxLY7/a0N+BWuswnn2jzeCKjoqWjmq3ipoaXLqY09MgvYyuibxrKuqWec3siMxCqlhsWhthoF1R7nBsklxk9B8AM1tGhmjrM51Wo5wbJLnGXHkN3QDPBSj8ZvksdJDszQw8IqOlrIYx5I41y+FP8ALEMcvqy81HV6jt7iD5+I/NchqlUdVdaart7i0nqb5PxWf+Kny22XZrL3vWwx/ZQau3/jYwNanTWpt5fE/ZazXJ016Tf+0+p+y9P9hMjaGI6xpdzqPG5tbgDbhwxutCWJ1monaCHOx5xzXYas6OfYrMdq2HuM84jAHgrrpqPLF9WT48b/AMXJdn4OagT4yjwzc92aqsvosrlghNXRyzyymmSeVCJTFGYxPvIx81j1o3BI7OBBnptneonkD3VBH/t0beZmxghzOtmkYE7ugp4YpdPAEgUNNHIACQLi1iR5Ria60KKSuFNyX8oubXjeDP6lWHE1rZkkJHZ/vKx0iPs1Xt7DhLQmKvmzPitttKg2egjpF4deqrqMD6sM08ot64x9OKXwl0r0w5QfBazOu2FptlkmpYapaHJ6WaVzOYVahmpJqhldEdn/ANw+j5FQ503MQJZccON6eCmIF2OKizlPiSJTp3+eIvEalhyx5OHeFd62Lj5CYz7D2YlNTJWBma86uVLZFcvzPMaBHMqUNfWUaSsArSLTVEkKyFQSFLhAxAJAJxMNyjO/BejXjdap6fJtlaBmQj5Z1VEZLCkpKSEXLSPewnt2L34x6UyZUtS7Aj89FrvxVPLhlWUSZnS11WIKvOKnKqOjpjRVVSZmVqqMHewlYYg0lXGnyrr2X7AcK9M1G3eHH8lR3WPaWVBIOG/7FRE8IlydoM8ub/8AfGZC58grJgPLYAAADuGLLFT2dnpsya0dgFr7DS2NmpU/5WtHYBTd8aDPu8pyanv21TMB2cIKYR9lz6XHA6rBxtFV5PDLM9eS841QF601n8vi77Kz+L0tT7ObSVnAaTNc27RTUDygXuDYb0m3dc+XE2sQc+2UKYOXq6Pkp9aJfbrPT6ero+SgLkedS008NTA2ianljnheytolicSRvpYMp0uoNmBBtxBGPQXsbUaWO3EQeh3r0qpTbUYWPEgggjMHAqZudeFhUxbO5TNmlJTZ9VV9Rmc0cmaRJLFTGlkip4ytOsaqwOp/mtERZrHrEjiW6JD7ZUbQeabGhoIbMm8CTjPyK4JmhWPttVlne6kxgYCGSC68CTjP1WKQ5TtjtcqwQ0q0WWPoe0NKuWZXp4lXMmne1aDg2hXqtJ0kIOBxnF2j9Gm8516oMzef9G+nVZxfozRRvufeqDM339I3NPPDKVLjweuQbI9kImnq6+lOYSromrKmaCnSNCQdxTLLKCiE6dTEl5mAJ0DTGnHaSt1r0m67SYQwbmgEzzMb/gPU8RpTSNr0s4MpU3bMbmgEzzMbz6D1Oi/DllodoK/L+ZZvlaxU9PJG0k9dZd7LLci8EdRZQiIS7aV48CbG2+0EK1ipP2tJ5JPBvADmQui1dFawUam1o1CSQYDeAHMjNSS8CHkOnyPKJIpqimqueVRrYpqGR56d4JKenSMpKyRawd2zBlUqVZbE45rTtt9stAcwFt0XSHDGQTPHDeuU1h0g222kOa1zboukOEGQTMicN+5Tl2YSdqeI7xR1BwMRY2HAXbei5t6sd/osvdZKRccbo/N69j0HUv2CiXgzdHHfGE4hZHbG3W4XjB45Op1bVUg8zI6RffW5i/8A88ZFPconb1ILxc3hM7OZDslHHmWZU1JUNWV1RNTlnkqQCyxoxp4EkmYtHEpUBCWGmwPDFr2klVaRC29tF413YyBWaOqqawgEhKbL6lWYgdimsWkS57BqdRftIHHFuzKuvBau2h8dPkiqxpMsr53sdK1D0lKpNuAZ45awqCe0hGt5D2YrsyqX1tjwz/CvzHJNk8tzqijjp67MZsuj3UoFVHTGsoZ6yVNTCHe7rcmNZN2uo2JjUEgUa2TCqTAXm9R+HjyhZtI8dHW1U7W1GHLctpy0ak2H/haMyqt+AZmJv34lutCjkrDMm8C3bLNZnnOU1xkqJmkmnrITSlpJXLSSuaswliWYuSAb8e3FbwCQVLTx2lUOcbORD8yDMnHseSiQf+1iynxVz1ozwDfBWlzOajz8VKQxZXnVM3NjC8klQ1C1JWsusOiRq6yLHq65BJOkgcdJpXS7LDDC0lxGGXmuW0vpxmjYaWkuIkZeaj7U1gzHaBpODCuzgvfuIqa3V7bEPja1HFtnLnbw2T1urb1XubZnPdvDCT1u4qYPjYqrr5EnkXMXI7usaIA29Wk+844zVQYVj+n+5cFqY3Cuf0/3Lh4KcRi5Pdp5GFhKc1Ck/nKcspogR6tZZfaDhpU3tK0AOFz+slNMm9pmzNHC5/WT8FG7wKsqWbajKI3UOu/lcqyhlO7pZ5OINwbFL46TTTi2xVCMh6uC6vT7yzR9UjIergF6KeGtyyrs/laVNNFEcwnk5pRSyQxyc2BBkmmAYcdCr1F4pvnjLI6hlbzvQti9trFjybgEuE78h+cJ4ry7QFgNvtBZUcdmBecAd/AD84TxXnpyebB7QbYS1ZNdvRT7uWd8yrpVhUzNJuwiWlsOo9ljiCRgAdW6A+hWivZNGBv7uJwF1onCJndnnJXp1qtNi0S1v7uJkC40ThEycM+JkrMo/AjpIOrmW0mUUcg7Y4qgVLgfqySUj39Wjt7zjD/bb340bNUcMyI+AKwTrBUfjQstRwzIj4BwWkeWPYigy+rFPl2Yrm8QiV5KmOmamjSZme8KhpZRLpQI5lRtF5NPajY3djr1azL9WncM4AmTGe4R0XQWC0VrRTv1qWzM4AmTGe4Rjw816c+Lpy+pj2Yp+cXCPU1UlIrAgrTM4tYH815xPIp7Crgi4IOPMdYnMdbXXchPWPpAXketDqbre65wADv1R9ICndyb5iXgKk8Y30gcOCkArw7bX1cT2kHHT6vWg1bMWk4tMeUCPWV32qNrNaxljjix0Rk0gEeUz6q+dAxeQ/Xk+LHS3Au72jl5k+Hf4Dm0m0W08lTltInMEo6SBKuorKaONmRC8gCNM9VZXlZb7gC6tbhYtkMIaIUD5cZWtNm/EzbRyMOdVuXU0duJSWrqJAeHDQKWNDwvx33k8txftArbpW0dnPElIGBrM7Zkt1kpstCNf1Sy1jgDt7YT9GLdpyVbi2js54m3ZiJg09RmVVbtjaopYo29u6oxKP8A0zD6cU2hVboWMeOFymKl2byini1BVzWFUVpJHskFBVRrwZiLgOBcAHFtJoBlXVHEiFFbxb/hLZLsy+dVGbyTo1RBRpSxUqTtJMY3qGlF4nijW14rb6VAdXDsa0lRl6Fax93/AAD8VIHbnxx+XrwyzKaua9+vXZpLTafJ8lTvV6vX8sn04i9nHEnufqpNuch2H0UTfDa5dajaBdna+qjWGafKqqYxRvO8SJ03mlJEqmommkLbqiQu2oKzEkKoIVZmMDZAUT3F2J+AHwUuvFx5TzfZZ5+sN/W11Tcmy/Jxw0/V9Q5tc3ubk91seYazC/bWjH3QOuJPzXjetnjtzGwfdA64k4d15cbPV80VRBLTXFRHNFJAUUOwmR1aIqhDBm1hbKVYE8LG9seoVGtcwtf7pBnpGPovW6rWOY5r/dIIPSMfRZvym1m0FfVxjNlrp6t497BDVQ1AfcuxTXT07IoSF3jIvDGqM6N2kHGDZhZKLDsLobMEgjfzOePEytfZBYqFMmzlgZMEgiJyJ4nHiZhTS2M2eqaLk0rY5IZo6mbfrzdoZVmJqa6OnT5Err66EEdXipv2cccTXeyrpljg4XRGMiMGz0XAWipTradY5rgWiMZEYNnfuWmfAQ5G80j2ly+qnoqqnpoErHeeakqIobvRVEKLvXjEYZnlWwLC9ja5tjd6etlB1ifTa8FxjAOE+8D14Lf6x2+zusNSmyo0uN3AOBODgd0zwU5fC58G07SZclPFKIKuml39M8uoxMxQo8UpUMypICDrRWZWVeqwuDwmh9IewVi9wJaRBz6jmvO9B6V/Z1cvcJa4Qc9+8c1CXLvFgbQu1nmoYlvYk1FQxt3lVSlN+HYCVv6sdy7WeyAYBx8h9V6C/W+xAYNefIf8ln2UeKgmOnf5qi8RdYaFpL+UKz1MXHuBKH2d2MB+tbf9FLu77LWv1zbuZRJyl3ygrbWw3itMngljlqHrK8KQd0+mKnkPdrEMYlK94VZ1B79QuDg1dPW6s0tp04niGuJxyO7zhYNbWLSVdsUaN2eIa4nHdB3ecKZeR8mrpEiRxiCGJUijjUFAiLaNI44kACooCqANKqPIBjRs0NaawNR8jHEkm8STlvOO8+ZK0tLV+3V2mq9pGOJdN4uJjdvOO8mBxJwK2DspsWIovlC4djqYJNKgHDgp3cihreX18Md3ofRvsdG6/wB52JxOHKZxjsvVdXdGv0bZrtSL7jLsAYwi7OMx2mY53xc/gP8A5qfWGN5fbmup2bsl5k8pPjmKmnqqumpMogPN6ieBJ5q+WVZBFI0aybuOmpyA4XVp3hte2o9uMoU+axy5aYznxwe1soIjTLqYn86GimYj2c5q6hfeDi7ZhUvFawznxjG2tRcNm8yBjwFPBR05Fz2K1PTRv6h1r+vF1wKl4qzVdZt3mAJc7QVivc8el50Nz3DrLb1AWwJaMlUBx3L0U8LnwUcxz7ItlMoyt6WBMrpEWqauqJIt00VFR00EYVIZ5Xayz6joupQX4vjHbVaCSSpjSeeC1VsN4nCC6NmeeLa3XhoKSxv5EqamXsHlNIb+RcHWhrd5A6qgoOyUhtg/FibEUYTexS5k6nVvK6ukFze4DRUfNIWUdmlo2BHztXG+traYsdIxUr02nm9o+JUgszzuaeytnLt4trJM7r6ep590ZQ0tDDQ0+XUFPAixrHPU1DuJpJHX5SSpdigpxZtRLOXNlm0xY7Q65RrMc7IOBPaUdZqgxLT2W5OTfwfcryfJYcmo6nfRQGoKvVzQmSUVMjySpIYkjUD5QqulAQAty3E41+lrELY0OY4Co3djh0/OK5XTugX2+mHUsKrcWkzB5HAxyOe9WbZrkyosvG6oqalpVHG1KlNEpv2nVFYMT33Ory44O0Wa2vfdq3nO6z2MwvLbVofS76pZWp1HO3/zCORkjy9FlNNkDNc64U4D59RECfUNLN2euwxJT0LanzIA6uGPafWFPR1S0pUmaV39R38hE+sKuj2UUrfnEAa3zTKvb5NQJ7B3gHj78ZjdX6pbJe0Oy+U/P/K2LNSbc5l4kB2RB35SBlxg44c11S7LEAkT07W7AJ1ufZcAe8jET9AWhoMOYejt/cBQv1L0k0EgNMZEyektHqq2k2PiIGuqhU+RXRreq5dff/PGbS1cJE1KoB5Y/MLY0NRbQ4A1ql05BpMcuCyehyjLUABaJzaxZ5VYn121WH0AY6ShoexU2wWhxzJmfkPJdjZtVbFRaGmjePEukk88h5BVuWU1BEdUZiv3HWrEewkkj6DiGdFaPcHOfTYeF5wmeUmQtjY9XrPZnX6NDHgYJI6EyQrl0/AOAdfoI/8AzGJX1s0ZQwbUvfoBI6zg3sZ5LfNsdWIDYC5flBB6Rffjo7JbaNrotr0XS1274EHIg4FROpPaYIT8oIfPH7/uxl325q3ZuyVxDYvUailSeLA2MDtJNQy1UjOXd58wrru7HUzMIJ4E4sSSAoHHsxffKtuhbJyjwONk4AAmR5aQPTUEFSfpNQkpP0k4jfULWlx4CeyqGhZ/lWWQU4C08ENOo7FhhjiA9gjVR7hjxOrrvbX/AMNjGjzcfiB6LZCzNCuDZi578aurrZpN/wD1Q3o1vzBKvFBmS4idz2En2X/piBmk9MWzxUqlV0fyXoHW4AFW5TbvAQUznuP0nFWavaUtBxou6uIH9Rn7+aGqwcVyFA3+jjPpanaSeYLWt5l2HTwhxnyjmrTXYu2GhYEEm1j3E/8ATG80Zqha7PaadetUa0McHeEkkgYkYhsTuPInoYn12kEAKsapA7x78ejVtL2KiYqV2A5XhPYYrFFNx3BdRzBfL+4401TWzRbJG1JIya/HoYj1hSCg/JcDmS+v93341ztdrCNzKh8m/Nyu9ndyXW2aeQe841FbXrH9zQwzc7HsAY7lSCzZldZzJvV/r6caaprrb3e41jR0JPq75K8Wdq4Gufy/yxqX6z6UeZ2xHINb/wAd/qpNizJfBrPnH34xW0dKWvECs8Zm+R3OCrLG5ei5rQufV7T918bWhqhpKr7zWs/U4f23vzmrDXYF2rlp7z7sb2hqNUMGtWAzDWk9iSPgojaBwCrYksAB3Y9PsFip2Kzss9KbrRx3kkySepJOWSw3OvGSuV8Z6tVBeo/Re+T7sWeLkpPBzT/aP0f8TDxJ4OaWqP0fuf78PEng5rrNNN5Ivqv9+NQ7Q9ic6+6hTn9A+ik2nMrjNvlF/kvoV/ixgaTr0ND2Y2hlFu8ABoDcTxkAxxx8uKuYBUMSV1dIy/4Pc/xY4KprxaLsUaLG9SXDsLqyhZ6fEn0XBq6byoPYrf1ONJW1u0k+P3rW/pa3H/yvFSChSHArjvJj3g+wN/Rsa/8AaOk7Y66KtRxOENLuPCGwFfdot4fBfeZTf4fcfixlN1b0rVMGifMt+bvRW7aiM/zyXJcum/wD2hv6NjNoan6Sqe81rP1OH9t5Wm0UhmufRcvnJ9V/ixu6eotY/wASu0dGk/FwURtLOAPcfRfOipvOj+o/x42VLUagD+8rOI5AD/krDaRwC5DLZfLH9WT48belqho+nvaXdXH5EKw1/wAwXYKOb9F9ST48bSnoCwU5igzHMT2mY8lYas8SuaxzjsMX1X+LG4o0GUW3KTWtaOAEDsFGXNO+VytUeWP3SfFjI8Sp4Oaf7R+j/iffiniTwc0vUeSL3yD+hw8XJPBzTVUebF9eQf8A1nDxck8HNFlqO9IreqaT+W4/qMPFkO/2SGZnt91cNOL1GmnBEtgiWwRcXjvwPHGNabNStNM0qzQ5p3g7sDI9VcHEGQusUi+QY1VLQOjqWLaDM8RPxlXmq88V2BPVjcU6NOnNxoE5AD4KMknevtsTSqL7bBEtgiWwRLYIoreEltTtxltW1XksEGYZUlNGHpjBzqpWVWnknmNPFJS1j6kMMSJSy1JJS+5Go45/RNkttlp1GWuttSajiwwBdpmLjDgCS0zJJcSIxG5Svc0nARh68VGfbzxoudcxqYo6SmoqtVZDWq0sjU7q2iQLQ1EbqJ1N1G+lkWJx14ZbFMbym4vcGxvUbgAJlTz5Eto8zlyfLZ80CvXTUkEtXoVYSs0iB3TdreMFC2g6SFLKey4x4zaNeNIWepUtDbM2rY9o9rHNcWVA1jyy8Q68114glvuzuMGJz22ZpAEw6FnkWdoTZrp+uLfv4j9+NpYf/kfRdes+lar1ngCNsC0uON4eG80RhHil2PhwVjrI8CRj0VfFKGFxxGPSbHbKVspCtQMsO4wRPMSBIyO4rEc0tMFcrYzValsEQjEb2lzS1pgkbxEjmJBEjmCOSqFbvycp/RJ9RfuwuNyV+1fmU/J2D0SfVGFxuSbR2a+/k9B6NfditxuSbR2afk/D5g/f9+FxuSbR2adAQ+YPe334XBkm0dmnQEPm/wCZvvwuBNo7NOgYfN/zN8WFwJtHZp0DD5v+ZviwuBNo7NOgIfMX9/34XG5JtHZp+T8Ho192FxuSbR2afk/B6Nfdhcbkm0dmnQEHo192FxuSbR2adAQ+jX3YXG5JtHZqNHhS+A3BtDWZZVwyQ0nNp16Shan1dJ0ongk3bzIwZZI40njUukisJyDpCjGJa2VthV9lgVixwYTIAeWm6SQCQAcdxI4c6TeIvbvkpGxMUUK8ZAUAAr114Dt4cR9XHhjLNV0ZRp0NI2B92m0NFRg29Pwj3iG+Nk4yTTGPHdOyvhxlrvkqimmjYdUhr9ovf9x7PZbGy0XW0XaWOFicx4MS0GYHAFpxa3fDYAGOG9VcHD3l01GRxsCBdL+YSo93Z+7Fh1es1Ml9jc+zvwM0XlgMZsxpnIy3EYJfPHHqqGbK92LkCQcBxaRHuSABcMVPb5BiWvpvTOh6W0qup2mmCGw4GlWJe4NYA5l6m7ExixuZOBml1rzhh6j6q6rkcXkP2knxY9hs9WnXbeZ896wHOc0wfkuS5JGCDZuBv/vJP5a7YyboVt8/gCdKn0Un1V+PC9yKXOYTpQ+ik+qnx4XuRS5zCdKH0Uv1U/Ewvcku8wnSh9FL7o/xML3IpcGYTpQ+il90f4mF7kUuDMJ0ofRS+6P8TC9yKXBmE6UPopfdH+Jhe5FLgzCdKn0Uvuj/ABML3IpcGYTpU+il+qn4mF7kUucwnS36OT6g/oxwvcilzmF86ZHekv2Mh/5QcL3I9kucx3TptfNl+wm+DC917FNmcx3CdNr5sv2E3wYXuvYpszmO4TppfMl+wl+DC9yPYpszmO4TplfMl+xk+HC917JcOY7hU9TPG/zopCfLuXB+g8D+/HO6S1f0ZpIza7O1zuDoioOj2w8eRUrHPZud6qnMjD5m9/VeIsPfcMPeccpV1TtNnx0dbHgfyVm7VnQOltVo6ud03ROKs+8B5GPsvsU0kjJrjKhW1E2NiQDp4doAPHv7BjQO0Tpq12qhStlmaKdN20c9lQOY9zWkMaGuDXthxvYgjwiDO6W/TAMOVw6RIuN1IbE8QEsfWLyDge7gMev2OmaNFrCDO89T+QsFwvGZCLmbEgbqQXPad1Yes/K3sPUCcZt7kVZdGY9foq/F6jTBEwRMETBEwRMETBEwRMETBEwRMETBEwRMETBEwRMETBFbtzU+ki/Z5P7rEcOzHb7qWWZHuPom5qfSRfs8n91hDsx2+6SzI9x9E3NT6SL9nk/usIdmO33SWZHuPom5qfSRfs8n91hDsx2+6SzI9x9E3FT6SL9nk/usIdmO33SWZHuPom4qfSRfs8n91hDsx2+6SzI9x9E3FR6SL9nk/usIdmO33SWZHv8AZfeb1HpI/wBnf+5OKw7MdvuqSzI9/snNp/Sp9gfxzhDs/T7pLcj3+y+81m9KPohH9XOEHP0SW5eqczl9L/CX78IOaS3L1Tmcvpf4aYQc0vNyTmUvpT9mmEHNLzck5lL6U/Zp92EHNLzck5lL6U/Zp92EHNLzck5lL6U/ZphBzS83JOZS+lP2aYQc0vNyTmUvpf4aYQc0vNyTmcvpf4aYQc0vNyX1aSX0t/Vu14+rtwg5pLcl/9k=",
                            "link": "https://www.youtube.com/@Dra_maKing/featured",
                            "id": 5,
                            "order": 4,
                            "videos": [
                                    {
                                            "title": "\"저 간호사예요!\" 매일 출근하던 정신병동에 다음날, 환자가 되어 감금돼버린 그녀의 충격적인 이유..《정신병동에도 아침이 와요》",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=0tkxDPItJ2E",
                                            "thumbnail": "https://img.youtube.com/vi/0tkxDPItJ2E/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "살인범을 지독히 몰아붙인 협박녀의 최후 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/OZb72WPBRL4",
                                            "thumbnail": "https://img.youtube.com/vi/OZb72WPBRL4/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "개꿀잼 몰카처럼 자수 못하는 탕 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/PN2ZarB-HyQ",
                                            "thumbnail": "https://img.youtube.com/vi/PN2ZarB-HyQ/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "택배 번호를 반드시 지우고 버려야 하는 이유 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/8EGNn3znIvY",
                                            "thumbnail": "https://img.youtube.com/vi/8EGNn3znIvY/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "법이 처리 못한 쓰레기들을 단죄하는 이 탕 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/S3UKfDEBNVQ",
                                            "thumbnail": "https://img.youtube.com/vi/S3UKfDEBNVQ/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "사람을 연금통장으로 만드는 협박녀 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/xgaeoNjTw8k",
                                            "thumbnail": "https://img.youtube.com/vi/xgaeoNjTw8k/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "재판부터 집행까지 본인이 하는 형사 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/Pv4b6Xj3j0o",
                                            "thumbnail": "https://img.youtube.com/vi/Pv4b6Xj3j0o/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "선넘는 환자를 ’참교육‘하는 미모의 여의사 #유레이즈미업 #3",
                                            "youtubeUrl": "https://www.youtube.com/shorts/nUom8IUuiT4",
                                            "thumbnail": "https://img.youtube.com/vi/nUom8IUuiT4/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "각성한 살인마에게 겁 없이 시비거는 양아치들 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/k8sTkw6g38c",
                                            "thumbnail": "https://img.youtube.com/vi/k8sTkw6g38c/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "자기방식이 너무 뚜렷한 송촌 ≪살인자o난감 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/yTyyyhnTLXE",
                                            "thumbnail": "https://img.youtube.com/vi/yTyyyhnTLXE/maxresdefault.jpg",
                                            "id": 10
                                    },
                                    {
                                            "title": "#1 웨이브에서 요즘 뜨고 있다는 부산을 배경으로 한 느와르 영화≪영화 뜨거운 피 1분 리뷰≫",
                                            "youtubeUrl": "https://www.youtube.com/shorts/uMOM4GFpOnM",
                                            "thumbnail": "https://img.youtube.com/vi/uMOM4GFpOnM/maxresdefault.jpg",
                                            "id": 11
                                    }
                            ],
                            "subscribers": "6만",
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": []
                    },
                    {
                            "name": "골프성수기",
                            "description": "",
                            "logo": "data:image/jpeg;base64,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",
                            "link": "https://www.youtube.com/@%EA%B3%A8%ED%94%84%EC%84%B1%EC%88%98%EA%B8%B0/featured",
                            "id": 6,
                            "order": 5,
                            "videos": [
                                    {
                                            "title": "EP_26 40억의 사나이 박상현 프로 최강 셀럽 지진희와의 2:2 팀 대결 Full ver.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=ZqDKf_1LVLs",
                                            "thumbnail": "https://img.youtube.com/vi/ZqDKf_1LVLs/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "EP 24_1 소문난 명품 샷! 배우 김래원 강림",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=7sN8vNZOlyI",
                                            "thumbnail": "https://img.youtube.com/vi/7sN8vNZOlyI/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "보기를~ 피하고 싶어서~~ 비 정지훈의 골프실력은??ㅋㅋㅋ",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=FvzLaqFB2aY",
                                            "thumbnail": "https://img.youtube.com/vi/FvzLaqFB2aY/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "드디어 그녀를 모셨습니다...!!ㅣEP2-1 마통배 프로암 팀전 2대2",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=ypqYTCktTFI",
                                            "thumbnail": "https://img.youtube.com/vi/ypqYTCktTFI/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "여보세~요 나야~ 임창정 버디쇼에 넋나가는 성수기즈ㅋㅋㅋㅋ 잠깐... 그 와중에 남프로가 꼴찌??",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=qUD_0-QiD14",
                                            "thumbnail": "https://img.youtube.com/vi/qUD_0-QiD14/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "\"KLPGA 메이저 대회 18홀 12언더\" 라는 신기록을 세운 골프 도사 그녀가 왔다!👊👊 | 전예성 프로",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=MpEy1qqJEdQ",
                                            "thumbnail": "https://img.youtube.com/vi/MpEy1qqJEdQ/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "트러블샷의 귀재! 힘들수록 강한 남자 오지호 full ver.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=LDSnkMqNRqo",
                                            "thumbnail": "https://img.youtube.com/vi/LDSnkMqNRqo/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "지진희 형과 함께하는 여주 360CC 블랙티 이븐챌린지🫠🫠🫠 ⛳EP.1 | 지진희, 이형택, 남영우",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=NGupSUGfiIo",
                                            "thumbnail": "https://img.youtube.com/vi/NGupSUGfiIo/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "신인 여자 프로가 블랙티에서 언더파 플레이를 펼칩니다! 그것도 군산CC토너먼트 코스에서요😯😯😯 ⛳EP.1 | 엄재웅, 윤규미",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=QsupGs_VLnE",
                                            "thumbnail": "https://img.youtube.com/vi/QsupGs_VLnE/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "남영우를 위협하는 미모의 뉴페이스 등장! 물오른 성수기와 함께 남영우를 무너뜨릴 수 있을까? | 송윤아 프로, 남영우 프로",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=AgbiQUaM6LQ",
                                            "thumbnail": "https://img.youtube.com/vi/AgbiQUaM6LQ/maxresdefault.jpg",
                                            "id": 10
                                    }
                            ],
                            "subscribers": "12만",
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": []
                    },
                    {
                            "name": "nomadcoders",
                            "description": "",
                            "logo": "assets/images/unnamed_1.jpg",
                            "subscribers": "50만",
                            "link": "https://www.youtube.com/@nomadcoders/videos",
                            "id": 7,
                            "order": 6,
                            "videos": [
                                    {
                                            "title": "금융의 미래? '디파이'(DeFi)를 꼭 알아야하는 이유!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=vRUn0DB_4PU",
                                            "thumbnail": "https://img.youtube.com/vi/vRUn0DB_4PU/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "암호화폐의 단점? 개발자가 설명해드림!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=ML6-Ncr_TvY",
                                            "thumbnail": "https://img.youtube.com/vi/ML6-Ncr_TvY/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "비트코인. 이더리움의 \"기술적 한계\"를 꼭 알아야 하는 이유!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=mwebn4D75Vg",
                                            "thumbnail": "https://img.youtube.com/vi/mwebn4D75Vg/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "고양이 짤방이 7억? NFT 만드는 방법 설명해드림.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=3K6uDWa2aRw",
                                            "thumbnail": "https://img.youtube.com/vi/3K6uDWa2aRw/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "잃어버린 비트코인? 지갑 원리 제대로 설명해드림!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=4uBWSPw-Vd8",
                                            "thumbnail": "https://img.youtube.com/vi/4uBWSPw-Vd8/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "특정 국가가 비트코인을 무너뜨릴 수 있을까?",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=5Iae7w6hxwg",
                                            "thumbnail": "https://img.youtube.com/vi/5Iae7w6hxwg/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "블록체인. 개발자가 쉽게 설명해드림. 10분컷.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=Ca7Meu4z-F4",
                                            "thumbnail": "https://img.youtube.com/vi/Ca7Meu4z-F4/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "맡기면 이자 준다는 '스테이킹' 제대로 이해하기! 10분컷.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=jhwRtGb5ofs",
                                            "thumbnail": "https://img.youtube.com/vi/jhwRtGb5ofs/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "개발자라면 \"무조건\" 알고리즘 공부를 해야할까?",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=9TyyMtlk5i4",
                                            "thumbnail": "https://img.youtube.com/vi/9TyyMtlk5i4/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "개발자라면 이제는 알아야하는 Big O 설명해드림. 10분컷.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=BEVnxbxBqi8",
                                            "thumbnail": "https://img.youtube.com/vi/BEVnxbxBqi8/maxresdefault.jpg",
                                            "id": 10
                                    },
                                    {
                                            "title": "AI가 나 대신 코딩을? 깃헙 'Copilot' 을 사용해봤다!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=x_Yw2f161CU",
                                            "thumbnail": "https://img.youtube.com/vi/x_Yw2f161CU/maxresdefault.jpg",
                                            "id": 11
                                    },
                                    {
                                            "title": "깃헙 Copilot! 쓰면 고소각이라고?",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=a9349pRiCRk",
                                            "thumbnail": "https://img.youtube.com/vi/a9349pRiCRk/maxresdefault.jpg",
                                            "id": 12
                                    },
                                    {
                                            "title": "개발자라면 꼭 알아야할 Hash Table 의 모든 것!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=HraOg7W3VAM",
                                            "thumbnail": "https://img.youtube.com/vi/HraOg7W3VAM/maxresdefault.jpg",
                                            "id": 13
                                    }
                            ],
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": []
                    },
                    {
                            "name": "축구는장비빨",
                            "description": "",
                            "logo": "data:image/jpeg;base64,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",
                            "subscribers": "11만",
                            "link": "https://www.youtube.com/@bbar_official/videos",
                            "id": 8,
                            "order": 7,
                            "videos": [
                                    {
                                            "title": "하... 아쉽다.. / 프레데터 프릭+ 솔직한 축구화 후기",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=0OqEbS2mHSg",
                                            "thumbnail": "https://img.youtube.com/vi/0OqEbS2mHSg/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "드디어 해외에서 도착한 축구화!! / 나이키 머큐리얼 베이퍼14 엘리트 AG 인조잔디용 축구화 언박싱",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=CNRM-oAE_IU",
                                            "thumbnail": "https://img.youtube.com/vi/CNRM-oAE_IU/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "차이가 보이시나요?? ㄷㄷ | 푸마 퓨처Z FG vs MG",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=CYJ8jxhvAWA",
                                            "thumbnail": "https://img.youtube.com/vi/CYJ8jxhvAWA/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "메시의 마지막 축구화가 출시했습니다... ㄸㄹㄹ | 장비빨뉴스",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=bWIkHhW9bZE",
                                            "thumbnail": "https://img.youtube.com/vi/bWIkHhW9bZE/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "메시에게 초대받은 손흥민 위엄 ㄷㄷ 클라스...!!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=xT7WV75hg7Q",
                                            "thumbnail": "https://img.youtube.com/vi/xT7WV75hg7Q/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "드디어 도착한 손흥민 축구화 !!!! 실물 대박…. | 아디다스 엑스 스피드플로우+ FG 언박싱",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=vcWUB21t5NY",
                                            "thumbnail": "https://img.youtube.com/vi/vcWUB21t5NY/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "장점: 손흥민이 신는다 / 단점: 하..이건좀… / 아디다스 엑스 스피드플로우+ FG 솔직한 리뷰",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=eHt6ts6eOYQ",
                                            "thumbnail": "https://img.youtube.com/vi/eHt6ts6eOYQ/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "충격적인 비주얼의 신상 축구화..ㄷㄷ | 장비빨뉴스",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=2-yLwDpqXsU",
                                            "thumbnail": "https://img.youtube.com/vi/2-yLwDpqXsU/maxresdefault.jpg",
                                            "id": 11
                                    }
                            ],
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": []
                    },
                    {
                            "name": "어썸엔터테이먼트",
                            "description": "",
                            "logo": "assets/images/8a895711-f980-4ba9-979d-df21bf7c5298_rwc_0x0x639x852x640.png",
                            "subscribers": "보다, 어썸코리아, 어썸월드, 기글, 뉴사이드, 헤이데이",
                            "link": "",
                            "isGroup": true,
                            "groupDescription": "보다, 어썸코리아, 어썸월드, 기글, 뉴사이드, 헤이데이등",
                            "subChannels": [
                                    {
                                            "name": "Awesome world 어썸월드",
                                            "subscribers": "130만"
                                    },
                                    {
                                            "name": "어썸코리아 Awesome Korea",
                                            "subscribers": "118만"
                                    },
                                    {
                                            "name": "GIGGLE",
                                            "subscribers": "125만"
                                    },
                                    {
                                            "name": "뉴사이드",
                                            "subscribers": "68만"
                                    },
                                    {
                                            "name": "헤이데이 Heyday",
                                            "subscribers": "28만"
                                    }
                            ],
                            "id": 9,
                            "order": 8,
                            "videos": [
                                    {
                                            "title": "Boys vs Girls Watch Tiktok \"Shoe Flip Challenge\" For The First Time!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=zhMQssI6htg",
                                            "thumbnail": "https://img.youtube.com/vi/zhMQssI6htg/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "Boys vs Girls SWAP THEIR UNDERWEARS",
                                            "youtubeUrl": "youtube.com/watch?v=1UsyxI6duhc&embeds_referring_euri=https%3A%2F%2Fstudiowac.me%2F&source_ve_path=MjM4NTE",
                                            "thumbnail": "https://img.youtube.com/vi/1UsyxI6duhc/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "현재 한국이 180도 완전 바꿔버린 영국 가정집 풍경",
                                            "youtubeUrl": "youtube.com/watch?v=QTNPnpgeVCw&embeds_referring_euri=https%3A%2F%2Fstudiowac.me%2F&source_ve_path=Mjg2NjY",
                                            "thumbnail": "https://img.youtube.com/vi/QTNPnpgeVCw/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "한국 은행에 돈뽑으러 간 독일여자가 한국인을 보고 깜짝 놀란 이유",
                                            "youtubeUrl": "youtube.com/watch?v=kkxhhckl0uY&embeds_referring_euri=https%3A%2F%2Fstudiowac.me%2F&source_ve_path=Mjg2NjY",
                                            "thumbnail": "https://img.youtube.com/vi/kkxhhckl0uY/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "Boy vs Girl react TikTok ONLY GIRLS CAN UNDERSTAND",
                                            "youtubeUrl": "youtube.com/watch?v=GtCFoc0hQKY&embeds_referring_euri=https%3A%2F%2Fstudiowac.me%2F&source_ve_path=Mjg2NjY",
                                            "thumbnail": "https://img.youtube.com/vi/GtCFoc0hQKY/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "주어 없는 밸런스 게임",
                                            "youtubeUrl": "youtube.com/watch?v=wQS2YbH7uGk&embeds_referring_euri=https%3A%2F%2Fstudiowac.me%2F&source_ve_path=Mjg2NjY",
                                            "thumbnail": "https://img.youtube.com/vi/wQS2YbH7uGk/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "유독 외국인들 사이에서 난리인 '겉모습으로 한국인 알아내는 방법'",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=BEiQGyFq0nc",
                                            "thumbnail": "https://img.youtube.com/vi/BEiQGyFq0nc/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "난생 처음 한국 와본 이집트 동생이 한국 길거리에서 대놓고 있는 것에 놀란 이유?",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=qFp5XZS-KQM",
                                            "thumbnail": "https://img.youtube.com/vi/qFp5XZS-KQM/maxresdefault.jpg",
                                            "id": 8
                                    },
                                    {
                                            "title": "ENG) 카시오페아&아미 팬덤 문화 차이를 본 10대가 충격받은 이유!",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=IEaZc7pu9oE&t=2s",
                                            "thumbnail": "https://img.youtube.com/vi/IEaZc7pu9oE/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "점프 하면서 동선 이동 가능? 세븐틴은 가능함.. '세븐틴'의 춤을 본 댄서들 반응",
                                            "youtubeUrl": "youtube.com/watch?v=44wlEuDBwxU&embeds_referring_euri=https%3A%2F%2Fstudiowac.me%2F&source_ve_path=Mjg2NjY",
                                            "thumbnail": "https://img.youtube.com/vi/44wlEuDBwxU/maxresdefault.jpg",
                                            "id": 10
                                    }
                            ]
                    },
                    {
                            "name": "1+1=이다해",
                            "description": "",
                            "logo": "data:image/jpeg;base64,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",
                            "subscribers": "3.5만",
                            "link": "https://www.youtube.com/@leedahaeofficial/videos",
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": [],
                            "id": 10,
                            "order": 9,
                            "videos": [
                                    {
                                            "title": "이다해 상해 집 최초공개(?)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=jHJHslOTGaQ",
                                            "thumbnail": "https://img.youtube.com/vi/jHJHslOTGaQ/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "사랑하는 그레이튼아, 우리 꼭 다시 만나",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=bW42eegkUAw",
                                            "thumbnail": "https://img.youtube.com/vi/bW42eegkUAw/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "“다해야 왜 그랬어?” 시어머니가 그 장면을 보셨습니다",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=cOmUkT_998I",
                                            "thumbnail": "https://img.youtube.com/vi/cOmUkT_998I/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "전세기에서 관광버스춤 췄어요💃🏻",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=aM_k7v47ylg",
                                            "thumbnail": "https://img.youtube.com/vi/aM_k7v47ylg/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "다해가 알려주는 강아지와 함께 상하이 여행 준비, 이것만 따라하면 끝🩵(A부터 Z까지)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=ypf8VjlL2CY",
                                            "thumbnail": "https://img.youtube.com/vi/ypf8VjlL2CY/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "상해 불가리 호텔에 간 해븐부부, 과연 돈값 할까? 직접 체험해봤습니다",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=2_RBLgI_q2M",
                                            "thumbnail": "https://img.youtube.com/vi/2_RBLgI_q2M/maxresdefault.jpg",
                                            "id": 6
                                    },
                                    {
                                            "title": "상하이 NEW 하우스 최초 공개! 드디어 이사 갑니다✨",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=3UNrtqmmchg",
                                            "thumbnail": "https://img.youtube.com/vi/3UNrtqmmchg/maxresdefault.jpg",
                                            "id": 7
                                    },
                                    {
                                            "title": "이다해, 상해에서 역사를 만나다 (임시정부+루쉰공원)",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=0gVnTl4LIwQ",
                                            "thumbnail": "https://img.youtube.com/vi/0gVnTl4LIwQ/maxresdefault.jpg",
                                            "id": 9
                                    },
                                    {
                                            "title": "이다해 중국 라이브 방송 100억의 진실",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=kuzSNA6xvJE",
                                            "thumbnail": "https://img.youtube.com/vi/kuzSNA6xvJE/maxresdefault.jpg",
                                            "id": 10
                                    },
                                    {
                                            "title": "와이탄 말고 치엔탄! 상하이 핫플에서 해븐 커플의 특별한 하루🩵",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=Ntqxg4s54rs",
                                            "thumbnail": "https://img.youtube.com/vi/Ntqxg4s54rs/maxresdefault.jpg",
                                            "id": 11
                                    }
                            ]
                    },
                    {
                            "name": "한성민의 피부인사이드",
                            "description": "",
                            "logo": "assets/images/channels4.jpg",
                            "subscribers": "2만",
                            "link": "https://www.youtube.com/@SkINside-PRISM/videos",
                            "isGroup": false,
                            "groupDescription": "",
                            "subChannels": [],
                            "id": 11,
                            "order": 10,
                            "videos": [
                                    {
                                            "title": "회사 건강검진 그대로 믿었다가 후회합니다.｜의사가 꼭 지키는 5가지 기준",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=eHLpzoZHQZo",
                                            "thumbnail": "https://img.youtube.com/vi/eHLpzoZHQZo/maxresdefault.jpg",
                                            "id": 1
                                    },
                                    {
                                            "title": "애사비로 살 빠진 사람 거의 못 봤습니다｜28년차 내과의사가 알려주는 혈당스파이크 관리",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=f5FtSSxbKTU",
                                            "thumbnail": "https://img.youtube.com/vi/f5FtSSxbKTU/maxresdefault.jpg",
                                            "id": 2
                                    },
                                    {
                                            "title": "모두가 기다린 탈모 정복.. 신약으로 가능할까요?",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=RyNZd1Ose2s",
                                            "thumbnail": "https://img.youtube.com/vi/RyNZd1Ose2s/maxresdefault.jpg",
                                            "id": 3
                                    },
                                    {
                                            "title": "암 수술 이후 오히려 스케줄이 2배가 된 의사",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=WhXm6ylVEdI",
                                            "thumbnail": "https://img.youtube.com/vi/WhXm6ylVEdI/maxresdefault.jpg",
                                            "id": 4
                                    },
                                    {
                                            "title": "28년 차 의사의 암 수술 이후 근황",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=EKz8ucxhZpQ",
                                            "thumbnail": "https://img.youtube.com/vi/EKz8ucxhZpQ/maxresdefault.jpg",
                                            "id": 5
                                    },
                                    {
                                            "title": "제가 생각한 원인은 '이것' 3가지 입니다.",
                                            "youtubeUrl": "https://www.youtube.com/watch?v=GJ9ONuiFTSA",
                                            "thumbnail": "https://img.youtube.com/vi/GJ9ONuiFTSA/maxresdefault.jpg",
                                            "id": 6
                                    }
                            ]
                    }
            ],
            "channelSettings": {
                    "autoSlideInterval": 3000,
                    "showVideoCount": true
            },
            "together": {
                    "intro": "",
                    "members": [
                            {
                                    "id": 1,
                                    "name": "이현석 PD",
                                    "role": "6년차",
                                    "bio": "",
                                    "photo": "",
                                    "skills": []
                            },
                            {
                                    "id": 2,
                                    "name": "장진원 PD",
                                    "role": "5년차",
                                    "bio": "",
                                    "photo": "",
                                    "skills": []
                            }
                    ]
            }
    },

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
