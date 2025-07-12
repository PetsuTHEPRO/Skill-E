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
        <div class="hero-form">
          <form class="contact-form">
            <h3>Solicite uma Demonstração</h3>
            <p>Converse com um de nossos especialistas.</p>
            <div class="form-group">
              <label for="name">Nome Completo</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div class="form-group">
              <label for="email">E-mail Corporativo</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="company">Empresa</label>
              <input type="text" id="company" name="company" />
            </div>
            <button type="submit" class="form-button">Enviar Solicitação</button>
          </form>
        </div>
      </div>
    </section>

    <div class="company-ticker">
      <div class="ticker-track">
        <span>EMPRESA A</span><span>INOVATEC</span><span>SOLUTION CO.</span><span>GRUPO FUTURO</span><span>TECHCORP</span>
        <span>EMPRESA A</span><span>INOVATEC</span><span>SOLUTION CO.</span><span>GRUPO FUTURO</span><span>TECHCORP</span>
      </div>
    </div>

    <section class="features-section">
      <div class="container">
        <h2 class="section-title">A plataforma completa para criação de cenários VR</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="icon">🎨</div>
            <h3>Editor 3D na Web</h3>
            <p>Crie e posicione objetos em um ambiente 3D intuitivo com "arrastar e soltar", sem precisar de software complexo.</p>
          </div>
          <div class="feature-card">
            <div class="icon">🚀</div>
            <h3>Implantação Instantânea</h3>
            <p>Exporte cenários como JSON e carregue-os dinamicamente na sua aplicação Unity, sem necessidade de recompilar.</p>
          </div>
          <div class="feature-card">
            <div class="icon">🧩</div>
            <h3>Biblioteca de Assets</h3>
            <p>Utilize uma coleção de objetos 3D otimizados para VR, prontos para uso em seus projetos de treinamento.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pricing-section">
      <div class="container">
        <h2 class="section-title">Planos e Soluções para sua Empresa</h2>
        <div class="pricing-grid">
          <div class="plan-card">
            <h3>Essencial</h3>
            <p class="price">R$ 499<span>/mês</span></p>
            <p class="plan-desc">Para equipes pequenas e projetos iniciais.</p>
            <ul>
              <li>✓ 10 Usuários Editores</li>
              <li>✓ 50 Cenários Ativos</li>
              <li>✓ Biblioteca Padrão de Assets</li>
              <li>✓ Suporte via E-mail</li>
            </ul>
            <button class="btn-secondary">Começar Agora</button>
          </div>
          <div class="plan-card popular">
            <div class="popular-badge">MAIS POPULAR</div>
            <h3>Profissional</h3>
            <p class="price">R$ 999<span>/mês</span></p>
            <p class="plan-desc">A solução ideal para empresas em crescimento.</p>
            <ul>
              <li>✓ 50 Usuários Editores</li>
              <li>✓ Cenários Ilimitados</li>
              <li>✓ Importação de Assets Próprios</li>
              <li>✓ Suporte Prioritário 24/7</li>
            </ul>
            <button class="btn-primary">Escolher Plano</button>
          </div>
          <div class="plan-card">
            <h3>Enterprise</h3>
            <p class="price">Customizado</p>
            <p class="plan-desc">Para grandes corporações com necessidades únicas.</p>
            <ul>
              <li>✓ Tudo do Profissional</li>
              <li>✓ Segurança Avançada (SSO)</li>
              <li>✓ Gerente de Conta Dedicado</li>
              <li>✓ Integrações Personalizadas</li>
            </ul>
            <button class="btn-secondary">Entre em Contato</button>
          </div>
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
:root {
  --background-color: #F4F7F5;   /* Cinza Claro (Fundo) */
  --background-deep-color: #DDE2DF;
  --surface-color: #FFFFFF;      /* Branco (Cards e superfícies) */
  --primary-color: #FF7A00;      /* Laranja Industrial (Botões e CTAs) */
  --primary-hover-color: #E66A00;/* Laranja mais escuro para hover */
  --border-color: #DDE2DF;       /* Borda sutil para formulários */
  --text-primary: #1E1E1E;       /* Cinza Escuro (Texto principal) */
  --text-secondary: #6C757D;    /* Cinza médio para textos secundários */
  --font-main: "Inter", sans-serif;
}

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
  padding: 6rem 0;background: 
    /* 1. A camada de sobreposição (um gradiente escuro semi-transparente) */
    linear-gradient(rgba(20, 20, 20, 0.85), rgba(20, 20, 20, 0.85)),
    /* 2. A sua imagem de fundo */
    url('@/assets/background.jpg');

  background-size: cover; /* Garante que a imagem cubra toda a área */
  background-position: center; /* Centraliza a imagem */
}
.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}
.hero-text h1 {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
}
.gradient-text {
  /* Um gradiente que vai do laranja principal para o laranja de hover */
  background: linear-gradient(to right, var(--primary-color), var(--primary-hover-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-text p {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  max-width: 500px;
}

.hero-section h1, .hero-section p {
  color: #FFFFFF; /* O texto PRECISA ser branco para contrastar */
}

/* Formulário de Contato */
.contact-form {
  background-color: var(--surface-color);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}
.contact-form h3 {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}
.contact-form p {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}
.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 1rem;
}
.form-button {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}
.form-button:hover {
  background-color: var(--primary-hover-color);
}


/* Ticker de Empresas */
.company-ticker {
  background-color: var(--background-color);
  padding: 1.5rem 0;
  white-space: nowrap;
  overflow: hidden;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}
.ticker-track {
  display: inline-block;
  animation: scroll 30s linear infinite;
}
.ticker-track span {
  display: inline-block;
  color: var(--text-secondary); 
  font-weight: 600;
  font-size: 1.2rem;
  text-transform: uppercase;
  margin: 0 40px;
}
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* 2. Features Section */
.features-section {
  padding: 6rem 0;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.feature-card {
  background-color: var(--surface-color);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-align: center;
}
.feature-card .icon { font-size: 2.5rem; margin-bottom: 1rem; }
.feature-card h3 { font-size: 1.3rem; margin-bottom: 0.5rem; }
.feature-card p { color: var(--text-secondary); }


/* 3. Pricing Section */
.pricing-section {
  padding: 6rem 0;
  background-color: var(--surface-color);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: center;
}
.plan-card {
  background-color: var(--surface-color);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.plan-card:hover { transform: translateY(-10px); }
.plan-card h3 { font-size: 1.5rem; color: var(--primary-color); }
.plan-card .price {
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
}
.plan-card .price span { font-size: 1rem; font-weight: normal; color: var(--text-secondary); }
.plan-card .plan-desc { color: var(--text-secondary); min-height: 40px; }
.plan-card ul { list-style: none; padding: 0; margin: 2rem 0; text-align: left; }
.plan-card ul li { margin-bottom: 1rem; }
.plan-card.popular {
  transform: scale(1.05);
  border: 2px solid var(--primary-color);
  position: relative;
}
.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: bold;
}
.btn-secondary {
  width: 100%;
  padding: 1rem;
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-primary {
  width: 100%;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}


/* Responsividade */
@media (max-width: 992px) {
  .hero-layout, .features-grid, .pricing-grid {
    grid-template-columns: 1fr;
  }
  .hero-text { text-align: center; }
  .hero-text p { margin-left: auto; margin-right: auto; }
}

/* Estilos da Seção de Download */
.download-section {
  background-color: var(--background-color); /* Fundo branco para destaque */
  padding: 6rem 20px;
  text-align: center;
  border-top: 1px solid var(--border-color); /* Separação suave */
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
  color: var(--text-secondary); /* <-- USAR VARIÁVEL */
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

/* Reutilize o estilo do botão primário que você já criou! */
.download-button {
  /* Estilização para o link se parecer com um botão */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: var(--primary-color); /* <-- USAR VARIÁVEL */
  color: #ffffff;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border: none; /* <-- REMOVER BORDA DESNECESSÁRIA */
  cursor: pointer;
  transition: all 0.3s ease;
}

.download-button:hover {
  background-color: var(--primary-hover-color); /* <-- USAR VARIÁVEL */
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Sombra mais suave */
}

.download-icon {
  width: 24px;
  height: 24px;
}

.download-note {
  font-size: 0.9rem;
  color: var(--text-secondary); /* <-- USAR VARIÁVEL */
  margin-top: 1.5rem;
}

/* Adicione estes estilos ao seu componente */
.site-footer {
  background-color: var(--background-deep-color); /* Usa o cinza escuro da nossa paleta */
  color: var(--text-secondary); /* Cor de texto padrão */
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
  flex-wrap: wrap; /* Para telas menores */
  gap: 20px;
}

.footer-left p {
  margin: 0;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 30px; /* Espaço entre os links de navegação e os ícones */
  flex-wrap: wrap;
}

.footer-nav {
  display: flex;
  gap: 20px;
}

.site-footer a {
  color: var(--text-secondary); /* Cor dos links */
  text-decoration: none;
  transition: color 0.3s ease;
}

.site-footer a:hover {
  color: var(--primary-color); /* Link hover com a cor da marca */
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.social-icons a {
  display: inline-block;
}

.social-icons svg {
  display: block;
  transition: fill 0.3s ease;
}

.social-icons a:hover svg {
  fill: var(--primary-color); /* Ícones hover com a cor da marca */
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 25px;
  }
}
</style>