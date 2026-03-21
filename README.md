### 📒 개인 블로그 프로젝트

- `Vue.js`와 `Vite`를 기반으로 구축한 개인 블로그입니다.
- 개인적으로 공부한 내용들을 정리하고 있습니다.

<br>

### 🛠 기술 스택

- **Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Deployment:** GitHub Actions & GitHub Pages
- **Styling:** CSS3

<br>

### ⚙️ 프로젝트 구조

```
src/
├── components/     # 공통 컴포넌트 (Nav, Footer, TagFilter 등)
├── pages/          # 페이지 컴포넌트 (Home, PostDetail)
├── utils/          # 유틸리티 함수 (Post Data 처리, 정렬 등)
├── posts/          # 마크다운(.md) 포스트 저장소
└── assets/         # CSS 스타일 리소스
public/             # robots.txt, image, favicon
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

- 빌드 시 Node.js 스크립트를 통해 모든 포스트의 경로를 포함한 `sitemap.xml` 자동 생성
