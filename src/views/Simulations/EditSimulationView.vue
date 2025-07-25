<template>
  <div class="edit-simulation-view">
    <header class="view-header">
      <h1>Editar Simulação #{{ id }}</h1>
      <router-link :to="{ name: 'listSimulations' }" class="btn btn-secondary">
        &larr; Voltar para a Lista
      </router-link>
    </header>

    <div v-if="isLoading" class="loading-state">
      <p>Carregando dados da simulação...</p>
    </div>

    <div v-else-if="error" class="error-feedback">
      <p><strong>{{ error }}</strong></p>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="simulation-form">
      <div class="form-group">
        <label for="forkHeight">Altura do Garfo (metros)</label>
        <input
          id="forkHeight"
          v-model.number="simulation.forkHeight"
          type="number"
          step="0.1"
          required
        />
      </div>

      <div class="form-group">
        <label for="maxSpeed">Velocidade Máxima (m/s)</label>
        <input
          id="maxSpeed"
          v-model.number="simulation.maxSpeed"
          type="number"
          step="0.1"
          required
        />
      </div>

      <fieldset class="form-group-fieldset">
        <legend>Posição Inicial</legend>
        <div class="position-group">
          <div class="form-group">
            <label for="posX">Eixo X</label>
            <input id="posX" v-model.number="simulation.startPosition.x" type="number" required />
          </div>
          <div class="form-group">
            <label for="posY">Eixo Y</label>
            <input id="posY" v-model.number="simulation.startPosition.y" type="number" required />
          </div>
          <div class="form-group">
            <label for="posZ">Eixo Z</label>
            <input id="posZ" v-model.number="simulation.startPosition.z" type="number" required />
          </div>
        </div>
      </fieldset>

      <div class="form-group">
        <label for="tasks">Tarefas</label>
        <input
          id="tasks"
          v-model="tasksInput"
          type="text"
          placeholder="Ex: pickup, charge, park"
          required
        />
        <small>Separe as tarefas por vírgula.</small>
      </div>

      <div v-if="submitError" class="error-feedback">
        <p><strong>Falha ao salvar as alterações:</strong> {{ submitError }}</p>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
        <router-link :to="{ name: 'listSimulations' }" class="btn btn-cancel">
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosService from '@/api/axiosService.js';

// --- Inicialização e Props ---
const router = useRouter();

// Recebe o 'id' da URL como uma propriedade, graças ao `props: true` no router
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

// --- Estado Reativo ---
const simulation = ref({
  startPosition: {}, // Inicializa como objeto vazio para evitar erros de renderização
});
const tasksInput = ref(''); // String para o input de tarefas

const isLoading = ref(true); // Para o carregamento inicial
const isSubmitting = ref(false); // Para o processo de submissão

const error = ref(null); // Erro no carregamento inicial
const submitError = ref(null); // Erro na submissão

// --- Métodos ---

/**
 * Busca os dados da simulação específica na API ao carregar o componente.
 */
const fetchSimulationData = async () => {
  try {
    const response = await axiosService.getSimulationById(props.id);
    simulation.value = response.data;
    
    // Converte o array de tarefas da API em uma string para o input
    if (response.data.tasks && Array.isArray(response.data.tasks)) {
      tasksInput.value = response.data.tasks.join(', ');
    }

  } catch (err) {
    console.error('Falha ao carregar dados da simulação:', err);
    error.value = 'Não foi possível encontrar a simulação solicitada.';
  } finally {
    isLoading.value = false;
  }
};

/**
 * Lida com a submissão do formulário para atualizar os dados.
 */
const handleSubmit = async () => {
  isSubmitting.value = true;
  submitError.value = null;

  try {
    // Processa os dados para o formato esperado pela API
    const payload = {
      ...simulation.value,
      tasks: tasksInput.value.split(',').map(task => task.trim()).filter(task => task),
    };

    // Chama o serviço da API para ATUALIZAR
    await axiosService.updateSimulation(props.id, payload);

    alert('Simulação atualizada com sucesso!');
    router.push({ name: 'listSimulations' });

  } catch (err) {
    console.error('Falha ao atualizar simulação:', err);
    submitError.value = err.response?.data?.message || err.message || 'Ocorreu um erro desconhecido.';
  } finally {
    isSubmitting.value = false;
  }
};

// --- Lifecycle Hook ---
// Ao montar o componente, busca os dados da simulação
onMounted(() => {
  fetchSimulationData();
});
</script>

<style scoped>
/* Os estilos são idênticos aos do CreateSimulationView para manter a consistência */
.edit-simulation-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  font-family: sans-serif;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
}

h1 {
  font-size: 1.8rem;
  color: #2d3748;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #555;
}

.simulation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label,
.form-group-fieldset legend {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.form-group input,
.form-group-fieldset input {
  padding: 10px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
}

.form-group small {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #718096;
}

.form-group-fieldset {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1rem 1.5rem;
}

.position-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
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
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
}
.btn-primary:hover:not(:disabled) {
  background-color: #2b6cb0;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #2d3748;
}
.btn-secondary:hover {
  background-color: #cbd5e0;
}

.btn-cancel {
  background-color: transparent;
  color: #718096;
}
.btn-cancel:hover {
  background-color: #edf2f7;
}
</style>