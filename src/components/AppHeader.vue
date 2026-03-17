<template>
  <header>
    <h1>My Blog</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <a
        href="https://github.com/jinwoojwa"
        target="_blank"
        rel="noopener noreferrer"
        >GitHub</a
      >
      <a
        href="https://jinwoojwa.github.io/portfolio/"
        target="_blank"
        rel="noopener noreferrer"
        >Portfolio</a
      >
    </nav>
  </header>
</template>

<style scoped>
/* ===============================
   Header (사이트 상단 영역)
   =============================== */

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  font-size: 2.5rem;
}

/* ===============================
   Navigation Links (Header Nav)
   =============================== */
nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #c9d1d9;
  font-size: 1.1rem;
  transition: color 0.2s ease;
}

nav a:hover {
  color: #58a6ff;
  text-decoration: none;
}

nav a.router-link-active {
  color: #c9d1d9;
}

/* 활성화된 상태에서도 호버 시에는 파란색이 되도록 설정 */
nav a.router-link-active:hover {
  color: #58a6ff;
}

/* ===============================
   반응형 스타일 (모바일 대응)
   =============================== */
@media (max-width: 600px) {
  header h1 {
    font-size: 2rem;
  }
}
</style>
