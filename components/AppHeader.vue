<template>
  <header>
    <h1>My Blog</h1>

    <nav>
      <NuxtLink to="/">Home</NuxtLink>

      <a
        href="https://github.com/jinwoojwa"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>

      <a
        href="https://jinwoojwa.github.io/portfolio/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Portfolio
      </a>
    </nav>
  </header>
</template>

<style scoped>
header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  font-size: 2.5rem;
}

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

nav a.router-link-active:hover {
  color: #58a6ff;
}

@media (max-width: 600px) {
  header h1 {
    font-size: 2rem;
  }
}
</style>
