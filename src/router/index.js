import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";
import NotFound from "../views/NotFound.vue";
import axiosService from "@/api/axios";
import SimulationController from '@/views/SimulationManagerView.vue';

const routes = [
  // --- Rotas Públicas ---
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Autenticacao/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Autenticacao/RegisterView.vue"),
  },
  {
    path: "/simulation/manager/", // Rota para o seu controlador de simulação existente
    name: "simulation-manager",
    component: SimulationController,
  },

  // --- Rotas Protegidas (Painel do Engenheiro) ---
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/support",
    name: "support",
    component: () => import("@/views/SupportView.vue"),
    meta: { requiresAuth: true },
  },
  
  // --- ROTAS CRUD DE SIMULAÇÃO ---
  {
    path: "/simulations",
    name: "listSimulations",
    // Componente para listar todas as simulações em uma tabela ou lista.
    component: () => import("../views/Simulations/ListSimulationsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/simulations/new",
    name: "createSimulation",
    // Componente com um formulário para criar uma nova simulação.
    component: () => import("../views/Simulations/CreateSimulationView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/simulations/:id",
    name: "viewSimulation",
    // Componente para visualizar os detalhes de uma simulação específica.
    component: () => import("../views/Simulations/SimulationDetailView.vue"),
    meta: { requiresAuth: true },
    props: true, // Passa o :id da URL como uma prop para o componente
  },
  {
    path: "/simulations/:id/edit",
    name: "editSimulation",
    // Componente com um formulário para editar uma simulação existente.
    component: () => import("../views/Simulations/EditSimulationView.vue"),
    meta: { requiresAuth: true },
    props: true, // Passa o :id da URL como uma prop para o componente
  },

  // --- Rota Not Found (Sempre por último) ---
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// O guarda de navegação unificado continua perfeito e não precisa de alterações!
// Ele protege qualquer rota que tenha `meta: { requiresAuth: true }`.
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    return next({ name: 'dashboard' });
  }

  if (!requiresAuth) {
    return next();
  }

  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'login' });
  }

  if (requiresAuth && isAuthenticated) {
    try {
      const response = await axiosService.validateToken();
      if (response.status === 200) {
        return next();
      } else {
        store.dispatch("logout");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro de validação de token:", error);
      store.dispatch("logout");
      window.location.reload();
    }
  }
});


export default router;