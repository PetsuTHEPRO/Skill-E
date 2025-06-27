<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import CardClass from "@/components/classroom/ClassroomCard.vue";
</script>

<template>
  <div class="container-fluid d-flex educator-home-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid margin-mobile p-0">
      <MenuBar role="Professor" />
      <main class="p-4 min-vh-100 max-vw-100">
        <header class="d-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 fw-bold">Olá, {{ educator }}</h1>
        </header>
        <section>
          <h2 class="h4 fw-semibold mb-3">Suas turmas</h2>
          <div class="row g-3">
            <span v-if="classrooms.length === 0">Não há turmas, crie uma.</span>
            <div
              v-else
              class="col-12 col-md-6 col-lg-4"
              v-for="classroom in classrooms"
              :key="classroom.codigo"
            >
              <CardClass
                :classroom="classroom"
                :statusColor="getStatusClass(classroom.status)"
              />
            </div>
          </div>
        </section>
      </main>
      <footer class="footer bg-black text-center py-2 text-white">
        <p class="mb-0">&copy; 2024 Institucional. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";
import cookieService from "@/service/CookiesService.js";
import store from "@/store/index.js";

export default {
  data() {
    return {
      educator: cookieService.getName(),
      showModal: false,
      statusColor: "",
      classrooms: [],
      id_educator: cookieService.getId(),
      isSidebarOpen: store.state.isSidebarOpen,
      theme: cookieService.getTheme(),
    };
  },
  mounted() {
    axios
      .findClassroomsByCode(this.id_educator)
      .then((response) => {
        this.classrooms = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logout() {
      cookieService.clearAll();
      this.$router.push({ name: "login" });
    },
    getStatusClass(status) {
      return `bg-${status.toLowerCase()}`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

.educator-home-view {
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

.max-vw-100{
  width: calc(100vw - 80px);
}
}
</style>