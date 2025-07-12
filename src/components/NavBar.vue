<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Usamos o hook useRoute() do Vue Router para obter a rota atual
const route = useRoute();

// Criamos uma propriedade computada que reage a mudanças na rota
const currentRouteName = computed(() => route.name);
</script>

<template>
  <header class="site-header">
    <div class="header-container">
      <router-link class="brand-logo" to="/">
        Skill-E
      </router-link>

      <nav class="header-nav">
        <router-link v-if="currentRouteName !== 'login'" to="/login" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
          <span>Entrar</span>
        </router-link>
        
        <router-link v-if="currentRouteName !== 'register'" to="/register" class="nav-button">
          Registrar-se
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Definição de "Design Tokens" usando Variáveis CSS.
  Mude os valores aqui para alterar o tema do componente facilmente.
*/
.site-header {
  --primary-color: #FF7A00;
  --primary-hover-color: #E66A00;
  --background-header: #F4F7F5;
  --border-color: #DDE2DF;
  --text-primary: #1E1E1E;
  --text-secondary: #6C757D;

  --font-main: "Inter", sans-serif;

  --button-padding-y: 0.6rem;  /* Padding vertical do botão */
  --button-padding-x: 1.25rem; /* Padding horizontal do botão */
  --button-radius: 6px;
}

.site-header {
  background-color: var(--background-header);
  border-bottom: 2px solid var(--border-color);
  padding: 0.8rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.brand-logo:hover {
  color: var(--primary-color);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: var(--button-padding-y) 0; /* Alinha altura com o botão */
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-icon {
  stroke: var(--text-secondary);
  transition: stroke 0.3s ease;
}

.nav-link:hover .nav-icon {
  stroke: var(--text-primary);
}

.nav-button {
  background-color: var(--primary-color);
  color: var(--text-primary);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-radius);
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent; /* Borda transparente para não "pular" no hover */
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: var(--primary-hover-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(138, 43, 226, 0.4);
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .header-container {
    padding: 0 15px;
  }
  .brand-logo {
    font-size: 1.3rem;
  }
  .nav-link span {
    display: none; /* Esconde o texto "Entrar" e deixa só o ícone */
  }
  .header-nav {
    gap: 1rem;
  }
  .nav-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style>