const StorageService = {
  
  /**
   * Recupera o tema atual do localStorage.
   * Se nenhum tema for encontrado, retorna 'light-theme' como padrão.
   */
  getTheme() {
    return localStorage.getItem('theme') || 'light-theme';
  },

  /**
   * Salva um tema específico no localStorage.
   * @param {string} theme - O tema a ser salvo (ex: 'dark-theme').
   */
  setTheme(theme) {
    localStorage.setItem('theme', theme);
  },

  /**
   * Alterna entre o tema claro e escuro.
   */
  toggleTheme() {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  },

  // --- Outras Funções ---

  // Salva especialidade no storage
  setSpecialty(specialty) {
    localStorage.setItem('userSpecialty', specialty);
  },

  // Recupera especialidade do storage
  getSpecialty() {
    return localStorage.getItem('userSpecialty');
  },

  // Salva telefone no storage
  setPhone(phone) {
    localStorage.setItem('userPhone', phone);
  },

  // Recupera telefone do storage
  getPhone() {
    return localStorage.getItem('userPhone');
  },

  // Limpa os dados do storage
  clearAll() {
    localStorage.removeItem('userSpecialty');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('theme'); // Adicionado para limpar o tema também
  },
};

export default StorageService;