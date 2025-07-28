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
        <router-link :to="{ name: item.rota }" active-class="active-link" class="nav-link d-flex align-items-center">
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
        { text: 'Dashboard', icon: 'bi bi-grid-1x2-fill', rota: 'dashboard' },
        { text: 'Minhas Simulações', icon: 'bi bi-easel2-fill', rota: 'listSimulations' },
        { text: 'Perfil', icon: 'bi bi-person-fill', rota: 'profile' },
        { text: 'Relatórios', icon: 'bi bi-graph-up', rota: 'simulation-manager' },
        { text: 'Suporte', icon: 'bi bi-question-circle-fill', rota: 'support' },
      ],
    };
  },
  computed: {
    ...mapState({
      isOpen: (state) => state.isSidebarOpen,
    }),
  },
  methods: {
    ...mapActions(["logout"]),

    toggleSidebar() {
      this.$store.commit('TOGGLE_SIDEBAR');
    },

    sair() {
      this.logout();
      this.$router.replace({ name: "home" });
    },
  },
};
</script>

<style scoped>
/* Estilos com cores fixas para o tema light, sem variáveis. */
.sidebar {
  position: fixed; 
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #FFFFFF; /* Fundo branco para a sidebar */
  color: #1D1D1F; /* Cor de texto primária */
  transition: width 0.3s ease-in-out;
  border-right: 1px solid #EAEAEA; /* Borda cinza clara */
  z-index: 1000;
}

.sidebar-closed {
  width: 80px;
}

.sidebar-header {
  height: 70px;
  border-bottom: 1px solid #EAEAEA; /* Borda cinza clara */
}

.sidebar-header h3 {
  color: #1D1D1F; /* Cor de texto primária */
  white-space: nowrap;
}

.btn-toggle {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: none;
    color: #5A5A5A; /* Cor de texto secundária */
    background-color: #F5F5F7; /* Fundo cinza bem claro */
    transition: color 0.2s, background-color 0.2s;
}
.btn-toggle:hover {
    color: #1D1D1F;
    background-color: #EAEAEA;
}

.nav-link, .sidebar-footer button {
  color: #5A5A5A; /* Cor de texto secundária */
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
}
.nav-link:hover, .sidebar-footer button:hover {
  background-color: #F5F5F7; /* Fundo cinza claro para hover */
  color: #1D1D1F;
}

/* Estilo para o link ativo (página atual) usa a cor de destaque */
.active-link {
  background-color: #FF7A00 !important; /* Cor de destaque laranja */
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