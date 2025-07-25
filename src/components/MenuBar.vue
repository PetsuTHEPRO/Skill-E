<script setup>
import SidebarMobile from "@/components/SidebarMobile.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>

<template>
  <header class="construction-header">
    <div class="d-flex align-items-center">
      <SidebarMobile />
      <span class="d-none d-lg-block h4 fw-bold mb-0 header-title"
        >Simulações</span
      >
    </div>

    <div class="d-flex align-items-center">
      <SearchBar :role="role" />
      <button
        class="theme-toggle-btn mx-4"
        :class="[themeClass]"
        @click="toggleTheme()"
        aria-label="Alternar tema"
      ></button>
      <button class="profile-btn">
        <img
          width="40"
          height="40"
          :src="`https://robohash.org/${name}.png?set=set4`"
          alt="Foto de perfil"
        />
        <span class="visually-hidden">Profile</span>
      </button>
    </div>
  </header>
</template>

<script>
import CookiesService from "@/service/CookiesService";
import storage from "@/service/storage";
import store from "@/store/index.js";

export default {
  name: "MenuBar",
  props: {
    role: String,
  },
  data() {
    return {
      name: CookiesService.getName(),
      search: "",
      themeClass:
        storage.getTheme() === "dark-theme" ? "bi bi-moon" : "bi bi-sun",
    };
  },
  methods: {
    openMenu() {
      store.state.isSidebarOpen = !store.state.isSidebarOpen;
    },
    toggleTheme() {
      storage.toggleTheme() // Atualiza o Storage
      const currentTheme = storage.getTheme()
      this.themeClass = currentTheme === "dark-theme" ? "bi bi-moon" : "bi bi-sun"

    },
  },
};
</script>

<style scoped>
/* Importa a fonte principal do tema */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

/* Define as variáveis de cor para referência, baseadas no seu pedido */
:root {
  --background-color: #f4f7f5;
  --primary-color: #ff7a00;
  --primary-hover-color: #e66a00;
  --border-color: #dde2df;
  --text-primary: #1e1e1e;
}

.construction-header {
  /* Estilo principal da barra */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background-color: var(--background-color);
  border-bottom: 2px solid var(--border-color);
  font-family: "Inter", sans-serif;
}

.header-title {
  color: var(--text-primary);
}

.theme-toggle-btn {
  /* Botão de alternar tema */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.theme-toggle-btn:hover {
  background-color: var(--primary-hover-color);
}

.profile-btn {
  /* Botão de perfil */
  padding: 0;
  border: 2px solid var(--border-color);
  background-color: transparent;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease-in-out;
}

.profile-btn:hover {
  border-color: var(--primary-color);
}

.profile-btn img {
  border-radius: 50%;
}
</style>
