<template>
  <main class="login-container">
    <div class="login-card-wrapper">
      <div class="login-card">
        <span class="border-line top"></span>
        <span class="border-line right"></span>
        <span class="border-line bottom"></span>
        <span class="border-line left"></span>

        <div class="card-header-custom">
          <h2 class="title-login">Acesse sua Conta</h2>
          <p class="subtitle-login">Bem-vindo de volta! Gerencie seus projetos.</p>
        </div>

        <form @submit.prevent="entrar" class="card-body-custom">
          <div class="input-group">
            <i class="bi bi-envelope input-icon"></i>
            <input id="email" v-model="user.email" placeholder=" " type="email" required class="form-control" />
            <label for="email" class="form-label">E-mail de trabalho</label>
          </div>

          <div class="input-group">
            <i class="bi bi-shield-lock input-icon"></i>
            <input id="password" v-model="user.password" type="password" placeholder=" " autocomplete="current-password" required class="form-control" />
            <label for="password" class="form-label">Sua senha de acesso</label>
          </div>

          <div class="options-wrapper">
            <div class="form-check">
              <input id="remember-me" v-model="rememberMe" type="checkbox" class="form-check-input" />
              <label for="remember-me" class="form-check-label">Lembrar-me</label>
            </div>
            <router-link to="#" class="link-forgot-password">Esqueceu a senha?</router-link>
          </div>

          <div class="button-wrapper">
            <button type="submit" class="btn-login" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"></span>
              <span v-else>Entrar na Obra</span>
            </button>
          </div>
        </form>
      </div>
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
    };
  },
  methods: {
    ...mapActions(["login"]),
    entrar() {
      if (this.isLoading) return;
      
      this.isLoading = true;

      axios.loginUser(this.user)
        .then((response) => {
          // Lógica simplificada: Sem role ou especialidade
          const { token, email, telephone, name, id } = response.data;

          // Chama a action do Vuex com os dados simplificados
          // Lembre-se de ajustar sua mutation no Vuex para não esperar mais por 'role'
          this.login({ token, email, telephone, name, id });

          notificationService.success("Acesso liberado. Bem-vindo de volta!");
          
          // Redireciona para um dashboard genérico, não mais baseado em role
          this.$router.push({ name: "dashboard" }); // <-- AJUSTE O NOME DA ROTA SE NECESSÁRIO
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            notificationService.error(error.response.data);
          } else {
            notificationService.error("Servidor indisponível. Contate o suporte técnico.");
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
@keyframes trace-top {
  0% { width: 0; left: 0; } 100% { width: 100%; left: 0; }
}
@keyframes trace-right {
  0% { height: 0; top: 0; } 100% { height: 100%; top: 0; }
}
@keyframes trace-bottom {
  0% { width: 0; right: 0; } 100% { width: 100%; right: 0; }
}
@keyframes trace-left {
  0% { height: 0; bottom: 0; } 100% { height: 100%; bottom: 0; }
}

/* --- CONTAINER E CARD --- */
.login-container {
  display: flex; align-items: center; justify-content: center;
  padding: 2rem; width: 100%; min-height: 100vh;
}
.login-card-wrapper {
  position: relative; max-width: 480px; width: 100%;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.login-card {
  background-color: #1A1A1A; color: #FFFFFF;
  border-radius: 16px; width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  overflow: hidden; position: relative;
  animation: fadeIn 0.8s ease-out;
}
.border-line {
  position: absolute;
  background: linear-gradient(90deg, #FFD700, #E66A00);
  box-shadow: 0 0 10px #FFD700, 0 0 20px #E66A00;
}
.top, .bottom { height: 3px; }
.left, .right { width: 3px; }
.top { top: 0; animation: trace-top 4s linear infinite; }
.right { right: 0; animation: trace-right 4s linear infinite 4s; }
.bottom { bottom: 0; animation: trace-bottom 4s linear infinite 8s; }
.left { left: 0; animation: trace-left 4s linear infinite 12s; }

/* --- CABEÇALHO E CORPO DO CARD --- */
.card-header-custom {
  text-align: center; padding: 2rem 1.5rem 1rem 1.5rem;
}
.title-login {
  font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem;
}
.subtitle-login {
  color: #A9A9A9; font-size: 1rem;
}
.card-body-custom {
  padding: 1.5rem 2.5rem 2.5rem 2.5rem;
}

/* --- GRUPO DE INPUT E ANIMAÇÕES --- */
.input-group {
  position: relative; margin-bottom: 1.5rem;
}
.input-icon {
  position: absolute; top: 50%; left: 15px;
  transform: translateY(-50%); color: #777; transition: color 0.3s; z-index: 2;
}
.form-control {
  width: 100%; background-color: #2C2C2C; color: #FFFFFF;
  border: 1px solid #444; border-radius: 8px;
  padding: 1rem 1rem 1rem 3.5rem; font-size: 1rem;
  transition: all 0.3s; position: relative; z-index: 1;
}
.form-label {
  position: absolute; top: 1rem; left: 3.5rem;
  color: #AAA; pointer-events: none;
  transition: all 0.2s ease-out; z-index: 0;
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
  padding: 0 0.4rem; border-radius: 4px; z-index: 10;
}
.form-control:focus ~ .input-icon {
  color: #E66A00;
}

/* --- OPÇÕES (LEMBRAR-ME E ESQUECEU A SENHA) --- */
.options-wrapper {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 1rem; padding: 0 0.2rem;
}
.form-check {
  display: flex; align-items: center; gap: 0.5rem;
}
.form-check-label {
  color: #A9A9A9; font-size: 0.9rem;
}
.form-check-input {
  width: 1.1em; height: 1.1em; border-radius: 4px;
  background-color: #323232; border-color: #555;
  cursor: pointer;
}
.form-check-input:checked {
  background-color: #E66A00; border-color: #E66A00;
}
.link-forgot-password {
  font-size: 0.9rem; font-weight: 600;
  color: #A9A9A9; text-decoration: none;
  transition: color 0.3s;
}
.link-forgot-password:hover {
  color: #FFCA2C;
}

/* --- BOTÃO DE LOGIN --- */
.button-wrapper {
  margin-top: 2rem;
}
.btn-login {
  width: 100%; padding: 1rem; border: none; border-radius: 8px;
  color: #1C1C1C; font-weight: 700; font-size: 1rem;
  text-transform: uppercase;
  background: linear-gradient(135deg, #FFD700, #E66A00);
  cursor: pointer; transition: all 0.3s ease;
  display: flex; align-items: center; justify-content: center;
}
.btn-login:hover:not(:disabled) {
  transform: scale(1.03);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
}
.btn-login:disabled {
  opacity: 0.6; cursor: not-allowed;
}
.spinner-border {
  width: 1.2rem; height: 1.2rem; margin-right: 0.5rem;
}
</style>