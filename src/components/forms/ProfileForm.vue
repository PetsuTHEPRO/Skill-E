<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-card-header">
        <div class="user-info">
          <div class="avatar-ring">
            <img
              alt="Avatar do usuário"
              class="avatar"
              :src="`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`"
            />
          </div>
          <div>
            <h3 class="user-name">{{ user.name }}</h3>
            <p class="user-email">{{ user.login }}</p>
          </div>
        </div>
      </div>
      <div class="profile-card-body">
        <div class="form-group">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
            :disabled="!isEditing"
          />
        </div>
        <div class="form-group">
          <label for="telephone">Telefone</label>
          <input
            type="text"
            id="telephone"
            class="form-control"
            v-model="user.telephone"
            :disabled="!isEditing"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="user.login"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            class="form-control"
            value="••••••••"
            disabled
          />
        </div>
      </div>
      <div class="profile-card-footer">
        <button
          class="btn btn-edit"
          @click="toggleEdit"
          v-if="!isEditing"
        >
          Editar Perfil
        </button>
        <button
          class="btn btn-save"
          @click="updateUser"
          v-if="isEditing"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import notificationService from "@/service/notificationService.js";
import CookiesService from "@/service/CookiesService.js";
import axios from "@/api/axios.js";
import StorageService from "@/service/storage.js";

export default {
  data() {
    return {
      isEditing: false,
      user: {
        id: CookiesService.getId(),
        name: "",
        telephone: "",
        login: "", // Email
      },
    };
  },
  // A propriedade 'theme' foi removida
  created() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      if (!this.user.id) return;
      axios.getUser(this.user.id).then((response) => {
        console.log(response.data)
        this.user.name = response.data.name;
        this.user.login = response.data.email;
        this.user.telephone = response.data.telephone;
      }).catch(error => {
        notificationService.error("Não foi possível carregar os dados do usuário.");
        console.error(error);
      });
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    validateForm() {
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
      if (!this.user.name || !nameRegex.test(this.user.name)) {
        notificationService.error("Nome inválido. Use apenas letras e tenha no mínimo 3 caracteres.");
        return false;
      }
      const phoneRegex = /^\d{10,11}$/;
      if (!this.user.telephone || !phoneRegex.test(this.user.telephone)) {
        notificationService.error("Telefone inválido. Deve conter 10 ou 11 dígitos.");
        return false;
      }
      return true;
    },
    updateUser() {
      if (!this.validateForm()) return;
      const userDataToUpdate = {
        name: this.user.name,
        telephone: this.user.telephone,
      };
      axios.updateUser(this.user.id, userDataToUpdate).then(() => {
        notificationService.success("Perfil atualizado com sucesso!");
        CookiesService.setName(this.user.name);
        StorageService.setPhone(this.user.telephone);
        this.isEditing = false;
      }).catch(error => {
        notificationService.error("Erro ao atualizar o perfil. Tente novamente.");
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
/* --- ANIMAÇÃO DE ENTRADA --- */
@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-container {
  padding: 1rem;
}

.profile-card {
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
  /* Estilos do tema light unificados aqui */
  background-color: #FFFFFF;
  color: #1A1D24;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
  /* Animação de entrada do card */
  animation: fadeInSlideUp 0.6s ease-out forwards;
}

.profile-card-header,
.profile-card-body,
.profile-card-footer {
  padding: 1.5rem;
}

.profile-card-header {
  border-bottom: 1px solid #E2E8F0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-ring {
  padding: 4px;
  border-radius: 50%;
  width: 68px;
  height: 68px;
  background: linear-gradient(45deg, #4A5568, #1A1D24);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.user-email {
  margin: 0;
  font-size: 0.9rem;
  color: #64748B;
}

.form-group {
  margin-bottom: 1.25rem;
  /* Estado inicial para a animação em cascata */
  opacity: 0;
  animation: fadeInSlideUp 0.5s ease-out forwards;
}

/* --- ANIMAÇÃO EM CASCATA DOS CAMPOS DO FORMULÁRIO --- */
.form-group:nth-child(1) { animation-delay: 0.2s; }
.form-group:nth-child(2) { animation-delay: 0.3s; }
.form-group:nth-child(3) { animation-delay: 0.4s; }
.form-group:nth-child(4) { animation-delay: 0.5s; }


.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #CBD5E1;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #F8FAFC;
  color: #1A1D24;
}

.form-control:disabled {
  background-color: #E2E8F0;
  opacity: 0.7;
  cursor: not-allowed;
}

.form-control:focus {
  outline: none;
  border-color: #334155;
  box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.2);
}

.profile-card-footer {
  display: flex;
  justify-content: flex-end;
  /* Animação de entrada dos botões */
  opacity: 0;
  animation: fadeInSlideUp 0.5s ease-out forwards;
  animation-delay: 0.6s;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-edit {
  background-color: #E2E8F0;
  color: #334155;
}

.btn-save {
  background-color: #1A1D24;
  color: #FFFFFF;
}
</style>