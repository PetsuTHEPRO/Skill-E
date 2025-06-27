const StorageService = {
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
    },
  };
  
  export default StorageService;
  