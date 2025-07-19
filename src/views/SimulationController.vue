<script setup>
import { ref, reactive } from 'vue';
import CookiesService from "@/service/CookiesService";

// --- DADOS DA SIMULAÇÃO (Você pode carregar isso de uma API) ---
const simulationData = reactive({
  name: 'Simulador de Gravidade Planetária',
  description: 'Ajuste os parâmetros físicos para observar como a órbita de um satélite é afetada pela gravidade de um planeta. Pressione "Rodar Simulação" para aplicar as mudanças.'
});

// --- PARÂMETROS CONTROLÁVEIS (Valores iniciais) ---
const initialParameters = {
  gravity: 9.8,
  planetMass: 500,
  satelliteSpeed: 25,
  planetType: 'earth',
};

// Usamos reactive para que o objeto de parâmetros seja reativo
const parameters = reactive({ ...initialParameters });

// --- ESTADO DA SIMULAÇÃO ---
const theme = ref(CookiesService.getTheme());
const simulationState = ref('idle'); // pode ser 'idle', 'running', 'finished'
const simulationOutput = ref(null);

// --- MÉTODOS ---
function runSimulation() {
  simulationState.value = 'running';
  simulationOutput.value = null;
  console.log("Iniciando simulação com os seguintes parâmetros:", JSON.parse(JSON.stringify(parameters)));
  
  // AQUI É ONDE A MÁGICA ACONTECE
  // TODO: Enviar o objeto 'parameters' para sua aplicação Unity/WebGL ou API
  // Exemplo: unityInstance.SendMessage('SimulationManager', 'ApplyParameters', JSON.stringify(parameters));

  // Simula um tempo de processamento
  setTimeout(() => {
    simulationOutput.value = {
      message: "Simulação concluída com sucesso!",
      paramsUsed: { ...parameters }
    };
    simulationState.value = 'finished';
  }, 1500); // Atraso de 1.5 segundos
}

function resetParameters() {
  Object.assign(parameters, initialParameters); // Reseta para os valores iniciais
  simulationState.value = 'idle';
  simulationOutput.value = null;
  console.log("Parâmetros resetados para o padrão.");
}
</script>

<template>
  <div class="simulation-controller-view" :class="theme">
    <div class="control-panel">
      <div class="panel-header">
        <h2 class="fw-bold">{{ simulationData.name }}</h2>
        <p class="text-muted">{{ simulationData.description }}</p>
      </div>

      <div class="separator"></div>

      <div class="parameters-form">
        <h3 class="h5 fw-semibold mb-4">Parâmetros Ajustáveis</h3>

        <div class="parameter-group">
          <label for="gravity">Força da Gravidade: <strong>{{ parameters.gravity.toFixed(1) }} m/s²</strong></label>
          <input type="range" id="gravity" class="form-range" v-model.number="parameters.gravity" min="1" max="30" step="0.1" />
        </div>

        <div class="parameter-group">
          <label for="planetMass">Massa do Planeta: <strong>{{ parameters.planetMass }} x10²² kg</strong></label>
          <input type="number" id="planetMass" class="form-control" v-model.number="parameters.planetMass" />
        </div>
        
        <div class="parameter-group">
          <label for="satelliteSpeed">Velocidade Inicial do Satélite: <strong>{{ parameters.satelliteSpeed }} km/s</strong></label>
          <input type="number" id="satelliteSpeed" class="form-control" v-model.number="parameters.satelliteSpeed" />
        </div>

        <div class="parameter-group">
          <label for="planetType">Tipo do Planeta (Visual)</label>
          <select id="planetType" class="form-select" v-model="parameters.planetType">
            <option value="earth">Terra</option>
            <option value="mars">Marte (Rochoso)</option>
            <option value="gas-giant">Gigante Gasoso</option>
            <option value="ice-planet">Planeta de Gelo</option>
          </select>
        </div>
      </div>

      <div class="separator"></div>
      
      <div class="action-buttons">
        <button class="btn btn-primary w-100" @click="runSimulation">
          <i class="bi bi-play-fill me-2"></i>
          Rodar Simulação
        </button>
        <button class="btn btn-secondary w-100 mt-2" @click="resetParameters">
          <i class="bi bi-arrow-counterclockwise me-2"></i>
          Resetar Parâmetros
        </button>
      </div>
    </div>

    <div class="simulation-viewport">
      <div v-if="simulationState === 'idle'" class="placeholder-text">
        <i class="bi bi-box-fill placeholder-icon"></i>
        <h3 class="fw-bold">Área de Simulação</h3>
        <p>Aguardando o início da simulação...</p>
      </div>
      
      <div v-if="simulationState === 'running'" class="placeholder-text">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h3 class="fw-bold mt-3">Processando...</h3>
        <p>Aplicando novos parâmetros.</p>
      </div>

      <div v-if="simulationState === 'finished'" class="output-display">
          <h4 class="text-success fw-bold">{{ simulationOutput.message }}</h4>
          <p>Resultados com base nos seguintes parâmetros:</p>
          <ul class="list-unstyled">
              <li><strong>Gravidade:</strong> {{ simulationOutput.paramsUsed.gravity.toFixed(1) }} m/s²</li>
              <li><strong>Massa do Planeta:</strong> {{ simulationOutput.paramsUsed.planetMass }} x10²² kg</li>
              <li><strong>Velocidade do Satélite:</strong> {{ simulationOutput.paramsUsed.satelliteSpeed }} km/s</li>
              <li><strong>Tipo do Planeta:</strong> {{ simulationOutput.paramsUsed.planetType }}</li>
          </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estrutura Principal */
.simulation-controller-view {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8f9fa;
}

/* Painel de Controle (Esquerda) */
.control-panel {
  flex-basis: 380px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.separator {
  border-top: 1px solid #dee2e6;
  margin: 1.5rem 0;
}

.parameter-group {
  margin-bottom: 1.5rem;
}

.parameter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.action-buttons {
  margin-top: auto; /* Empurra os botões para o final */
}

.btn-primary {
    background-color: #7D1479;
    border-color: #7D1479;
    font-weight: bold;
}
.btn-primary:hover {
    background-color: #6c1168;
    border-color: #6c1168;
}

/* Viewport da Simulação (Direita) */
.simulation-viewport {
  flex-grow: 1;
  background-color: #e9ecef;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

.placeholder-icon {
  font-size: 4rem;
  color: #ced4da;
}

.output-display {
    background-color: rgba(255, 255, 255, 0.7);
    padding: 2rem;
    border-radius: 8px;
    text-align: left;
}

/* Estilos de Tema */
.dark-theme {
    background-color: #121214;
    color: #F5F5F7;
}
.dark-theme .control-panel {
    background-color: #1E1E1E;
    border: 1px solid #2D2D2D;
    color: #F5F5F7;
}
.dark-theme .separator {
    border-color: #2D2D2D;
}
.dark-theme .parameter-group label, .dark-theme h2, .dark-theme .text-muted {
    color: #F5F5F7 !important;
}
.dark-theme .form-control, .dark-theme .form-select {
    background-color: #2A2A2A;
    border-color: #444;
    color: #F5F5F7;
}
.dark-theme .simulation-viewport {
    background-color: #2A2A2A;
}
.dark-theme .placeholder-icon {
    color: #444;
}

/* Responsividade */
@media (max-width: 992px) {
  .simulation-controller-view {
    flex-direction: column;
  }
  .control-panel {
    flex-basis: auto; /* Reseta a base flexível */
  }
}
</style>