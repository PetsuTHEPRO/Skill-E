<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import Classes from "@/components/ClassesResult.vue";
</script>

<template>
  <div class="container-fluid d-flex classes-view p-0" :class="theme">
      <SideBar />
      <div class="container-fluid margin-mobile p-0">
      <MenuBar :role="getRole()" />
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
    };
  },
  methods: {
    getRole() {
      return this.role === "educator" ? "Professor" : "Estudante";
    }
  }

}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

.classes-view{
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

/* Media query para dispositivos móveis */
@media (max-width: 768px) {
.margin-mobile{
  margin-left: 70px;
}
}

</style>
