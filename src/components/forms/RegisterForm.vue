<template>
  <main
    class="d-flex align-items-center justify-content-center p-4 text-center card-login"
  >
    <div class="mw-md w-100">
      <h2 class="fs-5 font-bold">
        Faça login para continuar sua jornada de aprendizado
      </h2>
      <form @submit.prevent="register">
        <div class="mt-4">
          <div class="mb-3">
            <input
              id="name"
              v-model="user.name"
              placeholder="Seu nome completo"
              type="text"
              class="d-block w-100 px-3 py-2 border border-2 rounded shadow-sm focus:shadow-md focus:border-purple-500 sm:text-sm text-white"
            />
          </div>

          <div class="mt-1 mb-3">
            <input
              id="telephone"
              v-model="user.telephone"
              type="telephone"
              placeholder="Seu telefone"
              class="d-block w-100 px-3 py-2 border border-2 rounded shadow-sm focus:shadow-md focus:border-purple-500 sm:text-sm text-white"
            />
          </div>

          <div class="mt-1 mb-3">
            <input
              id="email"
              v-model="user.email"
              placeholder="E-mail"
              type="text"
              class="d-block w-100 px-3 py-2 border border-2 rounded shadow-sm focus:shadow-md focus:border-purple-500 sm:text-sm text-white"
            />
          </div>

          <div class="mt-1 mb-3">
            <input
              id="password"
              v-model="user.password"
              type="password"
              placeholder="Senha"
              autocomplete="current-password"
              class="d-block w-100 px-3 py-2 border border-2 rounded shadow-sm focus:shadow-md focus:border-purple-500 sm:text-sm text-white"
            />
          </div>

          <div class="mt-1">
            <input
              id="passwordConfirmation"
              v-model="passwordConfirmation"
              placeholder="Confirme sua senha"
              type="password"
              class="d-block w-100 px-3 py-2 border border-2 rounded shadow-sm focus:shadow-md focus:border-purple-500 sm:text-sm text-white"
            />
          </div>

          <label class="mt-3">Você é?</label>
          <div class="d-flex align-items-center justify-content-center mt-1">
            <i class="bi bi-mortarboard-fill me-2"></i>
            <label class="form-check-label me-2" for="estudante"
              >Estudante</label
            >
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id="estudante"
                name="tipo_usuario"
                value="STUDENT"
                v-model="user.role"
                checked
              />
            </div>
            <i class="bi bi-person-fill me-1 ms-4"></i>
            <label class="form-check-label me-2" for="educador">Educador</label>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id="educador"
                name="tipo_usuario"
                v-model="user.role"
                value="EDUCATOR"
              />
            </div>
          </div>
          <div v-if="user.role === 'EDUCATOR'" class="mt-3">
            <select
              id="especialidade"
              class="d-block w-100 px-3 py-2 border border-2 rounded input-campo"
              v-model="user.especialidade"
            >
              <option disabled value="">Selecione sua especialidade</option>
              <option value="Doutorado">Doutorado</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Especialização">Especialização</option>
              <option value="Graduação">Graduação</option>
              <!-- Adicione mais opções conforme necessário -->
            </select>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-center mb-2">
          <button
            type="submit"
            class="btn btn-primary d-flex justify-content-center px-4 py-2 mt-4 text-sm font-medium text-white"
          >
            CONFIRMAR
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "@/api/axios.js";
import notificationService from '@/service/notificationService.js'

export default {
  data() {
    return {
      user: {
        name: "",
        telephone: "",
        email: "",
        password: "",
        role: "STUDENT",
        especialidade: "",
      },
      passwordConfirmation: "",
    };
  },
  methods: {

    validateName() {
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Aceita letras com acentos e espaços
      if (!this.user.name) {
        notificationService.error('Preencha o campo nome.');
        return -1;
      }else if(!nameRegex.test(this.user.name)){
        notificationService.error('Campo nome deve conter apenas letras.');
        return -1;
      }
    },
    validateTelephone() {
      const phoneRegex = /^\d{10,11}$/;
      if (!this.user.telephone) {
        notificationService.error('Preencha o campo telefone.');
        return -1;
      } else if (!phoneRegex.test(this.user.telephone)) {
        notificationService.error('Telefone deve ter 10 ou 11 dígitos.');
        return -1;
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.user.email) {
        notificationService.error('Preencha o campo email.');
        return -1;
      } else if (!emailRegex.test(this.user.email)) {
        notificationService.error('Email invalido.');
        return -1;
      }
    },
    validatePassword() {
      if (!this.user.password) {
        notificationService.error('Preencha o campo senha.');
        return -1;
      } else if (this.user.password.length < 6) {
        notificationService.error('Senha deve ter no mínimo 6 caracteres.');
        return -1;
      }
    },
    validatePasswordConfirmation() {
      if (!this.passwordConfirmation) {
        notificationService.error('Confirmação de senha é obrigatória.');
        return -1;
      } else if (this.passwordConfirmation !== this.user.password) {
        notificationService.error('As senhas não coincidem.');
        return -1;
      }
    },

    validateEspecialidade() {
      if (!this.user.especialidade && this.user.role === "EDUCATOR") {
        notificationService.error('Especialidade é obrigatória.');
        return -1;
      }
    },

    register() {
      if(this.validateName() == -1) return;
      if(this.validateTelephone() == -1) return;
      if(this.validateEmail() == -1) return;
      if(this.validatePassword() == -1) return;
      if(this.validatePasswordConfirmation() == -1) return;
      if(this.validateEspecialidade() == -1) return;

      // Make a request to the backend API to verify the login credentials
      axios.registerUser(this.user)
        .then(() => {
          // Handle successful login response
          notificationService.success("Usuário criado com sucesso! Por favor, faça login.");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          if (error.response) {
            // O servidor respondeu com um status fora do intervalo 2xx
            notificationService.error(error.response.data);
          }else{ 
            notificationService.error("Servidor Offline, entre em contato a equipe técnica!");
          }
        });
    },
  },
};
</script>

<style>

input[type="checkbox"] {
  background-color: #000 !important;
  width: 1.2rem;
  height: 1.2rem;
  border: 1px solid #7d1479;
  border-radius: 50px !important;
}

.rounded {
  border-radius: 10px !important;
}

.min-h-screen {
  min-height: 100vh;
}

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
}

input, select {
  background-color: #323232;
  color: #fff;
}
</style>
