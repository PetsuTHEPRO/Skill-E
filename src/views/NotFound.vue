<template>
  <div class="construction-404">
    <div class="content-wrapper">
      <svg
        class="cone-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M19.2929 20.7071C19.4804 20.9-1.99222e-07 21 1.79289 21H22.2071C24 21 24.5196 20.9 24.7071 20.7071C24.8946 20.5196 25 20 23 18L18 8H6L1 18C-1 20 -0.894615 20.5196 -0.707107 20.7071C-0.519599 20.9 8.99999 21 1.79289 21"
          stroke="#000"
          stroke-width="0"
        />
        <path d="M5 6H19L20 2H4L5 6Z" fill="#FFFFFF" />
        <path d="M9 12H15L16 8H8L9 12Z" fill="#FFFFFF" />
        <path d="M13 18H11L10 14H14L13 18Z" fill="#FFFFFF" />
      </svg>

      <h1>Erro 404: Projeto Não Encontrado</h1>
      <p>
        Nossos engenheiros não encontraram a planta para esta página. O endereço
        pode ter sido demolido, arquivado ou simplesmente nunca existiu.
      </p>

      <router-link to="/" class="btn-home">
        Voltar ao Canteiro Principal
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Usando <script setup> para uma sintaxe mais moderna e limpa no Vue 3.
// Nenhum script adicional é necessário para esta página estática.
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

.construction-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #f4f6f8; /* Um cinza claro, cor de concreto */
  font-family: "Poppins", sans-serif;
  padding: 2rem;
  box-sizing: border-box;
}

.content-wrapper {
  text-align: center;
  max-width: 600px;
}

.cone-icon {
  width: 120px;
  height: 120px;
  color: #ffc107; /* Amarelo construção */
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.75rem;
  font-weight: 700;
  color: #1a202c; /* Um preto suave */
  margin: 0 0 1rem 0;
}

p {
  font-size: 1.1rem;
  color: #4a5568; /* Cinza escuro para o texto */
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.btn-home {
  display: inline-block;
  background-color: #ffc107; /* Amarelo construção */
  color: #1a202c;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  border: 2px solid transparent;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.btn-home:hover {
  transform: translateY(-3px);
  background-color: #ffca2c;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .cone-icon {
    width: 100px;
    height: 100px;
  }
}
</style>
