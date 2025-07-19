<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // 1. Importe a função

const router = useRouter();
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import cookieService from "@/service/CookiesService.js";

// --- Estado do Componente ---
const theme = ref(cookieService.getTheme());
const role = ref(cookieService.getRole() === "educator" ? "Professor" : "Estudante");

// --- Dados Fictícios (Mock Data) ---
// Substitua isso por uma chamada à sua API para buscar as simulações
const simulations = ref([
  { id: 1, title: 'Simulação do Sistema Solar', description: 'Uma visualização interativa das órbitas e planetas do nosso sistema solar. Explore a física por trás dos movimentos planetários.', previewImage: null },
  { id: 2, title: 'Laboratório de Química Virtual', description: 'Misture diferentes elementos químicos em um ambiente seguro e veja as reações. Ideal para aulas práticas de química.', previewImage: null },
  { id: 3, title: 'Construção de Circuitos Elétricos', description: 'Monte circuitos elétricos complexos com resistores, capacitores e fontes de energia, e teste seu funcionamento em tempo real.', previewImage: null },
  { id: 4, title: 'Anatomia Humana em 3D', description: 'Explore o corpo humano em um modelo 3D detalhado. Visualize ossos, músculos e órgãos com alta fidelidade.', previewImage: null },
  { id: 5, title: 'Simulador de Forças Físicas', description: 'Aplique forças, atrito e gravidade a diferentes objetos e entenda os princípios fundamentais da mecânica clássica.', previewImage: null },
  { id: 6, title: 'Ecossistema de uma Floresta', description: 'Observe a interação entre diferentes espécies de plantas e animais em um ecossistema simulado ao longo do tempo.', previewImage: null },
  { id: 7, title: 'Viagem ao Centro da Terra', description: 'Uma jornada educativa pelas camadas da Terra, desde a crosta até o núcleo, com informações geológicas interativas.', previewImage: null },
]);

// --- Lógica de Paginação ---
const currentPage = ref(1);
const itemsPerPage = ref(6); // Quantos cards por página

const totalPages = computed(() => {
  return Math.ceil(simulations.value.length / itemsPerPage.value);
});

const paginatedSimulations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return simulations.value.slice(start, end);
});

// --- Métodos ---
function goToNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function goToPreviousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function registerNewSimulation() {
  // TODO: Adicionar lógica para navegar para a tela de cadastro
  console.log("Navegar para a tela de cadastro de nova simulação.");
  alert("Funcionalidade de cadastrar nova simulação a ser implementada!");
}

function accessSimulation(simulationId) {
  // Exemplo de navegação para a tela de detalhes da simulação
  router.push({ name: "engineerClassroom", params: { id: simulationId } });
}

</script>

<template>
  <div class="container-fluid d-flex simulations-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid margin-mobile p-0">
      <MenuBar :role="role" />
      
      <main class="simulations-content">
        <header class="simulations-header">
          <h1>Simulações</h1>
          <button v-if="role === 'Professor'" @click="registerNewSimulation" class="btn btn-primary">
            Cadastrar Nova Simulação
          </button>
        </header>

        <div class="simulations-grid">
          <div v-for="sim in paginatedSimulations" :key="sim.id" class="simulation-card">
            <div class="card-preview">
              <span>Preview da Simulação</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ sim.title }}</h3>
              <p class="card-description">{{ sim.description }}</p>
            </div>
            <div class="card-actions">
              <button @click="accessSimulation(sim.id)" class="btn btn-secondary">
                Acessar
              </button>
            </div>
          </div>
        </div>

        <nav class="pagination-controls" v-if="totalPages > 1">
          <button @click="goToPreviousPage" :disabled="currentPage === 1" class="btn">
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="goToNextPage" :disabled="currentPage === totalPages" class="btn">
            Próximo
          </button>
        </nav>

      </main>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700&display=swap");

/* Estilos Globais da Tela e Temas */
.simulations-view {
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.light-theme {
  background-color: #F5F5F7;
  color: #121214;
}

.dark-theme {
  background-color: #121214;
  color: #F5F5F7;
}

/* Estilos do Conteúdo Principal */
.simulations-content {
  padding: 2rem 3rem;
  max-width: 100%;
}

.simulations-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.simulations-header h1 {
  font-weight: 700;
  font-size: 2.25rem;
}

/* Estilos dos Botões */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007BFF;
  color: white;
}
.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  width: 100%;
}
.btn-secondary:hover {
  background-color: #5a6268;
}

/* Tema Dark para Botões */
.dark-theme .btn-primary {
  background-color: #3B82F6;
}
.dark-theme .btn-primary:hover {
  background-color: #2563EB;
}
.dark-theme .btn-secondary {
  background-color: #333;
  border: 1px solid #444;
}
.dark-theme .btn-secondary:hover {
  background-color: #444;
}


/* Grid e Cards de Simulação */
.simulations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.simulation-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.simulation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.light-theme .simulation-card {
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
}

.dark-theme .simulation-card {
  background-color: #1E1E1E;
  border: 1px solid #2D2D2D;
}

.card-preview {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
}
.light-theme .card-preview {
  background-color: #E9ECEF;
  color: #495057;
}
.dark-theme .card-preview {
  background-color: #2A2A2A;
  color: #A0A0A0;
}


.card-body {
  padding: 1.5rem;
  flex-grow: 1; /* Faz o corpo do card crescer */
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #6c757d;
}
.dark-theme .card-description {
  color: #A0A0A0;
}

.card-actions {
  padding: 0 1.5rem 1.5rem 1.5rem;
}


/* Controles de Paginação */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  width: 100%;
}

/* Media Queries para Mobile */
@media (max-width: 768px) {
  .simulations-content {
    padding: 1.5rem 1rem;
  }
  
  .simulations-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .simulations-header h1 {
    text-align: center;
    font-size: 1.75rem;
  }

  .max-vw-100 {
    width: calc(100vw - 80px);
  }
}
</style>