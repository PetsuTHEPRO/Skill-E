<script setup>
import ProfileForm from "@/components/forms/ProfileForm.vue";
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="container-fluid d-flex p-0 engineer-profile-view">
    <SideBar class="d-none d-lg-block"/>
    <div
      class="container-fluid content-wrapper p-0"
      :class="{ 'content-wrapper-closed': !isSidebarOpen }"
    >
      <MenuBar />
      <main class="main-content engineer-profile-view">
        <header
          class="d-flex align-items-center justify-content-between"
        ></header>
        <div class="engineer-profile-form">
          <ProfileForm />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  // A lógica do tema foi completamente removida daqui.
  computed: {
    ...mapState({
      isSidebarOpen: (state) => state.isSidebarOpen,
    }),
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

/* --- NOVO ESTILO DA PÁGINA COM PALETA DE CINZA CLARO --- */
.engineer-profile-view {
  height: 100vh;
  overflow: hidden;
  color: #121214; /* Cor do texto padrão para o conteúdo dentro dos cards */
}

.content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 250px; /* Largura da sidebar aberta */
  transition: margin-left 0.3s ease-in-out;
}

.content-wrapper.content-wrapper-closed {
  margin-left: 80px; /* Largura da sidebar fechada */
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem;
  background-color: #F8F9FA;
}

/* As classes .light-theme e .dark-theme foram removidas pois não são mais necessárias */

.engineer-profile-form {
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 992px) {
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }

  .main-content {
    padding: 1.5rem;
  }

  :deep(.sidebar) {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  :deep(.sidebar:not(.sidebar-closed)) {
    transform: translateX(0);
  }
}
</style>
