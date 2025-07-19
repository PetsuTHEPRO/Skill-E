<script setup>
import ProfileForm from "@/components/forms/ProfileForm.vue";
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="container-fluid d-flex engineer-profile-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid margin-mobile p-0">
    <MenuBar role="Professor" />
    <header class="d-flex align-items-center justify-content-between"></header>
    <div class="engineer-profile-form">
      <ProfileForm />
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

.engineer-profile-view {
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

.engineer-profile-form {
  padding: 0 15rem !important;
}

@media (max-width: 768px) {
  .engineer-profile-form {
    padding: 0 2rem !important;
  }
}

</style>
