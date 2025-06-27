<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import Classes from "@/components/classroom/ClassroomList.vue";
</script>

<template>
  <div class="container-fluid d-flex classes-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid p-0">
      <MenuBar :role="getRole()" />
      <div class="mb-4 d-flex align-items-center justify-content-between">
        <div class="d-flex justify-content-between w-100 px-4">
          <h1 class="h3 fw-semibold">Classes</h1>
          <button
          v-if="role === 'educator'"
          @click="$router.push({ name: 'createClassroom' })"
          class="btn btn-solicitar py-0 text-white"
          >
          Cadastrar turma
        </button>
      </div>
      </div>
      <Classes />
    </div>
  </div>
</template>

<script>
import CookiesService from "@/service/CookiesService.js";

export default {
  data() {
    return {
      role: CookiesService.getRole(),
      theme: CookiesService.getTheme(),
    };
  },
  methods: {
    getRole() {
      return this.role === "educator" ? "Professor" : "Estudante";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

.classes-view {
  min-height: 100vh;
}

.btn-solicitar {
  background-color: #28a745;  
}

.btn-solicitar:hover {
  background-color: #218838;
}

.light-theme {
  background-color: #f5f5f7;
  color: #121214;
}

/* Tema dark */
.dark-theme {
  background-color: #121214;
  color: #f5f5f7;
}
</style>
