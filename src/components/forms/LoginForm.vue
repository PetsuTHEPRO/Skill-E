<template>
  <main
    class="d-flex align-items-center justify-content-center p-3 text-center card-login"
  >
    <div class="mw-md w-100">
      <h2 class="fs-5 font-bold">
        Faça login para continuar sua jornada de aprendizado
      </h2>
      <form @submit.prevent="entrar">
        <div class="mt-4">
          <div class="mb-3">
            <label for="email" class="d-block fw-medium fs-sm text-white"
              >Insira seu e-mail</label
            >
            <div class="mt-1">
              <input
                id="email"
                v-model="user.email"
                placeholder="E-mail"
                type="email"
                required
                class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="d-block text-white fw-medium fs-sm"
              >Insira sua senha</label
            >
            <div class="mt-1">
              <input
                id="password"
                v-model="user.password"
                type="password"
                placeholder="Senha"
                autocomplete="current-password"
                required
                class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
              />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-3">
          <div class="d-flex align-items-center border rounded p-2">
            <label for="remember-me" class="mx-2 text-sm text-white"
              >Salvar senha</label
            >
            <input id="remember-me" v-model="rememberMe" type="checkbox" />
          </div>
          <div class="text-sm">
            <router-link
              to="#"
              class="font-medium text-purple text-decoration-none fw-bolder"
              >Esqueceu sua senha?</router-link
            >
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center mt-4 mb-4">
          <button
            type="submit"
            class="btn btn-primary w-100 px-4 py-2 mt-3 text-sm font-medium text-white rounded shadow-sm"
            :disabled="isDisabled"
          >
            <span v-if="isLoading">
              <i class="spinner-border spinner-border-sm" role="status"></i>
              Enviando...
            </span>
            <span v-else> ENTRAR </span>
          </button>
        </div>
        <div class="d-flex align-items-center">
          <hr class="flex-grow-1 border border-white" />
          <div class="text-white mx-4">Outras opções de login</div>
          <hr class="flex-grow-1 border border-light" />
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "../../api/axios.js";
import notificationService from "../../service/notificationService.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      rememberMe: false,
      isLoading: false,
      isDisabled: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    entrar() {

      if(this.isDisabled || this.isLoading) {
        console.log("Entrando...");
      }else{
      this.isLoading = true;
      this.isDisabled = true;

      console.log(this.isLoading);
      console.log(this.isDisabled);
      // Make a request to the backend API to verify the login credentials
      axios
        .loginUser(this.user)
        .then((response) => {
          console.log(response.data);
          // Handle successful login response
          const { token, email, role, telephone, especialidade, name, id } = response.data;

          this.login({
            token: token,
            email: email,
            especialidade: telephone,
            telefone: especialidade,
            role: role,
            name: name,
            id: id,
          });
          notificationService.success("Bem vindo!");
          this.$router.push({
            name: role,
          });
          this.isLoading = false;
          this.isDisabled = false;
        })
        .catch((error) => {
          // Handle login error response
          if (error) {
            // O servidor respondeu com um status fora do intervalo 2xx
            notificationService.error(error.response.data);
            console.log(error);
            this.isLoading = false;
            this.isDisabled = false;
          } else {
            notificationService.error(
              "Servidor Offline, entre em contato a equipe técnica!"
            );
          }
        });
      }
    },
  },
};
</script>

<style>
.card-login {
  border: 2px solid;
  border-image: linear-gradient(
      to right,
      rgba(255, 0, 0, 1) 0%,
      rgba(255, 165, 0, 1) 20%,
      rgba(255, 255, 0, 1) 40%,
      rgba(0, 128, 0, 1) 60%,
      rgba(0, 0, 255, 1) 80%,
      rgba(75, 0, 130, 1) 100%
    )
    1;
  border-radius: 25px;
  background-color: #000;
  max-width: 500px;
  width: 100%;
}
</style>
