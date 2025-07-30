<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import CardSuport from "@/components/SupportRequest.vue";
</script>

<template>
  <div class="container-fluid d-flex support-view p-0">
    <SideBar class="d-none d-lg-block"/>
    <div class="container-fluid content-wrapper p-0" :class="{ 'content-wrapper-closed': !isSidebarOpen }">
      <MenuBar />
      <main class="main-content">
        <div class="support-form">
          <CardSuport />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import storage from "@/service/storage";
import { mapState } from "vuex";

export default {
  name: "SupportView",
  components: {
    MenuBar,
    SideBar,
    CardSuport,
  },
  data() {
    return {
      // A role deve vir de uma fonte de dados, como o CookieService
      // role: CookiesService.getRole() 
    };
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.isSidebarOpen
    }),
    theme() {
      // Este 'theme' agora é uma propriedade computada.
      // Ele está "assistindo" a variável 'theme' que importamos do store.
      // Sempre que o valor no store mudar, esta propriedade será recalculada
      // e a tela será atualizada AUTOMATICAMENTE.
      return storage.getTheme()
    }
  },
  methods: {
    getRole() {
      // Exemplo de como você poderia usar a role
      // return this.role === "educator" ? "Professor" : "Estudante";
    },
  },
};
</script>

<!-- Estilos Globais para remover a barra de rolagem dupla -->
<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

/* Estilos de Layout Principal */
.support-view {
  height: 100vh;
  overflow: hidden;
  background-color: #F8F9FA;
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
}

/* Estilos Específicos da Página de Suporte */
.support-form {
  max-width: 900px;
  margin: 0 auto;
}

/* Responsividade Mobile */
@media (max-width: 992px) {
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }
  
  .main-content {
    padding: 1.5rem;
  }

  .support-form {
    padding: 0;
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
