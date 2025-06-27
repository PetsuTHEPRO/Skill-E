<script setup>
import CardClass from "@/components/classroom/ClassroomCard.vue";
import SideBar from "@/components/SideBar.vue";
import MenuBar from "@/components/MenuBar.vue";
</script>

<template>
  <div class="container-fluid d-flex student-home-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid margin-mobile p-0">
      <MenuBar role="Estudante" />
      <main class="p-4 min-vh-100 max-vw-100">
        <header class="d-flex align-items-center justify-content-between m-4">
          <h1 class="h3 fw-bold">Olá, {{ student }}</h1>
        </header>
        <section class="m-4">
          <h2 class="h4 fw-semibold mb-3">Suas turmas</h2>
          <div class="row g-3">
            <span v-if="classrooms.length === 0"
              >Você não está em nenhuma turma.</span
            >
            <div
              v-else
              class="col-md-6 col-lg-4"
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
        <section class="m-4">
          <div class="d-flex justify-content-between align-items-center w-100 px-4 mb-3">
            <h2 class="h4 fw-semibold">Destaques</h2>
            <span
              @click="$router.push({ name: 'allClassrooms' })"
              class="btn-ver-tudo"
            >
              Ver tudo <span class="icon">&gt;</span>
          </span>
          </div>
          <div class="row g-3">
            <span v-if="classroomsDestaque.length === 0"
              >Não há turma em destaque.</span
            >
            <div
              v-else
              class="col-md-6 col-lg-4"
              v-for="classroomsDestaque in classroomsDestaque"
              :key="classroomsDestaque.codigo"
            >
              <CardClass
                :classroom="classroomsDestaque"
                :statusColor="getStatusClass(classroomsDestaque.status)"
              />
            </div>
          </div>
        </section>
      </main>
      <footer class="bg-black text-white text-center py-2 text-muted mt-5">
        <p class="mb-0">&copy; 2024 Institucional. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script>
import axiosService from "@/api/axios.js";
import cookiesService from "@/service/CookiesService.js";

export default {
  data() {
    return {
      theme: cookiesService.getTheme(),
      student: cookiesService.getName(),
      classrooms: [],
      classroomsDestaque: [],
      theme: cookiesService.getTheme(),
    };
  },
  mounted() {
    axiosService
      .getClassroomsHomeByCode(cookiesService.getId())
      .then((response) => {
        this.classrooms = response.data;
        console.log(this.classrooms);
      })
      .catch((error) => {
        console.log(error);
      });
    this.getClassroomDestaque();
  },
  methods: {
    getStatusClass(status) {
      return `bg-${status.toLowerCase()}`;
    },
    getClassroomDestaque() {
      axiosService
        .getClassroomsDestaque()
        .then((response) => {
          console.log("Destaque" + response.data);
          this.classroomsDestaque = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

.btn-ver-tudo {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  color: #007bff;
  background-color: transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.btn-ver-tudo .icon {
  margin-left: 2px;
  transition: transform 0.3s ease;
}

.btn-ver-tudo:hover {
  color: #0056b3;
}

.btn-ver-tudo:hover .icon {
  transform: translateX(5px);
}

.student-home-view {
  min-height: 100vh;
}

.light-theme {
  background-color: #fff;
  color: #121214;
}

/* Tema dark */
.dark-theme {
  background-color: #121214;
  color: #f5f5f7;
}
</style>
