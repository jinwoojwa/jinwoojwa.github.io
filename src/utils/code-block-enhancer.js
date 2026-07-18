export function enhanceCodeBlocks() {
  const article = document.querySelector('.markdown-body');
  if (!article) return;

  const codeBlocks = article.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // 이미 처리된 블록은 건너뜀
    if (pre.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }

    const code = pre.querySelector('code');
    const langClass = code
      ? Array.from(code.classList).find((c) => c.startsWith('language-'))
      : null;
    const language = langClass ? langClass.replace('language-', '') : 'shell';

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    const header = document.createElement('div');
    header.className = 'code-block-header';

    const langSpan = document.createElement('span');
    langSpan.className = 'code-block-language';
    langSpan.textContent = language;

    const copyButton = document.createElement('button');
    copyButton.className = 'code-block-copy-button';
    copyButton.textContent = 'Copy';

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.innerText).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });

    header.appendChild(langSpan);
    header.appendChild(copyButton);

    // pre 요소를 wrapper로 감싸기
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
}
