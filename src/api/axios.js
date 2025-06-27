import axios from "axios";
import CookiesService from "@/service/CookiesService.js";

const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Comando de GET - Banco de Dados

  validateToken() {
    const token = CookiesService.getToken();
    return apiClient.get("/token/validate", {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  getAllClassrooms(search, page, size) {
    const token = CookiesService.getToken();
    return apiClient.get("/turma/allClassroom", {
      params: { search: search, page: page, size: size },
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  findIdEducatorByEducatorEmail(email) {
    const token = CookiesService.getToken();
    return apiClient.get("/educator/idByEmail", {
      params: { email: email },
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  findClassroomsByCode(codigo) {
    const token = CookiesService.getToken();
    return apiClient.get("/turma", {
      params: { codigo: codigo },
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  getClassroomsHomeByCode(codigo) {
    const token = CookiesService.getToken();
    return apiClient.get("/turma/turmasAluno", {
      params: { codigo: codigo }, // Parâmetro de consulta
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  getClassroomsDestaque() {
    const token = CookiesService.getToken();
    return apiClient.get("/turma/destaque", {
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  getNameTurmas(search) {
    const token = CookiesService.getToken();
    return apiClient.get("/turma/search", {
      params: { search: search },
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  updateUser(user, role) {
    const token = CookiesService.getToken();
    return apiClient.put(
      `/${role.toLowerCase()}/updateProfile?login=${user.login}`,
      {
        name: user.name,
        telefone: user.telefone,
        especialidade: user.especialidade
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
        },
      }
    );
  },

  loginUser(userData) {
    return apiClient.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    });
  },

  // Comando DELETE - Banco de Dados
  deleteClassroom(codigo) {
    const token = CookiesService.getToken();
    return apiClient.delete(`/turma/${codigo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Comando POST - Banco de Dados

  confirmarEntradaTurma(codigo, idAluno){
    const token = CookiesService.getToken();    
    return apiClient.post(`/turma/${codigo}/entrar`,
    { idAluno: idAluno },
    { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  createClassroom(classroomData) {
    const token = CookiesService.getToken();
    return apiClient.post(
      "/turma/register",
      {
        name: classroomData.name,
        description: classroomData.description,
        price: classroomData.price,
        idEducator: classroomData.idEducator,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },


  registerUser(userData) {
    return apiClient.post("/auth/register", {
      name: userData.name,
      telephone: userData.telephone,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      especialidade: userData.especialidade,
    });
  },

  updateStatusTurma(classroomId, status) {
    const token = CookiesService.getToken();
    console.log(status);
    return apiClient.put(
      `/turma/${classroomId}/status`,
      { status: status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },

  getUser(id, role) {
    const token = CookiesService.getToken();
    return apiClient.get(`/${role}/atualUser`, {
      params: { id: id },
      headers: {
        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho de autorização
      },
    });
  },

  getIdsAlunos(codigo) {
    const token = CookiesService.getToken();
    return apiClient.get(`/turma/${codigo}/students/info`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getClassroomByIdOfUser(codigo, page, size, role) {
    const token = CookiesService.getToken();

    return apiClient.get(`/turma/${role}Turmas`, {
      params: { codigo: codigo, page: page, size: size },
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getClassroomById(id) {
    const token = CookiesService.getToken();
    return apiClient.get(`/turma/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getMaterialsByClassroomCode(codigo) {
    return apiClient.get(`/turma/${codigo}/materials`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  setMaterialsByClassroomCode(materials) {
    const token = CookiesService.getToken();
    return apiClient.post(`/material/register`, materials, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deleteMaterial(classroomCodigo, materialId) {
    const token = CookiesService.getToken();
    return apiClient.delete(`/turma/${classroomCodigo}/material/${materialId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  sendEmail(support) {
    const token = CookiesService.getToken();
    return apiClient.post(`/support/send`, support, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
