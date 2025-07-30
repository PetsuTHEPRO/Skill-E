<template>
  <div class="support-form-container">
    <div class="support-card bg-white">
      <div class="card-header">
        <h5 class="card-title">Formulário de Suporte</h5>
        <p class="card-subtitle">
          Precisa de ajuda? Preencha os campos abaixo e nossa equipe entrará em contato.
        </p>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitSupportRequest" class="support-form">
          
          <div class="form-group">
            <i class="bi bi-envelope form-icon"></i>
            <input
              v-model="support.email"
              type="email"
              class="form-control"
              id="email"
              placeholder=" "
            />
            <label for="email" class="form-label">Email para Contato</label>
          </div>

          <div class="form-group">
            <i class="bi bi-telephone form-icon"></i>
            <input
              v-model="support.phone"
              type="tel"
              class="form-control"
              id="phone"
              placeholder=" "
            />
            <label for="phone" class="form-label">Telefone para Contato</label>
          </div>

          <div class="form-group">
            <i class="bi bi-lightbulb form-icon"></i>
            <select v-model="support.razao" id="reason" class="form-control">
              <option value="" disabled>Selecione a razão do contato</option>
              <option value="bugs">Bugs e Glitchs</option>
              <option value="payment">Falhas no Pagamento</option>
              <option value="suggestions">Sugestões de Melhoria</option>
              <option value="access">Problemas de Acesso</option>
              <option value="functionality">Dúvidas sobre Funcionalidades</option>
              <option value="security">Questões de Segurança</option>
              <option value="performance">Problemas de Desempenho</option>
            </select>
            <label for="reason" class="form-label">Razão da Solicitação</label>
          </div>

          <div class="form-group">
            <i class="bi bi-pencil-square form-icon"></i>
            <textarea
              v-model="support.descricao"
              id="description"
              class="form-control"
              rows="4"
              placeholder=" "
            ></textarea>
            <label for="description" class="form-label">Descrição Detalhada</label>
          </div>

          <div class="button-container">
            <button 
              type="submit" 
              class="btn-submit" 
              :disabled="isLoading"
              :class="{ 'is-loading': isLoading, 'is-success': isSuccess }"
            >
              <span class="btn-content">
                <i class="bi bi-check-lg icon-success"></i>
                <span class="spinner-border spinner-border-sm icon-loading" role="status"></span>
                <span class="btn-text">Enviar Solicitação</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios.js";
import CookiesService from "@/service/CookiesService.js";
import notificationService from '@/service/notificationService.js';

export default {
  data() {
    return {
      support: {
        name: CookiesService.getName(),
        email: "",
        phone: "",
        razao: "",
        descricao: ""
      },
      isLoading: false,
      isSuccess: false, // Novo estado para feedback de sucesso
    };
  },
  methods: {
    validateForm() {
      // Validação permanece a mesma
      if (!this.support.email) {
        notificationService.error('Preencha o campo email.');
        return false;
      }
      if (!this.support.phone) {
        notificationService.error('Preencha o campo telefone.');
        return false;
      }
      if (!this.support.razao) {
        notificationService.error('Selecione a razão do suporte.');
        return false;
      }
      if (!this.support.descricao || this.support.descricao.length < 10) {
        notificationService.error('A descrição precisa ter pelo menos 10 caracteres.');
        return false;
      }
      return true;
    },

    submitSupportRequest() {
      if (!this.validateForm() || this.isLoading) {
        return;
      }

      this.isLoading = true;
      
      axios.sendEmail(this.support)
        .then(() => {
          notificationService.success("Suporte solicitado com sucesso!");
          this.isSuccess = true; // Ativa o estado de sucesso
          // Reseta o formulário
          this.support.email = "";
          this.support.phone = "";
          this.support.razao = "";
          this.support.descricao = "";

          // Reseta o botão após a animação de sucesso
          setTimeout(() => {
            this.isLoading = false;
            this.isSuccess = false;
          }, 2000);
        })
        .catch((error) => {
          this.isLoading = false; // Garante que o botão volte ao normal em caso de erro
          if (error.response) {
            notificationService.error(error.response.data);
          } else {
            notificationService.error("Servidor Offline, entre em contato com a equipe técnica!");
          }
        });
    },
  },
};
</script>

<style scoped>
/* --- ANIMAÇÃO E ESTILO GERAL --- */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.support-form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  width: 100%;
  animation: fadeIn 0.5s ease-out;
}

.support-card {
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  overflow: hidden;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.card-header {
  padding: 1.5rem;
  text-align: center;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 1rem;
}

.card-body {
  padding: 2rem;
}

/* --- ESTILO DO FORMULÁRIO COM LABELS FLUTUANTES --- */
.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  transition: color 0.3s;
}

.form-control {
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 2.5rem; /* Espaço para o ícone */
  border: 1px solid;
  border-radius: 8px;
  background-color: transparent;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-label {
  position: absolute;
  top: 0.8rem;
  left: 2.5rem;
  pointer-events: none;
  transition: all 0.2s ease-out;
}

/* Animação da Label Flutuante */
.form-control:focus + .form-label,
.form-control:not(:placeholder-shown) + .form-label,
.form-control:valid + .form-label { /* Para o select */
  top: -1rem;
  left: 0.8rem;
  font-size: 0.75rem;
  padding: 0 0.2rem;
}

/* --- BOTÃO DE ENVIO --- */
.button-container {
  text-align: center;
  margin-top: 1rem;
}

.btn-submit {
  position: relative;
  width: 100%;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Estados de Loading e Sucesso do Botão */
.btn-content { display: inline-flex; align-items: center; transition: all 0.3s ease; }
.icon-loading, .icon-success { display: none; }

.is-loading .btn-text { display: none; }
.is-loading .icon-loading { display: inline-block; margin-right: 0.5rem; }

.is-success { background: #28a745; }
.is-success .btn-text, .is-success .icon-loading { display: none; }
.is-success .icon-success { display: inline-block; font-size: 1.2rem; }


/* --- TEMA CLARO --- */
.support-card {
  background-color: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #eef2f7;
}
.card-subtitle { color: #6c757d; }
.form-icon { color: #adb5bd; }
.form-control { border-color: #ced4da; color: #212529; }
.form-label { background-color: #ffffff; color: #6c757d; }
.form-control:focus {
  border-color: #2575fc;
  box-shadow: 0 0 0 3px rgba(37, 117, 252, 0.15);
}
.form-control:focus + .form-label,
.form-control:focus ~ .form-icon {
  color: #2575fc;
}
</style>