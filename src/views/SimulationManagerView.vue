<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import SimulationController from "@/components/SimulationController.vue";
</script>

<template>
  <div class="container-fluid d-flex dashboard-view p-0">
    <SideBar />
    <div class="container-fluid content-wrapper p-0" :class="{ 'content-wrapper-closed': !isSidebarOpen }">
      <MenuBar />
      <main class="main-content p-4">
        <SimulationController />
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SimulationManagerView",
  components: {
    MenuBar,
    SideBar,
    SimulationController,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.isSidebarOpen
    })
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<style scoped>
/* Estilos de Layout Principal com tema light fixo */
.dashboard-view {
  height: 100vh;
  overflow: hidden;
  background-color: #f8f9fa;
; /* Cor de fundo do tema light */
  color: #121214;          /* Cor do texto do tema light */
}

.content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 250px;
  transition: margin-left 0.3s ease-in-out;
}

.content-wrapper.content-wrapper-closed {
  margin-left: 80px;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }
  
  .main-content {
    padding: 1.5rem !important;
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