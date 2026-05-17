### 📒 개인 블로그 프로젝트

- `Nuxt 3`와 `Nuxt Content`를 기반으로 구축한 개인 블로그입니다. (Vue.js + Vite 환경에서 마이그레이션)
- 개인적으로 공부한 내용들을 정리하고 있습니다.

<br>

### 🛠 기술 스택

- **Framework:** Nuxt 3 (Vue 3 / Composition API)
- **Content Module:** Nuxt Content v3
- **Deployment:** GitHub Actions & GitHub Pages
- **Styling:** CSS3

<br>

### ⚙️ 프로젝트 구조

```
├── components/     # 공통 및 Content 커스텀 컴포넌트 (ProsePre, ScrollToTop 등)
├── composables/    # 공통 컴포저블 함수 (useToc 등)
├── pages/          # 파일 기반 라우팅 페이지 (목록, 포스트 상세)
├── content/        # 마크다운(.md) 포스트 저장소
├── assets/         # CSS 등 정적 리소스 (main.css, markdown.css)
├── public/         # 파비콘 등 퍼블릭 리소스
└── nuxt.config.ts  # Nuxt 설정 파일
```

<br>

### 🧩 중요 사항

1. 🚀 성능 및 품질 지표 (Lighthouse)

<table role="presentation" border="0" align="center">
  <tr style="border: none;">
    <td align="center" style="border: none; padding: 0 20px;">
      <img src="https://res.cloudinary.com/dqtljpdu0/image/upload/v1774070958/lighthouse-score-bad_irkcsm.png" alt="bad-lighthouse-score" width="220">
    </td>
    <td align="center" style="border: none; vertical-align: middle; padding: 0 20px;">
      <span style="font-size: 40px; color: #58a6ff;">➔</span>
    </td>
    <td align="center" style="border: none; padding: 0 20px;">
      <img src="https://res.cloudinary.com/dqtljpdu0/image/upload/v1774070958/lighthouse-score-good_mqjpy5.png" alt="good-lighthouse-score" width="220">
    </td>
  </tr>
</table>

- **All-Green 달성** : `Performance`와 `SEO` 항목을 보완하여 지표를 100점으로 개선
- **Cloudinary CDN 연동** : 마크다운 내 이미지 리소스를 외부 CDN으로 분리하여 빌드 속도 및 서버 부하 감소
- **반응형 이미지 서빙** : 사용자의 뷰포트 너비를 감지하여 모바일(`w_500`)과 데스크탑(`w_800`)에 최적화된 이미지를 동적으로 주입

<br>

2. 🔍 검색 엔진 최적화 (SEO)

- `@nuxtjs/sitemap` 및 `@nuxtjs/robots` 모듈을 활용하여 빌드 시 사이트맵과 robots.txt 자동 생성
- `useSeoMeta`를 통한 Open Graph, Twitter 태그 및 표준 링크(Canonical URL) 등 메타 데이터 최적화
