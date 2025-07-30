import axios from "axios";
import CookiesService from "@/service/CookiesService.js";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosService = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor para adicionar o token de autenticação em todas as requisições.
 * Isso evita a repetição de código em cada função que precisa de autenticação.
 */
axiosService.interceptors.request.use(
  (config) => {
    const token = CookiesService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  // --- Autenticação e Gerenciamento de Usuário ---

  /**
   * Realiza o login do usuário.
   * @param {object} userData - { email, password }
   */
  loginUser(userData) {
    return axiosService.post("/auth/login", userData);
  },

  /**
   * Registra um novo usuário.
   * @param {object} userData - { name, telephone, email, password }
   */
  registerUser(userData) {
    // A LÓGICA DE ROLE E ESPECIALIDADE FOI REMOVIDA
    return axiosService.post("/auth/register", userData);
  },

  /**
   * Valida o token atual com o backend.
   */
  validateToken() {
    return axiosService.get("/token/validate");
  },

  /**
   * Busca os dados do usuário logado.
   * @param {string} id - ID do usuário.
   */
  getUser(id) {
    // MUDANDO A ROTA PARA UM PADRÃO REST MELHOR
    return axiosService.get(`/users/${id}`);
  },

  /**
   * Atualiza o perfil do usuário.
   * @param {string} id - O ID do usuário a ser atualizado.
   * @param {object} userData - { name, telephone }
   */
  updateUser(id, userData) {
    // MUDANDO A ROTA PARA UM PADRÃO REST MELHOR E REMOVENDO ESPECIALIDADE
    return axiosService.put(`/users/${id}`, userData);
  },

  // --- CRUD de Simulações ---

  /**
   * Busca uma lista de todas as simulações.
   */
  getSimulations() {
    return axiosService.get("/simulations");
  },

  /**
   * Busca os detalhes de uma simulação específica por ID.
   * @param {string} id - O ID da simulação.
   */
  getSimulationById(id) {
    return axiosService.get(`/simulations/${id}`);
  },

  /**
   * Cria uma nova simulação.
   * @param {object} simulationData - Os dados da nova simulação.
   */
  createSimulation(simulationData) {
    return axiosService.post("/simulations", simulationData);
  },

  /**
   * Atualiza uma simulação existente.
   * @param {string} id - O ID da simulação a ser atualizada.
   * @param {object} simulationData - Os novos dados da simulação.
   */
  updateSimulation(id, simulationData) {
    return axiosService.put(`/simulations/${id}`, simulationData);
  },

  /**
   * Exclui uma simulação.
   * @param {string} id - O ID da simulação a ser excluída.
   */
  deleteSimulation(id) {
    return axiosService.delete(`/simulations/${id}`);
  },

  /**
   * Busca a configuração de parâmetros de uma simulação.
   * (Chama o backend, que por sua vez chama a API da Unity).
   * @param {string|number} id - O ID da simulação.
   */
  getSimulationConfig(id) {
    return axiosService.get(`/simulations/${id}/configs`);
  },

  /**
   * Envia um e-mail de suporte.
   * @param {object} supportData - { name, email, message }
   */
  sendSupportEmail(supportData) {
    return axiosService.post(`/support/send`, supportData);
  },
};
