<template>
  <div class="container error-page">
    <h1>404</h1>
    <p>존재하지 않는 페이지입니다.</p>
    <router-link to="/">홈으로 돌아가기</router-link>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
  padding: 100px 20px;
}
.error-page h1 {
  font-size: 4rem;
  color: #cf222e;
}
</style>
