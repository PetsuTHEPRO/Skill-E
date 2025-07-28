<template>
  <header class="stylish-header">
    <div class="header-left">
      <SidebarMobile />
      <div class="header-title-wrapper">
        <i class="bi bi-box-seam-fill header-icon"></i>
        <span class="header-title">Simulações</span>
      </div>
    </div>

    <div class="profile-menu-wrapper" ref="profileMenu">
      <button class="profile-btn" @click="toggleDropdown">
        <img
          width="40"
          height="40"
          :src="`https://api.dicebear.com/8.x/initials/svg?seed=${name}`"
          alt="Foto de perfil"
        />
      </button>

      <transition name="dropdown-fade">
        <div v-if="isDropdownOpen" class="profile-dropdown">
          <div class="dropdown-header">
            <strong>{{ name }}</strong>
          </div>
          <ul class="dropdown-list">
            <li>
              <a href="/perfil" class="dropdown-item">
                <i class="bi bi-person-circle"></i>
                <span>Meu Perfil</span>
              </a>
            </li>
            <li>
              <button @click="logout" class="dropdown-item as-button">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sair</span>
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import SidebarMobile from "@/components/SidebarMobile.vue";
import CookiesService from "@/service/CookiesService";
import store from "@/store/index.js";

export default {
  name: "MenuBar",
  components: { SidebarMobile },
  data() {
    return {
      name: CookiesService.getName() || "User",
      isDropdownOpen: false,
    };
  },
  methods: {
    openMenu() {
      store.state.isSidebarOpen = !store.state.isSidebarOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown(event) {
      if (this.$refs.profileMenu && !this.$refs.profileMenu.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    logout() {
      console.log("Usuário deslogado!");
      // Aqui você adicionaria a lógica para limpar os cookies e redirecionar
      // CookiesService.clearAll();
      // this.$router.push('/login');
      this.isDropdownOpen = false;
    },
  },
  mounted() {
    // Adiciona um listener para fechar o dropdown ao clicar fora
    document.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    // Remove o listener para evitar memory leaks
    document.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
/* --- VARIÁVEIS DE COR (TEMA CONSTRUÇÃO) --- */
:root {
  --header-bg: #FFFFFF;
  --header-border: #EAECEE;
  --text-primary: #2C3E50;
  --text-secondary: #808B96;
  --accent-primary: #FF7A00; /* Laranja Construção */
  --accent-secondary: #00529B; /* Azul Técnico */
}

/* --- ESTILO DO HEADER --- */
.stylish-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  background-color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 100;
  font-family: "Inter", sans-serif;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title-wrapper {
  display: none;
  align-items: center;
  gap: 0.75rem;
}

@media (min-width: 992px) {
  .header-title-wrapper {
    display: flex;
  }
}

.header-icon {
  font-size: 1.5rem;
  color: var(--accent-primary);
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* --- BOTÃO DE PERFIL E DROPDOWN --- */
.profile-menu-wrapper {
  position: relative;
}

@keyframes rotate-gradient {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile-btn {
  position: relative;
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  background: var(--header-border);
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}

.profile-btn::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: conic-gradient(
    var(--accent-primary), 
    var(--accent-secondary),
    var(--accent-primary)
  );
  transition: opacity 0.3s ease;
  opacity: 0;
}

.profile-btn:hover::before {
  opacity: 1;
  animation: rotate-gradient 4s linear infinite;
}

.profile-btn img {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 42px; /* Ligeiramente menor para mostrar a borda/fundo */
  height: 42px;
  border-radius: 50%;
  background-color: var(--header-bg);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--header-border);
  overflow: hidden;
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid var(--header-border);
  color: var(--text-primary);
  text-align: center;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item.as-button {
  width: 100%;
  background: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #F1F5F9; /* Um cinza muito claro */
  color: var(--accent-primary);
}

.dropdown-item i {
  font-size: 1.2rem;
}

/* --- ANIMAÇÃO DO DROPDOWN --- */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease-out;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>