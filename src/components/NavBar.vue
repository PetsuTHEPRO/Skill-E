<template>
  <header class="d-flex align-items-center justify-content-between bg-black px-4 py-2 border-bottom border-top border-3 border-purple">
    <router-link class="fw-bolder" style="color: white; text-decoration: none;" to="/">Only Study</router-link>
    <div>
      <nav class="d-flex align-items-center">
        <router-link v-if="currentScreen() !== 'login'" to="/login" class="btn-nav login-link d-flex align-items-center me-4 text-decoration-none fw-bold">
          <img class="me-1" src="@/components/icons/Customer.png" alt="">
          LOG IN
        </router-link>
        <router-link  v-if="currentScreen() !== 'register'" to="/register"
          class="btn-nav register-link px-4 py-2 fw-bolder text-white border border-purple rounded text-decoration-none"
          @click="register"
        >
          CADASTRAR-SE
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    currentScreen() {
      return this.$route.name;
    }
  }
}
</script>

<style scoped>
nav {
  width: 100%;
}

.border-purple{
  border-color: #7D1479 !important;
}

.login-link {
  color: white;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #7D1479;
}

.register-link {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.register-link:hover {
  background-color: #7D1479;
  border-color: #fff;
}

@media screen and (max-width: 768px) {
  .btn-nav {
    font-size: 0.5rem;
  }
}

</style>
