<template>
  <div class="mobile-nav d-lg-none">
    <button @click="isOpen = true" class="btn-menu-toggle">
      <i class="bi bi-list"></i>
    </button>

    <teleport to="body">
      <div v-if="isOpen" class="offcanvas-container">
        <div class="offcanvas-backdrop" @click="isOpen = false"></div>

        <nav :class="['offcanvas-menu', { 'is-open': isOpen }]">
          <div class="menu-header">
            <h5 class="menu-title">Menu</h5>
            <button @click="isOpen = false" class="btn-close-menu">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <ul class="nav-list">
            <li
              v-for="(item, index) in menuItems"
              :key="item.rota"
              :style="{ animationDelay: `${index * 50 + 100}ms` }"
            >
              <router-link
                :to="{ name: item.rota }"
                class="nav-link"
                active-class="active"
                @click="isOpen = false"
              >
                <i :class="item.icon" class="nav-icon"></i>
                <span>{{ item.text }}</span>
              </router-link>
            </li>
          </ul>

          <div class="menu-footer">
            <button class="nav-link logout-btn" @click="sair">
              <i class="bi bi-box-arrow-right nav-icon"></i>
              <span>Sair</span>
            </button>
          </div>
        </nav>
      </div>
    </teleport>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isOpen: false,
      menuItems: [
        { text: "Dashboard", icon: "bi bi-grid-1x2-fill", rota: "dashboard" },
        { text: "Simulações", icon: "bi bi-easel2-fill", rota: "listSimulations" },
        { text: "Perfil", icon: "bi bi-person-fill", rota: "profile" },
        { text: "Suporte", icon: "bi bi-question-circle-fill", rota: "support" },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
    sair() {
      this.isOpen = false;
      this.logout();
      this.$router.push({ name: "login" });
    },
  },
  watch: {
    // Observa a variável 'isOpen' para controlar o scroll da página
    isOpen(newVal) {
      if (newVal) {
        // Adiciona uma classe ao body para impedir a rolagem
        document.body.classList.add("no-scroll");
      } else {
        // Remove a classe quando o menu fecha
        document.body.classList.remove("no-scroll");
      }
    },
    // Fecha o menu se a rota mudar
    $route() {
      this.isOpen = false;
    },
  },
  // Garante que a classe seja removida se o componente for destruído
  beforeUnmount() {
    document.body.classList.remove("no-scroll");
  },
};
</script>


<style>
body.no-scroll {
  overflow: hidden;
}
</style>

<style scoped>
/* Animação para os itens do menu entrarem em cascata */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* O botão de toggle continua sendo posicionado normalmente */
.btn-menu-toggle {
  background-color: transparent;
  border: none;
  color: #343a40;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Fundo escuro que cobre a página */
.offcanvas-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100; /* Z-index alto */
  transition: opacity 0.3s ease;
}

/* O container do menu lateral */
.offcanvas-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1200; /* Z-index MAIS ALTO que o backdrop */
  transform: translateX(-100%); /* Começa escondido à esquerda */
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Estado aberto do menu */
.offcanvas-menu.is-open {
  transform: translateX(0);
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
}

.menu-title {
  margin: 0;
  font-weight: 600;
  color: #212529;
}

.btn-close-menu {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6c757d;
  padding: 0.5rem;
  line-height: 1;
}

.nav-list {
  list-style: none;
  padding: 1rem;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto; /* Adiciona scroll se os itens não couberem */
}

.nav-list li {
  opacity: 0; /* Começa invisível para a animação */
}

.is-open .nav-list li {
  animation: slideIn 0.3s ease-out forwards;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  color: #495057;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #000;
}

/* Estilo do link ativo */
.nav-link.active {
  background: linear-gradient(90deg, #ff7a00, #ff9a28);
  color: white;
  font-weight: 600;
}

.nav-icon {
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
}

.menu-footer {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
}

.logout-btn {
  width: 100%;
  justify-content: flex-start;
  color: #dc3545;
}
.logout-btn:hover {
  background-color: #fbebee;
}
</style>