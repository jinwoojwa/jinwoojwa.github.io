import { nextTick } from 'vue';

export function useCodeBlock() {
  // 복사/체크 SVG 아이콘 설정
  const copyIcon = `<svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>`;
  const checkIcon = `<svg height="16" viewBox="0 0 16 16" width="16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>`;

  const enhanceCodeBlocks = async () => {
    await nextTick();

    document.querySelectorAll('.markdown-body pre').forEach((pre) => {
      // 이미 처리된 코드 블록이거나 wrapper로 감싸진 경우 스킵
      if (
        pre.parentNode.classList.contains('code-wrapper') ||
        pre.querySelector('.copy-btn')
      )
        return;

      // 가로 스크롤 시 배지와 버튼이 함께 움직이지 않도록 고정용 Wrapper 생성
      const wrapper = document.createElement('div');
      wrapper.classList.add('code-wrapper');

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // 언어 배지(Language Badge) 생성
      const codeElement = pre.querySelector('code');
      if (codeElement) {
        const langClass = Array.from(codeElement.classList).find(
          (c) => c !== 'hljs',
        );

        if (langClass) {
          const lang = langClass.replace(/^language-/, '');
          const badge = document.createElement('div');
          badge.classList.add('lang-badge');
          badge.innerText = lang;
          wrapper.appendChild(badge);
        }
      }

      const btn = document.createElement('button');
      btn.classList.add('copy-btn');
      btn.innerHTML = copyIcon;
      btn.setAttribute('aria-label', 'Copy Code');

      // 버튼 클릭 이벤트
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
          btn.innerHTML = checkIcon;
          btn.classList.add('copied'); // 성공 클래스 추가
          setTimeout(() => {
            btn.innerHTML = copyIcon;
            btn.classList.remove('copied'); // 원상복구
          }, 2000);
        });
      });

      wrapper.appendChild(btn);
    });
  };

  return { enhanceCodeBlocks };
}
