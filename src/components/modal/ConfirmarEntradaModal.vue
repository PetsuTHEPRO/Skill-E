<template>
    <div>
      <!-- Modal -->
      <div v-if="visible" class="modal fade show d-block" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle">
                <slot name="title">Confirmar Entrada na Turma</slot>
              </h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <slot name="body">
                <p>Você tem certeza que deseja entrar na turma <strong>{{ turmaNome }}</strong>?</p>
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="confirmarEntrada">Confirmar</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div v-if="visible" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios.js';
  import NotificacaoService from '@/service/notificationService.js';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      turmaNome: {
        type: String,
        required: true,
      },
      turmaCodigo: {
        type: Number,
        required: true,
      },
      idAluno: {
        type: Number,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmarEntrada() {
          axios.confirmarEntradaTurma(this.turmaCodigo, this.idAluno)
          .then((response) => {
            NotificacaoService.success(response.data);
            window.location.reload();
          }).catch((error) => {
            console.error('Erro ao confirmar entrada:', error);
          });
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped>
.modal-content {
  background-color: #1a001a;
}

.modal-backdrop {
  z-index: 1040;
}

.modal-dialog {
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

strong{
  color: white;
}
  </style>
  