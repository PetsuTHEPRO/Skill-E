<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

// --- ESTADO DO COMPONENTE ---
const isLoading = ref(true);
const isSubmitting = ref(false);
const error = ref(null);

// --- DADOS DINÂMICOS DA SIMULAÇÃO ---
const parameters = reactive({});
const initialParameters = ref({});

// --- CONSTANTES DA API ---
const projectId = import.meta.env.VITE_PROJECT_ID;
const configId = import.meta.env.VITE_CONFIG_ID;
const basicAuthCredentials = import.meta.env.VITE_BASIC_AUTH_CREDENTIALS;
const apiUrl = `https://services.api.unity.com/remote-config/v1/projects/${projectId}/configs/${configId}`;


// --- FUNÇÕES DA API ---

/**
 * Busca a configuração inicial da API da Unity usando axios.
 */
async function fetchSimulationConfig() {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(apiUrl, {
      headers: { 'Authorization': `Basic ${basicAuthCredentials}` }
    });
    
    const data = response.data;
    
    if (!data.value || !data.value[0] || !data.value[0].value) {
      throw new Error("A resposta da API não tem a estrutura esperada.");
    }

    const configData = data.value[0].value;
    Object.assign(parameters, configData);
    initialParameters.value = JSON.parse(JSON.stringify(configData));

  } catch (err) {
    console.error("Falha ao buscar configuração:", err);
    error.value = err.response?.data?.message || err.message;
  } finally {
    isLoading.value = false;
  }
}

/**
 * Envia os parâmetros modificados de volta para a API da Unity usando axios.
 */
async function updateParameters() {
  isSubmitting.value = true;
  error.value = null;
  try {
    const payload = {
      type: "settings",
      value: [
        {
          key: "simulation",
          type: "json",
          value: parameters
        }
      ]
    };

    await axios.put(apiUrl, payload, {
      headers: {
        'Authorization': `Basic ${basicAuthCredentials}`,
        'Content-Type': 'application/json'
      }
    });
    
    initialParameters.value = JSON.parse(JSON.stringify(parameters));
    alert('Parâmetros atualizados com sucesso na Unity!');

  } catch (err) {
    console.error("Falha ao atualizar parâmetros:", err);
    error.value = err.response?.data?.message || err.message;
  } finally {
    isSubmitting.value = false;
  }
}

// --- MÉTODOS DE CONTROLE ---

function resetParameters() {
  Object.assign(parameters, initialParameters.value);
  console.log("Parâmetros resetados para o último estado salvo.");
}

// Hook que chama a função para buscar os dados iniciais quando o componente é montado.
onMounted(fetchSimulationConfig);

</script>

<template>
  <div class="simulation-controller-view">
    <div class="control-panel">
      <div class="panel-header">
        <div class="header-content">
          <h2 class="fw-bold">Editor de Configuração</h2>
          <p class="text-muted">Altere os parâmetros e salve na Unity.</p>
        </div>
      </div>

      <div class="separator"></div>

      <div v-if="isLoading" class="text-center p-4">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Carregando configuração...</p>
      </div>
      <div v-else-if="error" class="alert alert-danger">
        <strong>Erro ao carregar dados:</strong> {{ error }}
      </div>
      
      <div v-else class="parameters-form">
        <div v-for="(value, key) in parameters" :key="key" class="parameter-group">
          <label :for="key" class="text-capitalize">{{ key }}</label>

          <input v-if="typeof value === 'number'" :id="key" type="number" class="form-control" v-model.number="parameters[key]" />
          
          <input v-else-if="typeof value === 'string'" :id="key" type="text" class="form-control" v-model="parameters[key]" />
          
          <template v-else-if="Array.isArray(value)">
            <input :id="key" type="text" class="form-control" :value="value.join(', ')" @input="parameters[key] = $event.target.value.split(',').map(s => s.trim())"/>
            <small>Separe os itens por vírgula.</small>
          </template>
          
          <fieldset v-else-if="typeof value === 'object' && value !== null" class="nested-group">
            <div v-for="(nestedValue, nestedKey) in value" :key="nestedKey" class="parameter-group-nested">
              <label :for="`${key}-${nestedKey}`" class="text-capitalize">{{ nestedKey }}</label>
              <input :id="`${key}-${nestedKey}`" type="number" class="form-control form-control-sm" v-model.number="parameters[key][nestedKey]" />
            </div>
          </fieldset>
        </div>
      </div>

      <div class="separator"></div>
      
      <div class="action-buttons">
        <button class="btn btn-primary w-100" @click="updateParameters" :disabled="isLoading || isSubmitting">
          <i class="bi bi-cloud-upload-fill me-2"></i>
          {{ isSubmitting ? 'Atualizando...' : 'Atualizar Parâmetros' }}
        </button>
        <button class="btn btn-secondary w-100 mt-2" @click="resetParameters" :disabled="isLoading || isSubmitting">
          <i class="bi bi-arrow-counterclockwise me-2"></i>
          Resetar
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
  border-color: #7D1479;
  color: var(--input-text-color);
  box-shadow: 0 0 0 0.25rem rgba(125, 20, 121, 0.25);
}

.action-buttons {
  margin-top: auto;
}

.btn-primary {
  background-color: #7D1479;
  border-color: #7D1479;
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