<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<template>
  <div class="container-fluid d-flex educator-create-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid p-0">
    <MenuBar role="Professor" />
    <div class="mx-5 d-flex flex-column align-items-center">
      <h1>Cadastrar Turma</h1>
      <p>Crie uma nova turma</p>
      <form class="row">
        <div class="col-md-12">
          <label for="name" class="form-label">Nome</label>
          <input
            type="text"
            v-model="classroom.name"
            class="form-control"
            id="name"
            required
          />
        </div>
        <div class="col-md-12 my-3">
          <div class="mb-3">
            <label for="description" class="form-label">Descrição</label>
            <textarea
              v-model="classroom.description"
              id="description"
              class="form-control"
              placeholder="Enter class description"
              style="min-height: 100px"
            ></textarea>
          </div>
        </div>
        <div class="col-md-2">
          <label for="price" class="form-label">Preço</label>
          <input
            type="number"
            v-model="classroom.price"
            class="form-control"
            id="price"
            required
          />
        </div>
      </form>
      <button class="btn btn-primary" @click="registerClassroom">
        Cadastrar
      </button>
    </div>
  </div>
</div>
</template>

<script>
import axios from "@/api/axios.js";
import notificationService from "@/service/notificationService.js";
import Cookies from "@/service/CookiesService.js";

export default {
  data() {
    return {
      classroom: {
        name: "",
        description: "",
        price: 0.0,
        idEducator: 0,
        theme: Cookies.getTheme(),
      },
    };
  },
  mounted() {
    axios
      .findIdEducatorByEducatorEmail(Cookies.getEmail())
      .then((response) => {
        this.classroom.idEducator = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    registerClassroom() {
      axios
        .createClassroom(this.classroom)
        .then(() => {
          // Handle successful login response
          notificationService.success("Turma criada com sucesso!");
          this.$router.push({ name: "educator" });
        })
        .catch((error) => {
          if (error.response) {
            // O servidor respondeu com um status fora do intervalo 2xx
            notificationService.error(error.response.data);
          } else {
            notificationService.error(
              "Servidor Offline, entre em contato a equipe técnica!"
            );
          }
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap");

.educator-create-view {
  background-color: #121214 !important;
  color: white;
  min-height: 100vh;
}

.dark-theme{
  background-color: #121214 !important;
  color: #F5F5F7;
}

.light-theme{
  background-color: #F5F5F7;
  color: #121214;
}

.rounded {
  border-radius: 10px !important;
}

.min-h-screen {
  min-height: 100vh;
}

input,
textarea {
  background-color: #323232 !important;
  color: #fff !important;
}

</style>
