<template>
  <div class="list-simulations-view">
    <header class="view-header">
      <h1>Minhas Simulações</h1>
      <router-link :to="{ name: 'createSimulation' }" class="btn btn-primary">
        + Criar Nova Simulação
      </router-link>
    </header>

    <div v-if="loading" class="loading-state">
      <p>Carregando simulações...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <p>Ocorreu um erro ao carregar as simulações. Por favor, tente novamente.</p>
      <p class="error-message">Detalhes: {{ error }}</p>
    </div>

    <div v-else>
      <div v-if="simulations.length === 0" class="empty-state">
        <p>Nenhuma simulação encontrada.</p>
        <p>Clique em "Criar Nova Simulação" para começar.</p>
      </div>
      
      <table v-else class="simulations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Velocidade Máx.</th>
            <th>Altura do Garfo</th>
            <th>Posição Inicial (X, Y, Z)</th>
            <th>Tarefas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sim in simulations" :key="sim.id">
            <td>{{ sim.id }}</td>
            <td>{{ sim.maxSpeed }} m/s</td>
            <td>{{ sim.forkHeight }} m</td>
            <td>({{ sim.startPosition.x }}, {{ sim.startPosition.y }}, {{ sim.startPosition.z }})</td>
            <td>{{ sim.tasks.join(', ') }}</td>
            <td class="actions-cell">
              <router-link :to="{ name: 'viewSimulation', params: { id: sim.id } }" class="btn btn-secondary">
                Ver
              </router-link>
              <router-link :to="{ name: 'editSimulation', params: { id: sim.id } }" class="btn btn-tertiary">
                Editar
              </router-link>
              <button @click="handleDelete(sim.id)" class="btn btn-danger">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosService from '@/api/axios'; // Certifique-se que o caminho está correto

// --- Estado Reativo ---
const simulations = ref([]);
const loading = ref(true);
const error = ref(null);

// --- Funções ---

/**
 * Busca a lista de simulações da API quando o componente é montado.
 */
const fetchSimulations = async () => {
  try {
    // IMPORTANTE: Estou assumindo que seu endpoint da API para listar as simulações é '/simulations'
    const response = await axiosService.get('/simulations'); 
    
    // O JSON de exemplo é um objeto, mas uma lista deve retornar um array.
    // Se a API retornar um único objeto, vamos colocá-lo em um array para o exemplo.
    if (Array.isArray(response.data)) {
      simulations.value = response.data;
    } else {
      // Isso é um fallback para o caso da API retornar o JSON de exemplo diretamente
      simulations.value = [response.data]; 
    }

  } catch (err) {
    console.error("Falha ao buscar simulações:", err);
    error.value = err.message || 'Erro desconhecido';
  } finally {
    loading.value = false;
  }
};

/**
 * Lida com o clique no botão de exclusão.
 * @param {string} id - O ID da simulação a ser excluída.
 */
const handleDelete = async (id) => {
  // Pede confirmação ao usuário antes de uma ação destrutiva
  if (!confirm(`Você tem certeza que deseja excluir a simulação "${id}"?`)) {
    return;
  }

  try {
    // IMPORTANTE: Assumindo que o endpoint para deletar é '/simulations/:id'
    await axiosService.delete(`/simulations/${id}`);
    
    // Remove a simulação da lista local para feedback imediato na UI
    simulations.value = simulations.value.filter(sim => sim.id !== id);
    
    // Opcional: Adicionar uma notificação de sucesso (toast)
    alert(`Simulação "${id}" excluída com sucesso!`);

  } catch (err) {
    console.error(`Falha ao excluir a simulação ${id}:`, err);
    alert(`Não foi possível excluir a simulação. Erro: ${err.message}`);
  }
};

// --- Lifecycle Hook ---

// Chama a função para buscar os dados assim que o componente for "montado" na página.
onMounted(() => {
  fetchSimulations();
});
</script>

<style scoped>
.list-simulations-view {
  padding: 2rem;
  font-family: sans-serif;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
  padding-bottom: 1rem;
}

.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  color: #555;
}

.error-state {
  background-color: #fff0f0;
  border: 1px solid #ffcccc;
  color: #c53030;
}

.error-message {
  font-size: 0.9em;
  color: #a52a2a;
}

.simulations-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.simulations-table th, .simulations-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
}

.simulations-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.simulations-table tbody tr:hover {
  background-color: #f9f9f9;
}

.actions-cell {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-tertiary {
  background-color: #17a2b8;
  color: white;
}
.btn-tertiary:hover {
  background-color: #138496;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
.btn-danger:hover {
  background-color: #c82333;
}
</style>