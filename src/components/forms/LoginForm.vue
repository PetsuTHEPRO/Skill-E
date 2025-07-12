<template>
  <main
    class="d-flex align-items-center justify-content-center p-3 text-center card-login"
  >
    <div class="mw-md w-100">
      <h2 class="fs-5 font-bold title-login">
        Acesse sua conta para gerenciar seus projetos
      </h2>
      <form @submit.prevent="entrar">
        <div class="mt-4">
          <div class="mb-3">
            <label for="email" class="d-block fw-medium fs-sm text-white"
              >Insira seu e-mail de trabalho</label
            >
            <div class="mt-1">
              <input
                id="email"
                v-model="user.email"
                placeholder="E-mail corporativo"
                type="email"
                required
                class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="d-block text-white fw-medium fs-sm"
              >Insira sua senha de acesso</label
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
              >Lembrar-me</label
            >
            <input id="remember-me" v-model="rememberMe" type="checkbox" />
          </div>
          <div class="text-sm">
            <router-link
              to="#"
              class="font-medium text-warning text-decoration-none fw-bolder"
              >Esqueceu a senha?</router-link
            >
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center mt-4 mb-4">
          <button
            type="submit"
            class="btn btn-warning w-100 px-4 py-2 mt-3 text-sm font-medium text-dark fw-bold rounded shadow-sm"
            :disabled="isDisabled"
          >
            <span v-if="isLoading">
              <i class="spinner-border spinner-border-sm" role="status"></i>
              ACESSANDO...
            </span>
            <span v-else> ENTRAR NA OBRA </span>
          </button>
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
      if (this.isDisabled || this.isLoading) {
        return; // Evita múltiplas submissões
      }
      this.isLoading = true;
      this.isDisabled = true;

      // Make a request to the backend API to verify the login credentials
      axios
        .loginUser(this.user)
        .then((response) => {
          // Handle successful login response
          const { token, email, role, telephone, especialidade, name, id } =
            response.data;

          this.login({
            token,
            email,
            especialidade: telephone,
            telefone: especialidade,
            role,
            name,
            id,
          });

          notificationService.success("Acesso liberado. Bem-vindo à obra!");
          this.$router.push({
            name: role, // Redireciona para a página de acordo com a função do usuário
          });
        })
        .catch((error) => {
          // Handle login error response
          if (error.response && error.response.data) {
            notificationService.error(error.response.data);
          } else {
            notificationService.error(
              "Servidor indisponível. Contate o suporte técnico."
            );
          }
        })
        .finally(() => {
          this.isLoading = false;
          this.isDisabled = false;
        });
    },
  },
};
</script>

<style>
.card-login {
  border: 4px solid;
  border-image: linear-gradient(to right, #FFD700, #FFA500, #363636, #A9A9A9) 1;
  border-radius: 10px;
  background-color: #1C1C1C; /* Um cinza mais escuro */
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.text-warning {
    color: #FFCA2C !important; /* Dourado/Amarelo para links */
}

.btn-warning {
    background-color: #E66A00;
    border-color: #E66A00;
}

.title-login{
  color: white;
  font-weight: bold;
}
</style>