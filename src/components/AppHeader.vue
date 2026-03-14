<template>
  <header>
    <h1>My Blog</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
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
  color: #58a6ff;
}

nav a:hover {
  text-decoration: underline;
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
