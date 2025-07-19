<script setup>
import ClassroomDetails from "@/views/SimulationController.vue";
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="container-fluid d-flex classe-list-view p-0" :class="theme">
      <SideBar />
      <div class="container-fluid margin-mobile p-0">
        <MenuBar :role="role" />
        <ClassroomDetails />
      </div>
    </div>
</template>

<script>
import cookieService from "@/service/CookiesService.js";
export default {
  data() {
    return {
      theme: cookieService.getTheme(),
      role: cookieService.getRole() === "educator" ? "Professor" : "Estudante",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

.classe-list-view {
  min-height: 100vh;
}

.light-theme {
  background-color: #F5F5F7;
  color: #121214;
}

/* Tema dark */
.dark-theme {
  background-color: #121214;
  color: #F5F5F7;
}

@media (max-width: 768px) {

.max-vw-100{
  width: calc(100vw - 80px);
}
}
</style>