<script setup>
import CardLogin from "../components/forms/LoginForm.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar />
  <div class="d-flex align-items-center justify-content-center login-view text-white">
      <div class="row align-items-center">
        <div class="d-none d-lg-block col-md-6 col-sm-12">
          <img src="../components/icons/Login.png" alt="Imagem de Login" style="width: 80%;">
        </div>

        <div class="col-md-6 col-sm-12 gx-5">
          <CardLogin/>
        </div>
      </div>
  </div>
</template>

<style>
.login-view{
  background-color: #1A001A;
  min-height: 100vh;
}
</style>
