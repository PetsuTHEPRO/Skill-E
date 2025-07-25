<template>
  <div class="create-simulation-view">
    <header class="view-header">
      <h1>Criar Nova Simulação</h1>
      <router-link :to="{ name: 'listSimulations' }" class="btn btn-secondary">
        &larr; Voltar para a Lista
      </router-link>
    </header>

    <form @submit.prevent="handleSubmit" class="simulation-form">
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

      <div v-if="error" class="error-feedback">
        <p><strong>Falha ao criar a simulação:</strong> {{ error }}</p>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Salvando...' : 'Salvar Simulação' }}
        </button>
        <router-link :to="{ name: 'listSimulations' }" class="btn btn-cancel">
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosService from '@/api/axios'; // Usando o serviço refatorado

// --- Inicialização ---
const router = useRouter();

// --- Estado Reativo ---

// Objeto que armazena os dados do formulário, espelhando a estrutura do JSON
const simulation = ref({
  forkHeight: 1.5,
  maxSpeed: 4.0,
  startPosition: {
    x: 10,
    y: 0,
    z: 55,
  },
});

// Usamos um input separado para as tarefas para facilitar o v-model com uma string
const tasksInput = ref('pickup, charge, park');

const isSubmitting = ref(false);
const error = ref(null);

// --- Métodos ---

/**
 * Lida com a submissão do formulário.
 */
const handleSubmit = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    // 1. Processar os dados para enviar à API
    const payload = {
      ...simulation.value,
      // Converte a string "task1, task2" em um array ["task1", "task2"]
      tasks: tasksInput.value
        .split(',')            // Divide a string pela vírgula
        .map(task => task.trim()) // Remove espaços em branco antes/depois de cada tarefa
        .filter(task => task),    // Remove tarefas vazias caso haja vírgulas extras (ex: "a,,b")
    };

    // 2. Chamar o serviço da API
    await axiosService.createSimulation(payload);

    // 3. Dar feedback e redirecionar em caso de sucesso
    alert('Simulação criada com sucesso!');
    router.push({ name: 'listSimulations' });

  } catch (err) {
    // 4. Capturar e exibir erros
    console.error('Falha ao criar simulação:', err);
    // Tenta pegar uma mensagem de erro específica da resposta da API, senão uma genérica
    error.value = err.response?.data?.message || err.message || 'Ocorreu um erro desconhecido.';
  } finally {
    // 5. Reativar o botão de submissão
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.create-simulation-view {
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