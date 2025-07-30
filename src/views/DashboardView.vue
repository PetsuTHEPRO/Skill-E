<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import StatCard from "@/components/StatCard.vue"; // Lembre-se de usar o novo StatCard da resposta anterior
import BarChart from "@/components/BarChart.vue";
</script>

<template>
  <div class="container-fluid d-flex dashboard-view p-0" :class="theme">
    <SideBar class="d-none d-lg-block"/>
    <div class="container-fluid content-wrapper p-0" :class="{ 'content-wrapper-closed': !isSidebarOpen }">
      <MenuBar role="Professor" />
      <main class="main-content">
        <header class="page-header">
          <div>
            <h1 class="h2 fw-bold mb-1">Dashboard de Simulações</h1>
            <p class="text-muted">Visão geral e relatórios de atividade.</p>
          </div>
          <button @click="exportToExcel" class="btn-export">
            <i class="bi bi-file-earmark-spreadsheet-fill"></i>
            <span>Exportar Relatório</span>
          </button>
        </header>

        <section class="mb-4">
          <div class="row g-4">
            <div
              class="col-12 col-md-6 col-lg-4 animated-card"
              v-for="(card, index) in statCards"
              :key="card.title"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <StatCard
                :title="card.title"
                :value="card.value"
                :icon="card.icon"
                :color="card.color"
              />
            </div>
          </div>
        </section>

        <section class="animated-section" style="animation-delay: 300ms;">
          <div class="row g-4">
            <div class="col-12 col-lg-7">
              <div class="data-container">
                <h2 class="h5 fw-semibold mb-3">Novas Simulações por Mês</h2>
                <div class="chart-wrapper">
                  <BarChart :chartData="barChartData" />
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-5">
              <div class="data-container">
                <h2 class="h5 fw-semibold mb-3">Últimas Atividades</h2>
                <div class="table-responsive">
                  <table class="table table-hover align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Usuário</th>
                        <th scope="col">Simulação</th>
                        <th scope="col" class="text-center">Pontos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="log in activityLog" :key="log.id">
                        <td>{{ log.user }}</td>
                        <td><span class="text-muted">{{ log.simulation }}</span></td>
                        <td class="text-center">
                          <span class="badge" :class="getScoreBadge(log.score)">{{ log.score }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
// O SCRIPT PERMANECE O MESMO DA RESPOSTA ANTERIOR
import { utils, writeFile } from "xlsx";
import storage from "@/service/storage";
import { mapState } from "vuex";

export default {
  data() {
    return {
      statCards: [],
      barChartData: {
        labels: [],
        datasets: [{
          label: 'Nº de Simulações',
          backgroundColor: '#FF7A00',
          borderRadius: 4,
          data: [],
        }],
      },
      activityLog: []
    };
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.isSidebarOpen
    }),
    theme() {
      return storage.getTheme() || "light-theme";
    }
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      setTimeout(() => {
        this.statCards = [
          { title: 'Simulações Cadastradas', value: 152, icon: 'bi bi-archive-fill', color: 'primary' },
          { title: 'Simulações Ativas', value: 138, icon: 'bi bi-broadcast', color: 'success' },
          { title: 'Simulações com Falha', value: 14, icon: 'bi bi-exclamation-triangle-fill', color: 'danger' }
        ];
        this.barChartData = {
          labels: ['Março', 'Abril', 'Maio', 'Junho', 'Julho'],
          datasets: [{
            label: 'Nº de Simulações',
            backgroundColor: 'rgba(255, 122, 0, 0.7)',
            borderColor: '#FF7A00',
            borderWidth: 2,
            hoverBackgroundColor: '#FF7A00',
            borderRadius: 6,
            data: [12, 19, 15, 25, 22],
          }],
        };
        this.activityLog = [
          { id: 1, user: 'Ana Silva', simulation: 'Motor Elétrico', score: 9.5 },
          { id: 2, user: 'Bruno Costa', simulation: 'Circuito Hidráulico', score: 7.0 },
          { id: 3, user: 'Carla Dias', simulation: 'Braço Robótico', score: 10.0 },
          { id: 4, user: 'Daniel Farias', simulation: 'Motor Elétrico', score: 5.5 },
          { id: 5, user: 'Eduarda Lima', simulation: 'Prensa Mecânica', score: 8.0 },
        ];
      }, 500);
    },
    exportToExcel() {
      const worksheet = utils.json_to_sheet(this.activityLog);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Acessos");
      writeFile(workbook, "RelatorioDeAtividade.xlsx");
    },
    getScoreBadge(score) {
      if (score >= 9) return 'text-bg-success';
      if (score >= 6) return 'text-bg-warning';
      return 'text-bg-danger';
    }
  },
};
</script>

<style>
/* Estilos Globais podem permanecer, se necessário */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>


<style scoped>
/* --- ANIMAÇÕES GLOBAIS --- */
@keyframes slide-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- ESTRUTURA PRINCIPAL (LAYOUT FIXO DA SIDEBAR) --- */
/* ESTA É A PARTE CRÍTICA QUE FOI RESTAURADA E UNIFICADA */

.dashboard-view {
  height: 100vh;
  overflow: hidden;
  background-color: #F8F9FA;
}

.content-wrapper {
  flex-grow: 1; 
  display: flex; 
  flex-direction: column;
  min-width: 0;
  /* Define a margem inicial (para sidebar aberta) e a transição */
  margin-left: 250px; /* Largura da sua sidebar ABERTA */
  transition: margin-left 0.3s ease-in-out;
}

/* Regra ESSENCIAL para quando a sidebar está fechada */
.content-wrapper.content-wrapper-closed {
  margin-left: 80px; /* Largura da sua sidebar FECHADA */
}

.main-content {
  flex-grow: 1; 
  overflow-y: auto; /* Apenas o conteúdo principal tem rolagem */
  padding: 2rem;
}

/* --- ESTILOS DO DASHBOARD (HEADER, BOTÃO, ETC.) --- */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  animation: slide-fade-in 0.5s ease-out forwards;
}

.page-header .text-muted {
  color: var(--text-secondary);
}

.animated-card {
  /* Usado para aplicar a animação em cascata nos cards */
  opacity: 0; /* Começa invisível */
  animation: slide-fade-in 0.6s ease-out forwards;
}

.animated-section {
  opacity: 0; /* Começa invisível */
  animation: slide-fade-in 0.6s ease-out forwards;
}

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--primary-color), #c96200);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px -5px rgba(255, 122, 0, 0.6);
}

.btn-export:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 20px -5px rgba(255, 122, 0, 0.8);
}

.btn-export i {
  font-size: 1.2rem;
}

/* --- CONTAINERS DE DADOS (GRÁFICOS E TABELAS) --- */

.data-container {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  height: 100%;
}

.chart-wrapper {
  height: 350px;
  position: relative;
}

.table-responsive {
  max-height: 350px;
  overflow-y: auto;
}

.table {
  --bs-table-hover-bg: var(--background-color);
  --bs-table-striped-bg: var(--background-color);
  border-color: var(--border-color);
}

.badge {
  font-size: 0.85rem;
  padding: 0.5em 0.75em;
}

/* --- RESPONSIVIDADE (MOBILE) --- */
/* ESTA PARTE TAMBÉM É CRÍTICA E FOI MANTIDA EXATAMENTE COMO NO ORIGINAL */
@media (max-width: 992px) {
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }

  :deep(.sidebar) {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    position: absolute; /* Garante que a sidebar flutue sobre o conteúdo */
    z-index: 1050; /* Garante que fique acima de outros elementos */
    height: 100vh;
  }

  :deep(.sidebar:not(.sidebar-closed)) {
    transform: translateX(0);
  }
}

</style>