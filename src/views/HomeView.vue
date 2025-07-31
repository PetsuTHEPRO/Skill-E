<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <main class="landing-page">
    <NavBar />
    <section class="hero-section">
      <div class="container hero-layout">
        <div class="hero-text">
          <h1>
            Desbloqueie o Potencial da sua Equipe com
            <span class="gradient-text">Simulações em VR</span>
          </h1>
          <p>
            O Skill-E é a plataforma definitiva para criar, gerenciar e implantar treinamentos imersivos. Dê autonomia para seus instrutores e acelere a inovação.
          </p>
        </div>
      </div>
    </section>

    <section class="download-section">
      <div class="container download-content">
        <h2 class="section-title">Pronto para Construir?</h2>
        <p class="section-subtitle">
          Baixe a aplicação cliente da Unity para começar a testar e visualizar
          seus cenários criados no Skill-E.
        </p>
        <a
          href="/caminho/para/seu/aplicativo.zip"
          download
          class="download-button"
        >
          <img
            src="@/assets/download-icon.svg"
            alt="Ícone de Download"
            class="download-icon"
          />
          <span>Download da Aplicação Unity</span>
        </a>
        <p class="download-note">
          Disponível para Windows, macOS e Linux. <br />Requer Unity Editor
          2022.3+ para desenvolvimento.
        </p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-left">
        <p>
          &copy; {{ new Date().getFullYear() }} Skill-E — Desenvolvido com
          <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js</a>
          | Criado por
          <a href="#" target="_blank" rel="noopener noreferrer">Sua Empresa/Nome</a>
        </p>
      </div>
      <div class="footer-right">
        <nav class="footer-nav">
          <a href="#">Instruções</a>
          <a href="#">Guia de Estilo</a>
          <a href="#">Licenças</a>
        </nav>
        <div class="social-icons">
          <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.585-.011-4.85-.069c-3.252-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z"/></svg>
          </a>
          <a href="#" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.044 6.817h-3.308l7.73-8.805-7.993-10.69h6.77l4.61 6.245 5.46-6.245zm-1.161 17.52h1.839l-10.542-14.03h-1.95l10.653 14.03z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
/* Estilos Globais */
.landing-page {
  background-color: var(--background-color);
  color: var(--text-primary);
  font-family: var(--font-main);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

/* 1. Hero Section */
.hero-section {
  padding: 8rem 0; /* Aumentado padding para mais espaço vertical */
  background: 
    linear-gradient(rgba(20, 20, 20, 0.85), rgba(20, 20, 20, 0.85)),
    url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
}
.hero-layout {
  /* Centraliza o conteúdo de texto vertical e horizontalmente */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.hero-text h1 {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  color: #FFFFFF;
}
.gradient-text {
  background: linear-gradient(to right, var(--primary-color), var(--primary-hover-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-text p {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  max-width: 600px; /* Aumentado para melhor leitura centralizada */
  color: #FFFFFF;
  margin-left: auto;
  margin-right: auto;
}

/* 2. Seção de Download */
.download-section {
  background-color: var(--background-color);
  padding: 6rem 20px;
  text-align: center;
  border-top: 1px solid var(--border-color);
}
.download-content {
  max-width: 700px;
  margin: 0 auto;
}
.download-content .section-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}
.download-content .section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}
.download-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: var(--primary-color);
  color: #ffffff;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.download-button:hover {
  background-color: var(--primary-hover-color);
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.download-icon {
  width: 24px;
  height: 24px;
}
.download-note {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 1.5rem;
}

/* 3. Footer */
.site-footer {
  background-color: var(--background-deep-color);
  color: var(--text-secondary);
  padding: 2rem 0;
  font-family: var(--font-main);
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}
.footer-left p {
  margin: 0;
}
.footer-right {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}
.footer-nav {
  display: flex;
  gap: 20px;
}
.site-footer a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}
.site-footer a:hover {
  color: var(--primary-color);
}
.social-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}
.social-icons a:hover svg {
  fill: var(--primary-color);
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 2.5rem;
  }
  .footer-container {
    flex-direction: column;
    gap: 25px;
  }
}
</style>