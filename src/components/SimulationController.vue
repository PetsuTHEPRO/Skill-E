<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import apiService from "@/api/axios.js";

// --- PROPS ---
const props = defineProps({
  // O projectId agora pode vir do componente pai ou da URL
  // O nome da prop foi ajustado para refletir que é o ID da simulação principal
  simulationId: {
    type: String,
    required: true,
  },
});

// --- ESTADO DO COMPONENTE ---
const isLoading = ref(true);
const error = ref(null);

// NOVO: Guarda o array completo de configurações que vem da API
const allConfigs = ref([]);
// NOVO: Guarda a 'key' da configuração que está selecionada no <select>
const selectedConfigKey = ref("");

// O objeto 'parameters' agora representa o 'value' da configuração SELECIONADA
const parameters = reactive({});
const initialParameters = ref({}); // Para a função de "Resetar"

// --- FUNÇÃO DA API ---
async function fetchSimulationConfigs() {
  isLoading.value = true;
  error.value = null;
  try {
    // A chamada para o backend continua a mesma
    const response = await apiService.getSimulationConfig(props.simulationId);

    // Armazena o array completo de configurações
    allConfigs.value = response.data;

    // Se a lista não estiver vazia, seleciona a primeira configuração por padrão
    if (allConfigs.value.length > 0) {
      selectedConfigKey.value = allConfigs.value[0].key;
    }
  } catch (err) {
    console.error("Falha ao buscar configurações:", err);
    error.value = err.response?.data?.message || err.message;
  } finally {
    isLoading.value = false;
  }
}

// --- LÓGICA DE CONTROLE ---

// NOVO: WATCH EFFECT
// Observa a 'selectedConfigKey'. Quando ela muda (pelo <select>),
// esta função é executada para atualizar o formulário.
watch(selectedConfigKey, (newKey) => {
  if (!newKey) return;

  // Encontra o objeto de configuração correspondente no array 'allConfigs'
  const selectedConfig = allConfigs.value.find(
    (config) => config.key === newKey
  );

  if (selectedConfig) {
    // Limpa o objeto de parâmetros antigo
    Object.keys(parameters).forEach((key) => delete parameters[key]);

    // Preenche o objeto 'parameters' com o novo 'value'
    Object.assign(parameters, selectedConfig.value);

    // Atualiza a cópia inicial para que o botão "Resetar" funcione corretamente
    initialParameters.value = JSON.parse(JSON.stringify(selectedConfig.value));
  }
});

function resetParameters() {
  Object.assign(parameters, initialParameters.value);
}

// --- LIFECYCLE HOOKS ---
onMounted(fetchSimulationConfigs);
watch(() => props.simulationId, fetchSimulationConfigs);
</script>

<template>
  <div class="simulation-controller-view">
    <div class="control-panel">
      <div class="panel-header">
        <div class="header-content">
          <h2 class="fw-bold">Editor de Configuração</h2>
          <p class="text-muted">
            Altere os parâmetros da simulação em tempo real.
          </p>
        </div>
      </div>

      <div class="separator"></div>

      <div v-if="allConfigs.length > 0" class="parameter-group">
        <label for="config-selector" class="fw-bold">Configuração</label>
        <select id="config-selector" class="form-select" v-model="selectedConfigKey">
          <option v-for="config in allConfigs" :key="config.key" :value="config.key">
            {{ config.key }}
          </option>
        </select>
      </div>
      
      <div v-if="successMessage" class="alert alert-success">
        <i class="bi bi-check-circle-fill me-2"></i>
        {{ successMessage }}
      </div>

      <div v-if="isLoading" class="text-center p-4">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Carregando configuração da Unity...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        <strong>Erro:</strong> {{ error }}
      </div>

      <div v-else class="parameters-form">
        <div
          v-for="(value, key) in parameters"
          :key="key"
          class="parameter-group"
        >
          <label :for="key" class="text-capitalize">{{
            key.replace(/([A-Z])/g, " $1")
          }}</label>

          <input
            v-if="typeof value === 'number'"
            :id="key"
            type="number"
            step="0.1"
            class="form-control"
            v-model.number="parameters[key]"
          />

          <input
            v-else-if="typeof value === 'string'"
            :id="key"
            type="text"
            class="form-control"
            v-model="parameters[key]"
          />

          <template v-else-if="Array.isArray(value)">
            <input
              :id="key"
              type="text"
              class="form-control"
              :value="value.join(', ')"
              @input="
                parameters[key] = $event.target.value
                  .split(',')
                  .map((s) => s.trim())
              "
            />
            <small>Separe os itens por vírgula.</small>
          </template>

          <fieldset
            v-else-if="typeof value === 'object' && value !== null"
            class="nested-group"
          >
            <div
              v-for="(nestedValue, nestedKey) in value"
              :key="nestedKey"
              class="parameter-group-nested"
            >
              <label :for="`${key}-${nestedKey}`" class="text-capitalize">{{
                nestedKey.replace(/([A-Z])/g, " $1")
              }}</label>
              <input
                :id="`${key}-${nestedKey}`"
                type="number"
                step="0.1"
                class="form-control form-control-sm"
                v-model.number="parameters[key][nestedKey]"
              />
            </div>
          </fieldset>
        </div>
      </div>

      <div class="separator"></div>

      <div class="action-buttons">
        <button
          class="btn btn-primary w-100"
          @click="updateParameters"
          :disabled="isLoading || isSubmitting"
        >
          <span
            v-if="isSubmitting"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          <i v-else class="bi bi-cloud-upload-fill me-2"></i>
          {{ isSubmitting ? "Atualizando..." : "Atualizar na Unity" }}
        </button>
        <button
          class="btn btn-secondary w-100 mt-2"
          @click="resetParameters"
          :disabled="isLoading || isSubmitting"
        >
          <i class="bi bi-arrow-counterclockwise me-2"></i>
          Resetar Alterações
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos com cores fixas para o tema light */
.simulation-controller-view {
  --bg-color: #f8f9fa;
  --panel-bg-color: #ffffff;
  --text-primary: #212529;
  --text-secondary: #495057;
  --text-muted: #718096;
  --border-color: #dee2e6;
  --input-bg-color: #ffffff;
  --input-border-color: #ced4da;
  --input-text-color: #212529;

  padding: 2rem;
  min-height: 100vh;
  background-color: var(--bg-color);
  display: grid;
  place-items: center;
  transition: background-color 0.3s ease;
}

.control-panel {
  width: 100%;
  max-width: 500px;
  background-color: var(--panel-bg-color);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.panel-header h2 {
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.panel-header .text-muted {
  color: var(--text-muted) !important;
}

.separator {
  border-top: 1px solid var(--border-color);
  margin: 1.5rem 0;
}

.parameter-group {
  margin-bottom: 1.5rem;
}

.parameter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary);
}
.parameter-group small {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Estilos para os inputs */
.form-control {
  background-color: var(--input-bg-color);
  border: 1px solid var(--input-border-color);
  color: var(--input-text-color);
}
.form-control:focus {
  background-color: var(--input-bg-color);
  border-color: #7d1479;
  color: var(--input-text-color);
  box-shadow: 0 0 0 0.25rem rgba(125, 20, 121, 0.25);
}

.action-buttons {
  margin-top: auto;
}

.btn-primary {
  background-color: #7d1479;
  border-color: #7d1479;
  font-weight: bold;
}
.btn-primary:hover:not(:disabled) {
  background-color: #6c1168;
  border-color: #6c1168;
}
.btn-secondary {
  font-weight: 500;
  background-color: var(--text-muted);
  border-color: var(--text-muted);
  color: var(--panel-bg-color);
}
.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.nested-group {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
}
.parameter-group-nested {
  flex: 1;
}
.parameter-group-nested label {
  font-size: 0.85rem;
  font-weight: normal;
}
</style>
