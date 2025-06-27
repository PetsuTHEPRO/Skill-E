<template>
  <div class="flex-1 px-2">
    <div class="my-4">

      <div class="card" :class="theme">
        <div class="card-header">
          <div class="d-flex align-items-center gap-3">
            <div class="avatar">
              <img
                alt="@shadcn"
                class="rounded-circle"
                width="50"
                height="50"
                style="
                  background-color: white;
                  border-radius: 50%;
                  border: 1px solid black;
                "
                :src="`https://robohash.org/${user.name}`"
              />
            </div>
            <div>
              <h3 class="h5 fw-semibold">{{ user.name }}</h3>
              <p>{{ user.login }}</p>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="user.name"
              :disabled="!isEditing"
            />
          </div>
          <div class="mb-3">
            <label for="telephone" class="form-label">Telefone</label>
            <input
              type="text"
              class="form-control"
              id="telephone"
              v-model="user.telefone"
              :disabled="!isEditing"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="user.login"
              disabled
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              disabled
              class="form-control"
              id="password"
              value="*********"
            />
          </div>
          <div class="mb-3" v-if="role === 'educator'">
            <label for="specialty" class="form-label">Especialidade</label>
            <select
              id="especialidade"
              class="d-block w-100 px-3 py-2 border border-2 rounded"
              v-model="user.especialidade"
              :disabled="!isEditing"
            >
              <option disabled value="">Selecione sua especialidade</option>
              <option value="Doutorado">Doutorado</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Especialização">Especialização</option>
              <option value="Graduação">Graduação</option>
              <!-- Adicione mais opções conforme necessário -->
            </select>
          </div>
        </div>
        <div class="card-footer text-end">
          <button
            class="btn btn-primary me-3"
            @click="updateUser"
            :disabled="!isEditing"
          >
            Save Changes
          </button>
          <button class="btn btn-secondary" 
          @click="toggleEdit" 
          :disabled="isEditing">
            Edit Profile
          </button>
        </div>
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
      theme: CookiesService.getTheme(),
      user: {
        name: CookiesService.getName(),
        telefone: StorageService.getPhone(),
        especialidade: StorageService.getSpecialty(),
        login: CookiesService.getEmail(),
      },
      role: CookiesService.getRole(),
    };
  },
  created() {
    axios
      .getUser(CookiesService.getId(), CookiesService.getRole())
      .then((response) => {
        this.user = response.data;
      });
  },
  methods: {
    toggleEdit() {
      this.isEditing = true;
    },

    validateName() {
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Aceita letras com acentos e espaços
      if (!this.user.name) {
        notificationService.error("Preencha o campo nome.");
        return -1;
      } else if (!nameRegex.test(this.user.name)) {
        notificationService.error("Campo nome deve conter apenas letras.");
        return -1;
      }
    },
    validateTelephone() {
      const phoneRegex = /^\d{10,11}$/;
      if (!this.user.telefone) {
        notificationService.error("Preencha o campo telefone.");
        return -1;
      } else if (!phoneRegex.test(this.user.telefone)) {
        notificationService.error("Telefone deve ter 10 ou 11 dígitos.");
        return -1;
      }
    },

    validateEspecialidade() {
      if (!this.user.especialidade && this.role === "EDUCATOR") {
        notificationService.error("Especialidade é obrigatória.");
        return -1;
      }
    },

    updateUser() {
      if (this.validateName() == -1) return;
      if (this.validateTelephone() == -1) return;
      if (this.validateEspecialidade() == -1) return;

      // Make a request to the backend API to verify the login credentials
      axios
        .updateUser(this.user, this.role)
        .then((response) => {
          console.log(response);
          // Handle successful update response
          notificationService.success(
            "Dados do usuário atualizados com sucesso!"
          );

          CookiesService.setName(this.user.name);
          StorageService.setPhone(this.user.telefone);
          StorageService.setSpecialty(this.user.especialidade);
        })
        .catch((error) => {
          if (error.response) {
            // O servidor respondeu com um status fora do intervalo 2xx
            notificationService.error(error.response);
          } else {
            notificationService.error(
              "Servidor Offline, entre em contato com a equipe técnica!"
            );
            console.log(error);
          }
        });

        this.isEditing = false;
    },
  },
};
</script>

<style>

.dark-theme .card {
  border: 1px solid #7D1479;
}

.dark-theme .card-header {
  border-bottom: 1px solid #7D1479;
}

.dark-theme .card-footer {
  border-top: 1px solid #7D1479;
}

.light-theme .card-header{
  background-color: #FAFAFA;
}

.light-theme .card-footer{
  background-color: #FAFAFA;
}

.dark-theme .form-control, select {
  background-color: #323232 !important;
  border: 2px solid #DEE2E6 !important;
  color: white !important;
}

.light-theme .form-control, select {
  background-color: #FFF;
  border: 2px solid #DEE2E6 ;
  color: black;
}

.light-theme .form-control:disabled, select:disabled {
  background-color: #F8F9FA ;
  color: #808080;
}

.dark-theme .form-control:disabled, select:disabled {
  background-color: #323232;
  color: #808080 !important;
}

.light-theme {
  background-color: #FFF;
  color: #121214;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07), 0 2px 2px rgba(0, 0, 0, 0.06);
}

/* Tema dark */
.dark-theme {
  background-color: #121214;
  color: #f5f5f7;
}

</style>