<template>
  <nav :class="['sidebar d-none d-md-block', { 'sidebar-closed': !isOpen }]">
    <div class="d-flex flex-column align-items-center p-0">
      <div class="d-flex w-100 align-items-center justify-content-around py-4">
        <h3 :class="['fw-bold fs-5', { 'd-none': !isOpen }]">Only Study</h3>
        <button @click="toggleSidebar" class="btn-sidebar d-flex align-items-center justify-content-center">
          <i :class="isOpen ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
        </button>
      </div>
      <ul class="nav flex-column px-2">
        <li class="nav-item" v-for="item in menuItems" :key="item.text">
          <router-link :to="`/${role}/${item.rota}`" active-class="router-link-active" class="nav-link d-flex align-items-center">
            <i :class="item.icon"></i>
            <span v-if="isOpen" class="ms-2">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
      <button @click="sair()" class="btn btn-warning">
        <i class="bi bi-box-arrow-right"></i>
        <span v-if="isOpen" class="ms-2">logout</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import store from "@/store/index.js";
import Cookie from "@/service/CookiesService.js";

export default {
  data() {
    return {
      role: Cookie.getRole(),
      isOpen: store.state.isSidebarOpen,
      menuItems: [
        { text: 'Home', icon: 'bi bi-house', rota: '' },
        { text: 'Profile', icon: 'bi bi-person', rota: 'profile' },
        { text: 'Classes', icon: 'bi bi-book', rota: 'classes' },
        { text: 'Support', icon: 'bi bi-question-circle', rota: 'support' },
      ],
    };
  },
  methods: {
    ...mapActions(["logout"]),
    toggleSidebar() {
      store.state.isSidebarOpen = !store.state.isSidebarOpen;
      this.isOpen = store.state.isSidebarOpen;
      console.log(this.isOpen);
    },
    sair() {
      this.logout();
      this.$router.go({ name: "home" });
    },
  },
};
</script>

<style scoped>

.sidebar {
  width: 200px;
  background-color: #1D1D21;
  color: white;
  transition: width 0.3s ease-in-out;
  z-index: 1000;
}

.btn-sidebar{
    width: 43px;
    height: 43px;
    border-radius: 25%;
    border: none;
    color: white;
    background-color: #111;
}

.sidebar-closed {
  width: 80px;
}

.sidebar .nav-link {
  color: white;
}

.sidebar .nav-link:hover {
  background-color: #495057;
}

.sidebar .bi {
  font-size: 1.5rem;
}

</style>
