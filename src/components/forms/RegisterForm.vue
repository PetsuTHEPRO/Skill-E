<template>
  <main class="register-container">
    <div class="register-card-wrapper">
      <div class="register-card">
        <span class="border-line top"></span>
        <span class="border-line right"></span>
        <span class="border-line bottom"></span>
        <span class="border-line left"></span>

        <div class="card-header-custom">
          <h2 class="title-register">Crie sua Conta</h2>
          <p class="subtitle-register">Junte-se a nós e comece a construir o futuro.</p>
        </div>

        <form @submit.prevent="register" class="card-body-custom">
          <div class="input-group">
            <i class="bi bi-person input-icon"></i>
            <input id="name" v-model="user.name" placeholder=" " type="text" required class="form-control" />
            <label for="name" class="form-label">Nome Completo</label>
          </div>

          <div class="input-group">
            <i class="bi bi-telephone input-icon"></i>
            <input id="telephone" v-model="user.telephone" type="tel" placeholder=" " required class="form-control" />
            <label for="telephone" class="form-label">Telefone (só números)</label>
          </div>

          <div class="input-group">
            <i class="bi bi-envelope input-icon"></i>
            <input id="email" v-model="user.email" placeholder=" " type="email" required class="form-control" />
            <label for="email" class="form-label">Seu melhor e-mail</label>
          </div>

          <div class="input-group">
            <i class="bi bi-shield-lock input-icon"></i>
            <input id="password" v-model="user.password" type="password" placeholder=" " required class="form-control" />
            <label for="password" class="form-label">Crie uma senha forte</label>
          </div>

          <div class="input-group">
            <i class="bi bi-shield-lock-fill input-icon"></i>
            <input id="passwordConfirmation" v-model="passwordConfirmation" type="password" placeholder=" " required class="form-control" />
            <label for="passwordConfirmation" class="form-label">Confirme sua senha</label>
          </div>

          <div class="button-wrapper">
            <button type="submit" class="btn-register" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
              <span v-else>Finalizar Cadastro</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "@/api/axios.js";
import notificationService from '@/service/notificationService.js';

export default {
  data() {
    return {
      user: {
        name: "",
        telephone: "",
        email: "",
        password: "",
      },
      passwordConfirmation: "", // Campo re-adicionado
      isLoading: false,
    };
  },
  methods: {
    // Validações
    validateName() {
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
      if (!this.user.name || !nameRegex.test(this.user.name)) {
        notificationService.error('Nome inválido. Use apenas letras e no mínimo 3 caracteres.');
        return false;
      }
      return true;
    },
    validateTelephone() {
      const phoneRegex = /^\d{10,11}$/;
      if (!this.user.telephone || !phoneRegex.test(this.user.telephone)) {
        notificationService.error('Telefone inválido. Deve ter 10 ou 11 dígitos.');
        return false;
      }
      return true;
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.user.email || !emailRegex.test(this.user.email)) {
        notificationService.error('O formato do e-mail é inválido.');
        return false;
      }
      return true;
    },
    validatePassword() {
      if (!this.user.password || this.user.password.length < 6) {
        notificationService.error('A senha deve ter no mínimo 6 caracteres.');
        return false;
      }
      return true;
    },
    // Validação da confirmação de senha re-adicionada
    validatePasswordConfirmation() {
      if (this.user.password !== this.passwordConfirmation) {
        notificationService.error('As senhas não coincidem.');
        return false;
      }
      return true;
    },

    register() {
      // Validação em cadeia
      if (
        !this.validateName() ||
        !this.validateTelephone() ||
        !this.validateEmail() ||
        !this.validatePassword() ||
        !this.validatePasswordConfirmation() // Validação adicionada
      ) {
        return;
      }

      this.isLoading = true;

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
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
/* --- ANIMAÇÕES --- */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Animações da borda "Scanner" */
@keyframes trace-top {
  0% { width: 0; left: 0; }
  100% { width: 100%; left: 0; }
}
@keyframes trace-right {
  0% { height: 0; top: 0; }
  100% { height: 100%; top: 0; }
}
@keyframes trace-bottom {
  0% { width: 0; right: 0; }
  100% { width: 100%; right: 0; }
}
@keyframes trace-left {
  0% { height: 0; bottom: 0; }
  100% { height: 100%; bottom: 0; }
}


/* --- CONTAINER PRINCIPAL --- */
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  min-height: 100vh; /* Garante que o container ocupe a tela toda */
}

/* --- CARD E EFEITOS --- */
.register-card-wrapper {
  position: relative;
  max-width: 600px; /* Card mais largo */
  width: 100%;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.register-card {
  background-color: #1A1A1A;
  color: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden; /* Importante para a borda */
  position: relative;
  animation: fadeIn 0.8s ease-out;
}

/* Linhas da Animação de Borda */
.border-line {
  position: absolute;
  background: linear-gradient(90deg, #FFD700, #E66A00);
  box-shadow: 0 0 10px #FFD700, 0 0 20px #E66A00;
}
.top, .bottom { height: 4px; }
.left, .right { width: 4px; }

.top { top: 0; animation: trace-top 2s linear infinite; }
.right { right: 0; animation: trace-right 2s linear infinite 2s; }
.bottom { bottom: 0; animation: trace-bottom 2s linear infinite 4s; }
.left { left: 0; animation: trace-left 2s linear infinite 6s; }


.card-header-custom {
  text-align: center;
  padding: 2rem 1.5rem 1rem 1.5rem;
}
.title-register {
  font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem;
}
.subtitle-register {
  color: #A9A9A9; font-size: 1rem;
}
.card-body-custom {
  padding: 1.5rem 2.5rem 2.5rem 2.5rem;
}

/* --- GRUPO DE INPUT E ANIMAÇÕES --- */
.input-group {
  position: relative;
  margin-bottom: 2rem;
}
.input-icon {
  position: absolute; top: 50%; left: 15px;
  transform: translateY(-50%);
  color: #777; transition: color 0.3s;
}
.form-control {
  width: 100%; background-color: #2C2C2C;
  color: #FFFFFF; border: 1px solid #444;
  border-radius: 8px; padding: 1rem 1rem 1rem 3.5rem;
  font-size: 1rem; transition: all 0.3s;
}
.form-label {
  position: absolute; top: 1rem; left: 3.5rem;
  color: #AAA; pointer-events: none;
  transition: all 0.2s ease-out;
}
.form-control:focus {
  background-color: #2C2C2C; border-color: #E66A00;
  box-shadow: 0 0 15px rgba(230, 106, 0, 0.2);
  outline: none;
}
.form-control:focus + .form-label,
.form-control:not(:placeholder-shown) + .form-label {
  top: -0.7rem; left: 0.8rem; font-size: 0.8rem;
  color: #E66A00; background-color: #212121;
  padding: 0 0.4rem; border-radius: 4px;
  z-index: 10;
}
.form-control:focus ~ .input-icon {
  color: #E66A00;
}

/* --- BOTÃO DE REGISTRO --- */
.button-wrapper {
  margin-top: 2rem;
}
.btn-register {
  width: 100%; padding: 1rem; border: none;
  border-radius: 8px; color: #1C1C1C;
  font-weight: 700; font-size: 1rem;
  text-transform: uppercase;
  background: linear-gradient(135deg, #FFD700, #E66A00);
  cursor: pointer; transition: all 0.3s ease;
  display: flex; align-items: center; justify-content: center;
}
.btn-register:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
}
.btn-register:disabled {
  opacity: 0.6; cursor: not-allowed;
}
.spinner-border {
  width: 1.2rem; height: 1.2rem;
}
</style>