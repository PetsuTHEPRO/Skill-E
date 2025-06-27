import { toggle } from '@nextui-org/react';
import Cookies from 'js-cookie';

// Configuração padrão dos cookies (opcional)
const cookieOptions = {
  expires: 1, // O cookie expira em 7 dias
  path: '/',  // Define o caminho onde o cookie está disponível
  secure: false, // Define se o cookie está disponível apenas pelo protocolo HTTPS
};

// Definir o tema padrão se não estiver definido
if (!Cookies.get('theme')) {
  Cookies.set('theme', 'dark-theme', cookieOptions);
}

export default {
  // Armazenar dados no cookie
  setToken(token) {
    Cookies.set('token', token, cookieOptions);
  },
  
  setEmail(email) {
    Cookies.set('email', email, cookieOptions);
  },
  
  setName(name) {
    Cookies.set('name', name, cookieOptions);
  },
  
  setRole(role) {
    Cookies.set('role', role, cookieOptions);
  },

  setId(id) {
    Cookies.set('id', id, cookieOptions);
  },

  setTheme(theme) {  // Adiciona o modo (dark ou light)
    Cookies.set('theme', theme, cookieOptions);
  },

  // Recuperar dados dos cookies
  getToken() {
    return Cookies.get('token');
  },

  getId() {
    return Cookies.get('id');
  },
  
  getEmail() {
    return Cookies.get('email');
  },

  getName() {
    return Cookies.get('name');
  },
  
  getRole() {
    return Cookies.get('role');
  },

  getTheme() {  // Recupera o modo (dark ou light)
    return Cookies.get('theme');
  },

  toggleTheme() {  // Altera o modo (dark ou light
    const theme = Cookies.get('theme');

    if (theme === 'light-theme') {
      Cookies.set('theme', 'dark-theme', cookieOptions);
    } else {
      Cookies.set('theme', 'light-theme', cookieOptions);
    }
  },
  // Remover cookies
  removeToken() {
    Cookies.remove('token', { path: '/' });
  },
  
  removeEmail() {
    Cookies.remove('email', { path: '/' });
  },

  removeName() {
    Cookies.remove('name', { path: '/' });
  },
  
  removeRole() {
    Cookies.remove('role', { path: '/' });
  },

  removeId() {
    Cookies.remove('id', { path: '/' });
  },

  // Limpar todos os cookies (opcional)
  clearAll() {
    this.removeToken();
    this.removeEmail();
    this.removeName();
    this.removeRole();
    this.removeId();
  }
};