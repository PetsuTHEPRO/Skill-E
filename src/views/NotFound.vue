<!-- src/components/NotFound.vue ou src/views/NotFound.vue -->
<template>
    <div class="not-found w-100">
      <h1>ERROR 404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <router-link to="/">Voltar para a página inicial</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "NotFound"
  };
  </script>
  
  <style scoped>
  .not-found {
    background-color: #121214;
    text-align: center;
    color: white;
    min-height: 100vh;
    padding-top: 50px;
  }
  
  .not-found h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .not-found p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .not-found a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  