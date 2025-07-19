import { createStore } from 'vuex'
import Cookies from '@/service/CookiesService'
import StorageService from '@/service/storage';

const store = createStore({
  state: {
    authToken: Cookies.getToken() || '',
    userRole: Cookies.getRole() || '',
    email: Cookies.getEmail() || '',
    especialidade: StorageService.getSpecialty() || '',
    telefone: StorageService.getPhone() || '',
    name: Cookies.getName() || '',
    id: Cookies.getId() || '',
    isSidebarOpen: JSON.parse(localStorage.getItem('sidebarOpen') || 'true'), 
  },
  mutations: {

    OPEN_MENU(state) {
      state.isSidebarOpen = true;
    },
    TOGGLE_SIDEBAR(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
      // Opcional: Salva a preferência do usuário no localStorage
      localStorage.setItem('sidebarOpen', state.isSidebarOpen);
    },
    setAuthToken(state, token) {
      state.authToken = token
      Cookies.setToken(token)
    },
    setUserRole(state, role) {
      state.userRole = role
      Cookies.setRole(role)
    },
    setEmail(state, email) {
      state.email = email
      Cookies.setEmail(email)
    },
    setName(state, name){
      state.name = name
      Cookies.setName(name)
    },
    setEspecialidade(state, especialidade){
      state.especialidade = especialidade
      StorageService.setSpecialty(especialidade)
    },

    setTelefone(state, telefone){
      state.telefone = telefone
      StorageService.setPhone(telefone)
    },
    SetId(state, id){
      state.id = id
      Cookies.setId(id)
    },
    clearAll(state) {
      state.authToken = ''
      state.email = ''
      state.userRole = ''
      state.name = ''
      state.especialidade = ''
      state.telefone = ''
      state.id = ''
      Cookies.clearAll()
      StorageService.clearAll()
    }
  },
  actions: {
    login({ commit }, { token, role, name, especialidade, telefone, email, id }) {
      commit('SetId', id)
      commit('setAuthToken', token)
      commit('setEspecialidade', especialidade)
      commit('setTelefone', telefone)
      commit('setUserRole', role)
      commit('setName', name)
      commit('setEmail', email)
    },
    logout({ commit }) {
      commit('clearAll')
    },
    openMenu({ commit }) {
      commit('OPEN_MENU');
    },
  },
  getters: {
    isAuthenticated: state => !!state.authToken,
    userRole: state => state.userRole,
    email: state => state.email,
    name: state => state.name,
    especialidade: state => state.especialidade,
    telefone: state => state.telefone,
    id: state => state.id,
    isMenuOpen: state => state.isSidebarOpen,
  }
})

export default store