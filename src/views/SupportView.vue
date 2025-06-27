<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import CardSuport from "@/components/SupportRequest.vue";
</script>

<template>
  <div class="container-fluid d-flex support-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid p-0">
      <MenuBar :role="getRole()" />
      <div class="support-form">
        <CardSuport />
      </div>
    </div>
  </div>
</template>

<script>
import CookiesService from "@/service/CookiesService.js";

export default {
  name: "SupportView",
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

.support-view {
  min-height: 100vh;
}

.support-form {
  padding: 0 15rem !important;
}

@media (max-width: 768px) {
  .support-form {
    padding: 0 2rem !important;
  }
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
</style>
