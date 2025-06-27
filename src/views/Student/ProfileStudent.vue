<script setup>
import CardProfile from "@/components/forms/ProfileForm.vue";
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="container-fluid d-flex student-profile-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid p-0">
      <MenuBar role="Estudante" />
      <div class="student-profile-form">
        <CardProfile />
      </div>
    </div>
  </div>
</template>

<script>
import cookieService from "@/service/CookiesService.js";
export default {
  data() {
    return {
      theme: cookieService.getTheme(),
    };
  },
};
</script>

<style>
.student-profile-view {
  min-height: 100vh;
}

.light-theme {
  background-color: #FFF;
  color: #121214;
}

/* Tema dark */
.dark-theme {
  background-color: #121214;
  color: #f5f5f7;
}

.student-profile-form {
  padding: 0 15rem !important;
}

@media (max-width: 768px) {
  .student-profile-form {
    padding: 0 2rem !important;
  }
}
</style>
