<template>
  <div class="container-fluid d-flex dashboard-view p-0">
    <SideBar />
    <div
      class="container-fluid content-wrapper p-0"
      :class="{ 'content-wrapper-closed': !isSidebarOpen }"
    >
      <MenuBar />
      <main class="main-content">
        <div class="list-simulations-view">
          <header class="view-header">
            <div class="header-title">
              <i class="bi bi-boxes title-icon"></i>
              <h1>Minhas Simulações</h1>
            </div>
            <router-link
              :to="{ name: 'createSimulation' }"
              class="btn btn-primary"
            >
              <i class="bi bi-plus-lg"></i>
              Criar Nova Simulação
            </router-link>
          </header>

          <div v-if="loading" class="simulations-grid">
            <div v-for="n in 6" :key="n" class="skeleton-card">
              <div class="skeleton-image"></div>
              <div class="skeleton-content">
                <div class="skeleton-line title"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line medium"></div>
              </div>
            </div>
          </div>

          <div v-else>
            <div v-if="simulations.length === 0" class="empty-state">
              <i class="bi bi-box-seam empty-icon"></i>
              <h2>Nenhuma Simulação Encontrada</h2>
              <p>Parece que você ainda não criou nenhuma simulação.</p>
              <router-link
                :to="{ name: 'createSimulation' }"
                class="btn btn-primary mt-3"
              >
                Comece a criar agora
              </router-link>
            </div>

            <transition-group name="card-list" tag="div" class="simulations-grid">
              <div v-for="sim in paginatedSimulations" :key="sim.id" class="simulation-card">
                <div class="card-image-container">
                  <img v-if="sim.image" :src="sim.image" alt="Imagem da simulação" class="card-image"/>
                  <div v-else class="image-placeholder">
                    <i class="bi bi-image-alt"></i>
                  </div>
                </div>

                <div class="card-content">
                  <div class="card-body">
                    <h3 class="card-title">{{ sim.name }}</h3>
                    <p class="card-description">{{ sim.description }}</p>
                  </div>

                  <div class="card-footer">
                    <span class="simulation-id">ID: {{ sim.id }}</span>
                    <div class="actions">
                      <router-link :to="{ name: 'viewSimulation', params: { id: sim.id } }" class="btn btn-secondary">
                        <i class="bi bi-eye"></i> Ver
                      </router-link>
                      <router-link :to="{ name: 'editSimulation', params: { id: sim.id } }" class="btn btn-tertiary">
                        <i class="bi bi-pencil"></i> Editar
                      </router-link>
                      <button @click="handleDelete(sim.id)" class="btn btn-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </transition-group>
          </div>

          <div v-if="!loading && simulations.length > 0 && totalPages > 1" class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">Anterior</button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">Próxima</button>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script>
// O SCRIPT PERMANECE O MESMO, A LÓGICA DE BUSCA E PAGINAÇÃO ESTÁ CORRETA.
import { mapState } from "vuex";
import axiosService from "@/api/axios";
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  components: { MenuBar, SideBar },
  data() {
    return {
      simulations: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    ...mapState({ isSidebarOpen: (state) => state.isSidebarOpen }),
    totalPages() {
      return Math.ceil(this.simulations.length / this.itemsPerPage);
    },
    paginatedSimulations() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.simulations.slice(start, end);
    },
  },
  methods: {
    async fetchSimulations() {
      this.loading = true;
      try {
        const response = await axiosService.getSimulations();
        console.log(response.data)
        this.simulations = Array.isArray(response.data.content) ? response.data.content : [response.data.content];
      } catch (err) {
        console.error("Falha ao buscar simulações:", err);
        this.simulations = [];
      } finally {
        this.loading = false;
      }
    },
    async handleDelete(id) {
      if (!confirm(`Você tem certeza que deseja excluir a simulação "${id}"?`)) return;
      try {
        await axiosService.delete(`/simulations/${id}`);
        const index = this.simulations.findIndex(sim => sim.id === id);
        if (index > -1) this.simulations.splice(index, 1);
        if (this.paginatedSimulations.length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }
      } catch (err) {
        console.error(`Falha ao excluir a simulação ${id}:`, err);
        alert(`Não foi possível excluir a simulação. Verifique o console para mais detalhes.`);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
  },
  mounted() {
    this.fetchSimulations();
  },
};
</script>

<style scoped>
/* --- ANIMAÇÕES E ESTILOS GERAIS (Mantidos) --- */
@keyframes pulse {
  0%, 100% { background-color: #f0f2f5; }
  50% { background-color: #e2e8f0; }
}
.card-list-enter-active, .card-list-leave-active {
  transition: all 0.5s ease;
}
.card-list-enter-from, .card-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.dashboard-view {
  height: 100vh;
  overflow: hidden;
  background-color: #EBEBEF;
}
.content-wrapper {
  flex-grow: 1; display: flex; flex-direction: column; min-width: 0;
  margin-left: 250px; transition: margin-left 0.3s ease-in-out;
}
.content-wrapper.content-wrapper-closed { margin-left: 80px; }
.main-content { flex-grow: 1; overflow-y: auto; padding: 2rem; }
.list-simulations-view { max-width: 1400px; margin: 0 auto; }
.view-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 2rem;
}
.header-title { display: flex; align-items: center; gap: 0.75rem; }
.title-icon { font-size: 2rem; color: #ff7a00; }
h1 { font-size: 1.8rem; color: #1d1d1f; font-weight: 700; }
.empty-state {
  text-align: center; padding: 4rem 2rem; background-color: #ffffff;
  border-radius: 16px; color: #5a5a5a; border: 1px solid #eaeaea;
}
.empty-icon { font-size: 4rem; color: #e2e8f0; margin-bottom: 1rem; }

/* --- GRID E SKELETON LOADER (Atualizado) --- */
.simulations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}
.skeleton-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #eaeaea;
  overflow: hidden;
}
.skeleton-image {
  height: 180px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.skeleton-content { padding: 1.25rem; }
.skeleton-line {
  height: 1rem; border-radius: 4px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  margin-bottom: 0.75rem;
}
.skeleton-line.title { width: 60%; height: 1.5rem; }
.skeleton-line.medium { width: 80%; }

/* --- CARD DE SIMULAÇÃO (REFEITO) --- */
.simulation-card {
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Garante que a imagem não ultrapasse as bordas arredondadas */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.simulation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
}
.card-image-container {
  height: 180px;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que a imagem cubra o espaço sem distorcer */
}
.image-placeholder .bi {
  font-size: 3rem;
  color: #d1d5db;
}
.card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Faz este container ocupar o espaço restante */
}
.card-body {
  padding: 1.25rem;
  flex-grow: 1;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d1d1f;
  margin: 0 0 0.5rem 0;
}
.card-description {
  color: #5a5a5a;
  font-size: 0.9rem;
  line-height: 1.5;
  /* Limita a descrição a 3 linhas para manter o card consistente */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.card-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.simulation-id {
  font-weight: 600; color: #b0b0b0; font-size: 0.8rem;
}
.actions { display: flex; gap: 0.5rem; }

/* --- PAGINAÇÃO E BOTÕES (Mantidos) --- */
.pagination-controls {
  display: flex; justify-content: center; align-items: center;
  gap: 1rem; margin-top: 2rem; padding: 1rem;
}
.btn {
  padding: 0.6rem 1.2rem; border: none; border-radius: 8px;
  cursor: pointer; text-decoration: none; font-size: 14px;
  font-weight: 600; transition: all 0.2s; display: inline-flex;
  align-items: center; justify-content: center; gap: 0.5rem;
}
.btn-primary {
  background-color: #ff7a00; color: white;
  box-shadow: 0 4px 12px rgba(255, 122, 0, 0.2);
}
.btn-primary:hover {
  background-color: #e66f00; transform: translateY(-2px);
}
.btn-secondary { background-color: #f0f2f5; color: #5a5a5a; }
.btn-secondary:hover:not(:disabled) { background-color: #eaeaeb; }
.btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-tertiary { background: none; color: #5a5a5a; }
.btn-tertiary:hover { background-color: #f5f5f7; }
.btn-danger {
  background-color: transparent; color: #c53030;
  padding: 0.6rem; /* Deixa o botão de lixeira mais sutil */
}
.btn-danger:hover { background-color: #fbecec; }

/* Responsividade */
@media (max-width: 992px) {
  /* Mantido */
  .content-wrapper, .content-wrapper.content-wrapper-closed { margin-left: 0; }
  .main-content { padding: 1rem; }
  .view-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
}
</style>