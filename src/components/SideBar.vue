<template>
  <nav :class="['sidebar d-flex flex-column', { 'sidebar-closed': !isOpen }]">
    <div class="sidebar-header d-flex w-100 align-items-center p-3">
      <h3 v-if="isOpen" class="fw-bold fs-5 m-0 me-auto">Seu Painel</h3>
      <button @click="toggleSidebar" class="btn-toggle d-flex align-items-center justify-content-center">
        <i :class="isOpen ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
      </button>
    </div>

    <ul class="nav flex-column p-2 flex-grow-1">
      <li class="nav-item" v-for="item in menuItems" :key="item.text">
        <router-link :to="`/${item.rota}`" active-class="active-link" class="nav-link d-flex align-items-center">
          <i :class="item.icon" class="nav-icon"></i>
          <span v-show="isOpen" class="ms-3">{{ item.text }}</span>
        </router-link>
      </li>
    </ul>

    <div class="sidebar-footer p-2">
      <button @click="sair" class="nav-link d-flex align-items-center w-100">
        <i class="bi bi-box-arrow-right nav-icon"></i>
        <span v-show="isOpen" class="ms-3">Sair</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Cookie from "@/service/CookiesService.js";

export default {
  data() {
    return {
      role: Cookie.getRole() || 'dashboard', // Adicionado fallback
      // Itens de menu podem ser dinâmicos com base na role
      menuItems: [
        { text: 'Dashboard', icon: 'bi bi-grid-1x2-fill', rota: '' },
        { text: 'Minhas Simulações', icon: 'bi bi-easel2-fill', rota: 'classes' },
        { text: 'Perfil', icon: 'bi bi-person-fill', rota: 'profile' },
        { text: 'Relatórios', icon: 'bi bi-graph-up', rota: 'reports' },
        { text: 'Suporte', icon: 'bi bi-question-circle-fill', rota: 'support' },
      ],
    };
  },
  computed: {
    // Mapeia o estado do Vuex de forma reativa e correta
    ...mapState({
      isOpen: (state) => state.isSidebarOpen,
    }),
  },
  methods: {
    // Mapeia actions do Vuex
    ...mapActions(["logout"]),

    toggleSidebar() {
      // CORREÇÃO: Chama a mutação para alterar o estado, em vez de fazer diretamente
      this.$store.commit('TOGGLE_SIDEBAR');
    },

    sair() {
      this.logout();
      // CORREÇÃO: Usa 'replace' para navegação, ideal para logout.
      this.$router.replace({ name: "home" });
    },
  },
};
</script>

<style scoped>
/* Utiliza as mesmas variáveis do seu dashboard para consistência */
.sidebar {
  width: 250px;
  background-color: var(--surface-color);
  color: var(--text-primary);
  transition: width 0.3s ease-in-out;
  border-right: 1px solid var(--border-color);
  z-index: 1000;
}

.sidebar-closed {
  width: 80px;
}

.sidebar-header {
  height: 70px; /* Altura consistente com a MenuBar */
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  color: var(--text-primary);
  white-space: nowrap; /* Impede a quebra de linha durante a animação */
}

.btn-toggle {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: none;
    color: var(--text-secondary);
    background-color: var(--background-deep-color);
    transition: color 0.2s, background-color 0.2s;
}
.btn-toggle:hover {
    color: var(--text-primary);
    background-color: var(--border-color);
}

.nav-link, .sidebar-footer button {
  color: var(--text-secondary);
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
}
/* Estilo para quando o mouse passa por cima do link */
.nav-link:hover, .sidebar-footer button:hover {
  background-color: var(--background-color);
  color: var(--text-primary);
}

/* Estilo para o link ativo (página atual) */
.active-link {
  background-color: var(--primary-color) !important;
  color: white !important;
}

.nav-icon {
  font-size: 1.25rem;
}

.sidebar-footer button {
  background: none;
  border: none;
  text-align: left;
}
</style>