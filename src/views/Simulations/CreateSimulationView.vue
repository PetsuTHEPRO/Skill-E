<template>
  <div class="create-simulation-view">
    <header class="view-header">
      <h1>Cadastrar Nova Simulação (Unity Cloud)</h1>
      <router-link :to="{ name: 'listSimulations' }" class="btn btn-secondary">
        &larr; Voltar para a Lista
      </router-link>
    </header>

    <form @submit.prevent="handleSubmit" class="simulation-form">
      <div class="form-group">
        <label for="title">Título da Simulação</label>
        <input id="title" v-model="simulation.title" type="text" placeholder="Ex: Simulação de Logística V1" required />
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea id="description" v-model="simulation.description" rows="4" placeholder="Descreva o objetivo e os detalhes desta simulação."></textarea>
      </div>

      <div class="form-group">
        <label for="imageUrl">URL da Imagem de Capa</label>
        <input id="imageUrl" v-model="simulation.imageUrl" type="url" placeholder="https://exemplo.com/imagem.png" />
        <small>Cole o link para uma imagem que represente a simulação.</small>
      </div>

      <fieldset class="form-group-fieldset">
        <legend>Configurações da Unity Cloud</legend>
        <div class="form-group">
          <label for="unityProjectId">ID do Projeto (Project ID)</label>
          <input id="unityProjectId" v-model="simulation.unityProjectId" type="text" placeholder="cef17674-2aeb-4f2e-a5c7-dc546e8d4d32" required />
        </div>
        <div class="form-group">
          <label for="unityEnvironmentId">ID do Ambiente (Environment ID)</label>
          <input id="unityEnvironmentId" v-model="simulation.unityEnvironmentId" type="text" placeholder="ID do seu ambiente no Unity Cloud" />
        </div>
        <div class="form-group">
          <label for="unityConfigId">ID da Configuração (Config ID)</label>
          <input id="unityConfigId" v-model="simulation.unityConfigId" type="text" placeholder="f0d1481f-aaab-40ea-bff7-ffdb0ee0391f" required />
        </div>
      </fieldset>

      <div v-if="error" class="error-feedback">
        <p><strong>Falha ao cadastrar a simulação:</strong> {{ error }}</p>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Cadastrando...' : 'Cadastrar Simulação' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosService from '@/api/axios';

const router = useRouter();

// Nosso novo objeto reativo para o formulário
const simulation = ref({
  title: '',
  description: '',
  imageUrl: '',
  unityProjectId: '',
  unityEnvironmentId: '',
  unityConfigId: '',
});

const isSubmitting = ref(false);
const error = ref(null);

const handleSubmit = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    // O payload é exatamente o nosso objeto 'simulation'.
    // Nenhuma conversão extra é necessária desta vez.
    const payload = simulation.value;

    // A chamada para o 'axiosService' continua a mesma.
    // Ele vai enviar o payload para o SEU backend.
    await axiosService.createSimulation(payload);

    alert('Simulação cadastrada com sucesso!');
    router.push({ name: 'listSimulations' });

  } catch (err) {
    console.error('Falha ao cadastrar simulação:', err);
    error.value = err.response?.data?.message || err.message || 'Ocorreu um erro desconhecido.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Os estilos dos componentes anteriores podem ser reutilizados aqui. */
/* Cole os estilos do CreateSimulationView.vue anterior aqui. */
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
.form-group input, .form-group textarea {
  padding: 10px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}
.form-group input:focus, .form-group textarea:focus {
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
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
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
.btn-secondary {
  background-color: #e2e8f0;
  color: #2d3748;
}
</style>