<template>
  <main
    class="d-flex align-items-center justify-content-center p-3 text-center card-login"
  >
    <div class="mw-md w-100">
      <h2 class="fs-5 fw-bold title-login">
        Crie sua conta para iniciar seus projetos
      </h2>
      <form @submit.prevent="register" class="mt-4">
        <div class="mb-3">
          <input
            id="name"
            v-model="user.name"
            placeholder="Seu nome completo"
            type="text"
            required
            class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
          />
        </div>

        <div class="mb-3">
          <input
            id="telephone"
            v-model="user.telephone"
            type="tel"
            placeholder="Seu telefone (apenas números)"
            required
            class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
          />
        </div>

        <div class="mb-3">
          <input
            id="email"
            v-model="user.email"
            placeholder="Seu e-mail de trabalho"
            type="email"
            required
            class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
          />
        </div>

        <div class="mb-3">
          <input
            id="password"
            v-model="user.password"
            type="password"
            placeholder="Crie uma senha"
            required
            class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
          />
        </div>

        <div class="mb-3">
          <input
            id="passwordConfirmation"
            v-model="passwordConfirmation"
            placeholder="Confirme sua senha"
            type="password"
            required
            class="form-control px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
          />
        </div>

        <div class="text-white mt-4">
          <label class="fw-medium fs-sm">Qual sua função na obra?</label>
          <div class="d-flex justify-content-center mt-2 gap-4">
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id="engenheiro"
                value="ENGINEER"
                v-model="user.role"
              />
              <label class="form-check-label" for="engenheiro">Engenheiro(a)</label>
            </div>
            <div class="form-check">
              <input
                type="radio"
                class="form-check-input"
                id="mestre"
                value="FOREMAN"
                v-model="user.role"
              />
              <label class="form-check-label" for="mestre">Mestre de Obras</label>
            </div>
          </div>
        </div>

        <div v-if="user.role === 'ENGINEER'" class="mt-3">
           <label for="especialidade" class="d-block fw-medium fs-sm text-white mb-1"
              >Selecione sua especialidade</label>
          <select
            id="especialidade"
            class="form-select px-3 py-2 border-2 rounded shadow-sm text-white bg-dark"
            v-model="user.especialidade"
            required
          >
            <option disabled value="">Clique para selecionar...</option>
            <option value="Civil">Engenharia Civil</option>
            <option value="Estrutural">Engenharia Estrutural</option>
            <option value="Elétrica">Engenharia Elétrica</option>
            <option value="Hidráulica">Engenharia Hidráulica</option>
          </select>
        </div>

        <div class="d-flex justify-content-center mt-4 mb-2">
          <button
            type="submit"
            class="btn btn-warning w-100 px-4 py-2 mt-3 text-sm font-medium text-dark fw-bold rounded shadow-sm"
          >
            CRIAR CONTA
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
        role: "ENGINEER", // Papel padrão atualizado
        especialidade: "",
      },
      passwordConfirmation: "",
    };
  },
  methods: {
    // SUAS FUNÇÕES DE VALIDAÇÃO (INTACTAS E CORRETAS)
    validateName() {
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
      if (!this.user.name) {
        notificationService.error('O campo nome é obrigatório.');
        return -1;
      } else if (!nameRegex.test(this.user.name)) {
        notificationService.error('O campo nome deve conter apenas letras.');
        return -1;
      }
    },
    validateTelephone() {
      const phoneRegex = /^\d{10,11}$/;
      if (!this.user.telephone) {
        notificationService.error('O campo telefone é obrigatório.');
        return -1;
      } else if (!phoneRegex.test(this.user.telephone)) {
        notificationService.error('O telefone deve ter 10 ou 11 dígitos.');
        return -1;
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.user.email) {
        notificationService.error('O campo e-mail é obrigatório.');
        return -1;
      } else if (!emailRegex.test(this.user.email)) {
        notificationService.error('O formato do e-mail é inválido.');
        return -1;
      }
    },
    validatePassword() {
      if (!this.user.password) {
        notificationService.error('O campo senha é obrigatório.');
        return -1;
      } else if (this.user.password.length < 6) {
        notificationService.error('A senha deve ter no mínimo 6 caracteres.');
        return -1;
      }
    },
    validatePasswordConfirmation() {
      if (!this.passwordConfirmation) {
        notificationService.error('A confirmação de senha é obrigatória.');
        return -1;
      } else if (this.passwordConfirmation !== this.user.password) {
        notificationService.error('As senhas não coincidem.');
        return -1;
      }
    },
    validateEspecialidade() {
      // Lógica atualizada para o novo papel de usuário
      if (!this.user.especialidade && this.user.role === "ENGINEER") {
        notificationService.error('A especialidade é obrigatória para engenheiros.');
        return -1;
      }
    },

    register() {
      if (this.validateName() == -1) return;
      if (this.validateTelephone() == -1) return;
      if (this.validateEmail() == -1) return;
      if (this.validatePassword() == -1) return;
      if (this.validatePasswordConfirmation() == -1) return;
      if (this.validateEspecialidade() == -1) return;

      axios.registerUser(this.user)
        .then(() => {
          notificationService.success("Usuário criado com sucesso! Por favor, faça login.");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          if (error.response) {
            notificationService.error(error.response.data);
          } else {
            notificationService.error("Servidor indisponível. Contate o suporte técnico!");
          }
        });
    },
  },
};
</script>

<style>
/* ESTILOS COPIADOS DA TELA DE LOGIN PARA CONSISTÊNCIA TOTAL */
.card-login {
  border: 4px solid;
  border-image: linear-gradient(to right, #FFD700, #FFA500, #363636, #A9A9A9) 1;
  border-radius: 10px;
  background-color: #1C1C1C;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

.title-login {
  color: white;
  font-weight: bold;
}

/* Estilos para inputs e selects para combinar com o tema */
.form-control.bg-dark, .form-select.bg-dark {
    background-color: #323232 !important;
    border-color: #555 !important;
}

.form-control.bg-dark:focus, .form-select.bg-dark:focus {
    background-color: #323232 !important;
    border-color: #FFCA2C !important;
    box-shadow: 0 0 0 0.25rem rgba(255, 202, 44, 0.25);
    color: white;
}

/* Estilo do botão de ação */
.btn-warning {
    background-color: #E66A00;
    border-color: #E66A00;
}

/* Estilos para radio buttons para combinar com o tema */
.form-check-input {
  background-color: #323232;
  border-color: #555;
}
.form-check-input:checked {
  background-color: #E66A00;
  border-color: #E66A00;
}
.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba(230, 106, 0, 0.25);
}
.form-check-label{
  color: white;
}
</style>