<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import StatCard from "@/components/StatCard.vue";
import BarChart from "@/components/BarChart.vue";
</script>

<template>
  <div class="container-fluid d-flex dashboard-view p-0" :class="theme">
    <SideBar />
    <!-- A classe 'content-wrapper-closed' será adicionada dinamicamente -->
    <div class="container-fluid content-wrapper p-0" :class="{ 'content-wrapper-closed': !isSidebarOpen }">
      <MenuBar role="Professor" />
      <main class="p-4">
        <header class="d-flex align-items-center justify-content-between mb-4">
          <h1 class="h3 fw-bold mb-0">Dashboard de Relatórios</h1>
          <button @click="exportToExcel" class="btn btn-primary-custom">
            Exportar para Excel
          </button>
        </header>

        <section class="mb-4">
          <div class="row g-4">
            <div class="col-12 col-sm-6 col-lg-3">
              <StatCard title="Total de Simulações" :value="stats.simulations" />
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <StatCard title="Usuários Ativos (Mês)" :value="stats.activeUsers" />
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <StatCard title="Total de Acessos" :value="stats.totalAccess" />
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <StatCard title="Pontuação Média" :value="stats.averageScore" />
            </div>
          </div>
        </section>

        <section>
          <div class="row g-4">
            <div class="col-12 col-lg-7">
              <div class="chart-container">
                <h2 class="h5 fw-semibold mb-3">Simulações por Mês</h2>
                <div class="chart-wrapper">
                  <BarChart :chartData="barChartData" />
                </div>
              </div>
            </div>

            <div class="col-12 col-lg-5">
              <div class="activity-container">
                <h2 class="h5 fw-semibold mb-3">Últimos Acessos</h2>
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Usuário</th>
                        <th scope="col">Simulação</th>
                        <th scope="col">Pontos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="log in activityLog" :key="log.id">
                        <td>{{ log.user }}</td>
                        <td>{{ log.simulation }}</td>
                        <td>{{ log.score }}</td>
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
import { utils, writeFile } from "xlsx";
import storage from "@/service/storage";
import { mapState } from "vuex"; // Importa o mapState do Vuex

export default {
  data() {
    return {
      // DADOS FICTÍCIOS (MOCK). Substitua por chamadas de API no `mounted`.
      stats: {
        simulations: 0,
        activeUsers: 0,
        totalAccess: 0,
        averageScore: 0,
      },
      barChartData: {
        labels: [],
        datasets: [{
          label: 'Nº de Simulações',
          backgroundColor: '#FF7A00', // Cor primária da paleta
          data: [],
        }],
      },
      activityLog: []
    };
  },
  computed: {
    ...mapState({
      isSidebarOpen: state => state.isSidebarOpen // Mapeia o estado da sidebar
    }),
    theme() {
      return storage.getTheme() || "light-theme";
    }
  },
  mounted() {
    // AQUI VOCÊ DEVE CHAMAR SUA API PARA OBTER OS DADOS REAIS
    this.fetchDashboardData();
  },
  methods: {
    fetchDashboardData() {
      // Simulação de uma chamada de API
      console.log("Buscando dados do dashboard...");
      // Exemplo de como você preencheria os dados (substitua isso)
      this.stats = {
        simulations: 152,
        activeUsers: 34,
        totalAccess: 1489,
        averageScore: 8.7,
      };
      this.barChartData = {
        labels: ['Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [{
          label: 'Nº de Simulações',
          backgroundColor: '#FF7A00',
          data: [40, 65, 59, 80, 81],
        }],
      };
      this.activityLog = [
        { id: 1, user: 'Ana Silva', simulation: 'Motor Elétrico', score: 9 },
        { id: 2, user: 'Bruno Costa', simulation: 'Circuito Hidráulico', score: 7 },
        { id: 3, user: 'Carla Dias', simulation: 'Braço Robótico', score: 10 },
        { id: 4, user: 'Daniel Farias', simulation: 'Motor Elétrico', score: 8 },
        { id: 5, user: 'Eduarda Lima', simulation: 'Prensa Mecânica', score: 9 },
      ];
    },
    exportToExcel() {
      // Lógica para exportar a tabela de atividades
      const worksheet = utils.json_to_sheet(this.activityLog);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Acessos");
      // Gera o arquivo e inicia o download
      writeFile(workbook, "RelatorioDeAcessos.xlsx");
    },
  },
};
</script>

<!-- NOVO BLOCO DE ESTILO GLOBAL -->
<style>
/* Estilos Globais para corrigir o layout e remover a barra de rolagem dupla */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Esconde a barra de rolagem principal do navegador */
}
</style>


<style scoped>
/* Importa a paleta de cores e a fonte */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

.chart-container,
.activity-container {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  height: 100%;
}

.chart-wrapper {
  height: 350px; /* Altura fixa para o gráfico */
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

.table thead th {
  background-color: var(--background-color);
}

/* --- CÓDIGO ALTERADO PARA O LAYOUT FIXO E DINÂMICO --- */

/* 1. O container da view inteira */
.dashboard-view {
  height: 100vh; /* Garante que a view ocupe 100% da altura da tela */
  overflow: hidden; /* Evita barras de rolagem duplas e desnecessárias */
}

/* 2. O wrapper do conteúdo (área à direita da sidebar) */
.content-wrapper {
  flex-grow: 1; 
  display: flex; 
  flex-direction: column;
  min-width: 0;
  
  /* Define a margem inicial (para sidebar aberta) e a transição */
  margin-left: 250px; /* Largura da sua sidebar aberta */
  transition: margin-left 0.3s ease-in-out;
}

/* Nova regra para quando a sidebar está fechada */
.content-wrapper.content-wrapper-closed {
  margin-left: 80px; /* Largura da sua sidebar fechada */
}

.light-theme {
  background-color: #F5F5F7;
  color: #121214;
}

/* Tema dark */
.dark-theme {
  background-color: #121214;
  color: #F5F5F7;
}

/* 3. O conteúdo principal que deve ter a rolagem */
main {
  flex-grow: 1; 
  overflow-y: auto;
}

/* --- CÓDIGO ADICIONADO PARA RESPONSIVIDADE MOBILE --- */
@media (max-width: 992px) {
  /* Em telas menores, o conteúdo principal sempre ocupa 100% da largura */
  .content-wrapper,
  .content-wrapper.content-wrapper-closed {
    margin-left: 0;
  }

  /* Estiliza a sidebar (componente filho) para se comportar como um overlay.
    O seletor :deep() permite que o estilo deste componente "vaze" e afete
    o componente filho <SideBar />.
  */
  :deep(.sidebar) {
    /* Move a sidebar para fora da tela por padrão */
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  }

  /* Quando a sidebar NÃO estiver fechada, ela desliza para dentro da tela */
  :deep(.sidebar:not(.sidebar-closed)) {
    transform: translateX(0);
  }
}

</style>
