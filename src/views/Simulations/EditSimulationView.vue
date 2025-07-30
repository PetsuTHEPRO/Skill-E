<template>
  <div class="container-fluid d-flex dashboard-view p-0" :class="theme">
    <SideBar class="d-none d-lg-block"/>
    <div
      class="container-fluid content-wrapper p-0"
      :class="{ 'content-wrapper-closed': !isSidebarOpen }"
    >
      <MenuBar />
      <main class="main-content">
        <div class="edit-simulation-view">
          <header class="view-header">
            <h1>Editar Simulação #{{ id }}</h1>
            <router-link
              :to="{ name: 'listSimulations' }"
              class="btn btn-secondary"
            >
              <i class="bi bi-arrow-left"></i> Voltar para a Lista
            </router-link>
          </header>

          <div v-if="isLoading" class="loading-state">
            <span class="spinner-border" role="status"></span>
            <span>Carregando dados da simulação...</span>
          </div>

          <div v-else-if="fetchError" class="error-feedback">
            <p>
              <strong>{{ fetchError }}</strong>
            </p>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="simulation-form">
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
                    placeholder="Deixe em branco para manter a chave atual"
                  />
                </div>
                <small
                  >A chave só precisa ser fornecida se você desejar
                  atualizá-la.</small
                >
              </div>
            </fieldset>

            <div v-if="submitError" class="error-feedback">
              <p><strong>Falha ao salvar:</strong> {{ submitError }}</p>
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
                  Salvando...
                </span>
                <span v-else>
                  <i class="bi bi-check-lg"></i> Salvar Alterações
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// Ajuste o caminho se o seu axiosService estiver em um local diferente
import axiosService from "@/api/axios";
import notificationService from "@/service/notificationService";

// Importa os componentes de layout
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";

const router = useRouter();

// Recebe o 'id' da URL como uma propriedade
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// --- Estado Reativo ---

// Objeto que guardará os dados do formulário. Começa vazio.
const simulation = ref({});

// Estados de controle da UI
const isLoading = ref(true); // Controla o feedback de carregamento inicial
const isSubmitting = ref(false); // Controla o estado do botão de salvar

// Estados de erro
const fetchError = ref(null); // Erro ao buscar os dados
const submitError = ref(null); // Erro ao enviar os dados

/**
 * Busca os dados da simulação específica na API ao carregar o componente.
 */
const fetchSimulationData = async () => {
  isLoading.value = true;
  fetchError.value = null;
  try {
    const response = await axiosService.getSimulationById(props.id);
    // Preenche o objeto reativo com os dados vindos da API
    simulation.value = response.data;
  } catch (err) {
    console.error("Falha ao carregar dados da simulação:", err);
    fetchError.value = "Não foi possível encontrar a simulação solicitada.";
  } finally {
    isLoading.value = false;
  }
};

/**
 * Lida com a submissão do formulário para ATUALIZAR os dados.
 */
const handleSubmit = async () => {
  isSubmitting.value = true;
  submitError.value = null;

  try {
    // Cria uma cópia dos dados do formulário para enviar
    const payload = { ...simulation.value };

    // Lógica de segurança para a keyApi:
    // Se o campo da chave estiver vazio, remova-o do payload.
    // Assim, o backend não tentará atualizar a chave com um valor vazio.
    if (!payload.keyApi || payload.keyApi.trim() === "") {
      delete payload.keyApi;
    }

    // Chama o serviço da API para ATUALIZAR (update)
    await axiosService.updateSimulation(props.id, payload);

    notificationService.success("Simulação atualizada com sucesso!");
    router.push({ name: "listSimulations" });
  } catch (err) {
    console.error("Falha ao atualizar simulação:", err);
    submitError.value =
      err.response?.data?.message ||
      err.message ||
      "Ocorreu um erro desconhecido.";
  } finally {
    isSubmitting.value = false;
  }
};

// --- Lifecycle Hook ---
// Ao montar o componente, chama a função para buscar os dados
onMounted(() => {
  fetchSimulationData();
});
</script>

<script>
// Script opcional para tema e sidebar (igual ao do create)
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
/* --- ESTILOS --- */
/* Copie e cole EXATAMENTE o mesmo bloco <style> do seu componente de criação. */
/* Apenas renomeei a classe principal para fins de clareza semântica. */
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

/* Classe principal da view de edição */
.edit-simulation-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem;
  background-color: var(--surface-color, #ffffff);
  color: var(--text-primary, #1d1d1f);
  border-radius: 16px;
  border: 1px solid var(--border-color, #eaeaea);
  animation: fadeInSlideUp 0.6s ease-out;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.view-header,
.form-group,
.form-group-fieldset,
.form-actions {
  opacity: 0;
  animation: fadeInSlideUp 0.5s ease-out forwards;
}
.form-group:nth-of-type(1) {
  animation-delay: 0.1s;
}
.form-group:nth-of-type(2) {
  animation-delay: 0.2s;
}
.form-group:nth-of-type(3) {
  animation-delay: 0.3s;
}
.form-group-fieldset {
  animation-delay: 0.4s;
}
.form-actions {
  animation-delay: 0.5s;
}

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
.input-wrapper:has(textarea) .input-icon {
  top: 14px;
  transform: none;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid var(--border-color, #ccc);
  background-color: var(--background-color, #f5f5f7);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color, #ff7a00);
  box-shadow: 0 0 0 3px var(--primary-color-light, rgba(255, 122, 0, 0.2));
}
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

@media (max-width: 992px) {
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }
  .main-content {
    padding: 1rem;
  }
  .edit-simulation-view {
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
