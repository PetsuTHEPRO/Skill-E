<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosService from "@/api/axios";

import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";

const router = useRouter();

// Objeto reativo ALINHADO com o backend
const simulation = ref({
  name: "",
  description: "", // <--- Adicione esta linha
  image: "",
  productId: "",
  environmentId: "",
  configId: "",
  keyApi: "", // Novo campo
});

const isSubmitting = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    // O payload já está no formato correto para o backend
    await axiosService.createSimulation(simulation.value);

    // Sucesso
    alert("Simulação cadastrada com sucesso!");
    router.push({ name: "listSimulations" });
  } catch (err) {
    console.error("Falha ao cadastrar simulação:", err);
    error.value =
      err.response?.data?.message ||
      err.message ||
      "Ocorreu um erro desconhecido.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container-fluid d-flex dashboard-view p-0" :class="theme">
    <SideBar />
    <div
      class="container-fluid content-wrapper p-0"
      :class="{ 'content-wrapper-closed': !isSidebarOpen }"
    >
      <MenuBar />
      <main class="main-content">
        <div class="create-simulation-view">
          <header class="view-header">
            <h1>Cadastrar Nova Simulação</h1>
            <router-link
              :to="{ name: 'listSimulations' }"
              class="btn btn-secondary"
            >
              <i class="bi bi-arrow-left"></i> Voltar para a Lista
            </router-link>
          </header>

          <form @submit.prevent="handleSubmit" class="simulation-form">
            <div class="form-group">
              <label for="name">Título da Simulação</label>
              <div class="input-wrapper">
                <i class="bi bi-card-heading input-icon"></i>
                <input
                  id="name"
                  v-model="simulation.name"
                  type="text"
                  placeholder="Ex: Simulação de Logística V1"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="description">Descrição</label>
              <div class="input-wrapper">
                <i class="bi bi-file-text-fill input-icon"></i>
                <textarea
                  id="description"
                  v-model="simulation.description"
                  rows="4"
                  placeholder="Descreva o objetivo e os detalhes desta simulação."
                ></textarea>
              </div>
            </div>

            <div class="form-group">
              <label for="image">URL da Imagem de Capa</label>
              <div class="input-wrapper">
                <i class="bi bi-image input-icon"></i>
                <input
                  id="image"
                  v-model="simulation.image"
                  type="url"
                  placeholder="https://exemplo.com/imagem.png"
                />
              </div>
              <small
                >Cole o link para uma imagem que represente a simulação.</small
              >
            </div>

            <fieldset class="form-group-fieldset">
              <legend>
                <i class="bi bi-clouds-fill"></i> Configurações da Unity Cloud
              </legend>
              <div class="form-group">
                <label for="productId">ID do Projeto (Project ID)</label>
                <div class="input-wrapper">
                  <i class="bi bi-folder2-open input-icon"></i>
                  <input
                    id="productId"
                    v-model="simulation.productId"
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="environmentId"
                  >ID do Ambiente (Environment ID)</label
                >
                <div class="input-wrapper">
                  <i class="bi bi-cloud input-icon"></i>
                  <input
                    id="environmentId"
                    v-model="simulation.environmentId"
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="configId">ID da Configuração (Config ID)</label>
                <div class="input-wrapper">
                  <i class="bi bi-gear input-icon"></i>
                  <input
                    id="configId"
                    v-model="simulation.configId"
                    type="text"
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="keyApi">Chave de API (API Key)</label>
                <div class="input-wrapper">
                  <i class="bi bi-key-fill input-icon"></i>
                  <input
                    id="keyApi"
                    v-model="simulation.keyApi"
                    type="password"
                    placeholder="Cole sua chave de API aqui"
                    required
                  />
                </div>
              </div>
            </fieldset>

            <div v-if="error" class="error-feedback">
              <p><strong>Falha ao cadastrar:</strong> {{ error }}</p>
            </div>

            <div class="form-actions">
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  Cadastrando...
                </span>
                <span v-else>
                  <i class="bi bi-plus-lg"></i> Cadastrar Simulação
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// O script para o tema e sidebar continua o mesmo
import storage from "@/service/storage";
import { mapState } from "vuex";

export default {
  components: { MenuBar, SideBar },
  computed: {
    ...mapState({ isSidebarOpen: (state) => state.isSidebarOpen }),
    theme() {
      return storage.getTheme();
    },
  },
};
</script>

<style scoped>
/* --- ANIMAÇÕES --- */
@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- ESTILOS GERAIS DA PÁGINA --- */
/* Mantidos os estilos de layout principal para consistência */
.dashboard-view {
  height: 100vh;
  overflow: hidden;
  font-family: sans-serif;
}
.content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-left: 250px;
  transition: margin-left 0.3s ease-in-out;
}
.content-wrapper.content-wrapper-closed {
  margin-left: 80px;
}
.main-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 2rem;
}

/* --- ESTILOS DO FORMULÁRIO DE CRIAÇÃO --- */
.create-simulation-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: var(--surface-color, #ffffff);
  color: var(--text-primary, #1d1d1f);
  border-radius: 16px;
  border: 1px solid var(--border-color, #eaeaea);
  animation: fadeInSlideUp 0.6s ease-out;
}

/* Animação em cascata para os elementos do formulário */
.view-header,
.form-group,
.form-group-fieldset,
.form-actions {
  opacity: 0;
  animation: fadeInSlideUp 0.5s ease-out forwards;
}
/* Bloco novo e atualizado */
.form-group:nth-of-type(1) { animation-delay: 0.1s; } /* Título */
.form-group:nth-of-type(2) { animation-delay: 0.2s; } /* Descrição */
.form-group:nth-of-type(3) { animation-delay: 0.3s; } /* Imagem */
.form-group-fieldset { animation-delay: 0.4s; }
.form-actions { animation-delay: 0.5s; }

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--border-color, #eaeaea);
  padding-bottom: 1.5rem;
}
h1 {
  font-size: 1.8rem;
}
.simulation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.form-group small {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Wrapper para input com ícone */
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary, #888);
  font-size: 1.1rem;
  pointer-events: none;
  transition: color 0.2s;
}

/* 2. ESTA É A NOVA REGRA - SÓ PARA O TEXTAREA */
/* "Se um .input-wrapper CONTÉM (HAS) um textarea, aplique este estilo ao .input-icon que está dentro dele" */
.input-wrapper:has(textarea) .input-icon {
  top: 14px; /* Alinha no topo */
  transform: none; /* Remove a centralização */
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 12px 12px 40px; /* Espaço para o ícone */
  border: 1px solid var(--border-color, #ccc);
  background-color: var(--background-color, #f5f5f7);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color, #ff7a00);
  box-shadow: 0 0 0 3px var(--primary-color-light, rgba(255, 122, 0, 0.2));
}
/* Muda a cor do ícone quando o input está em foco */
.form-group input:focus ~ .input-icon,
.form-group textarea:focus ~ .input-icon {
  color: var(--primary-color, #ff7a00);
}

.form-group-fieldset {
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group-fieldset legend {
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  width: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color, #eaeaea);
}

.error-feedback {
  background-color: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #f56565;
  text-align: center;
}
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-primary {
  background-color: var(--primary-color, #ff7a00);
  color: white;
}
.btn-secondary {
  background-color: var(--surface-color, #fff);
  color: var(--text-primary);
  border: 1px solid var(--border-color, #eaeaea);
}
.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-2px);
}
.btn-secondary:hover:not(:disabled) {
  background-color: var(--background-color, #f5f5f7);
}
.spinner-border {
  margin-right: 0.5rem;
}

/* Responsividade */
@media (max-width: 992px) {
  /* Mantido como estava */
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }
  .main-content {
    padding: 1rem;
  }
  .create-simulation-view {
    padding: 1.5rem;
  }
  :deep(.sidebar) {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }
  :deep(.sidebar:not(.sidebar-closed)) {
    transform: translateX(0);
  }
}
</style>
