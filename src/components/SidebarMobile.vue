<template>
  <div class="dropdown d-md-none">
    <button
      class="btn btn-secondary"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
    <i class="bi bi-list"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li>
        <router-link class="dropdown-item" :to="{name: `${role}`}">
          <i class="bi bi-house-door"></i> Home
        </router-link>
      </li>
      <li>
        <router-link class="dropdown-item" :to="{ name: `${role}Profile` }">
          <i class="bi bi-person"></i> Profile
        </router-link>
      </li>
      <li>
        <router-link
          class="dropdown-item"
          :to="{name: `${role}Classes`}"
        >
          <i class="bi bi-book"></i> Minhas Turmas
        </router-link>
      </li>
      <li>
        <router-link class="dropdown-item"
          :class="[{ 'active': isActive('/support') }]"
          :to="{name: 'support'}">
          <i class="bi bi-question-circle"></i> Suporte
        </router-link>
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li>
        <button class="dropdown-item" @click="sair()">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import CookiesService from "@/service/CookiesService";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      role: CookiesService.getRole()
    };
  },
  methods: {
    ...mapActions(['logout']),
    isActive(route) {
      const path = this.$route.path;
      return this.$route.path === '/'+ this.role + '/' + route;
    },
    sair() {
      this.logout();
      this.$router.push({ name: "login" });
    }
  }
}
</script>

<style>
/* Estilo para o item ativo */
.active {
  background-color: #0d6efd; /* Cor de fundo quando o item está ativo */
  color: white; /* Cor do texto quando o item está ativo */
}

</style>