<template>
  <div>
    <!-- Modal -->
    <div v-if="visible" class="modal fade show d-block" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">
              <slot name="title">Gerenciar Turma</slot>
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <!-- Seleção de ação -->
              <div class="mb-3">
                <label for="turmaAction" class="form-label">Ação</label>
                <select
                  id="turmaAction"
                  v-model="turmaAction"
                  class="form-select"
                >
                  <option value="">Selecione a ação</option>
                  <option value="BLOQUEADA">Bloquear</option>
                  <option value="ATIVA">Ativar</option>
                  <option value="DESATIVADA">Desativar</option>
                </select>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="atualizarStatus"
                :disabled="!turmaAction"
              >
                Confirmar
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="visible" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axiosService from '@/api/axios.js';
import notificationService from '@/service/notificationService.js';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    idTurma: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      turmaAction: '', // Armazena a ação selecionada
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitAction() {
      // Emitir a ação selecionada para o componente pai
      this.$emit('submit', { action: this.turmaAction });

      // Limpar a seleção e fechar o modal
      this.turmaAction = '';
      this.closeModal();
    },
    atualizarStatus() {
      axiosService.updateStatusTurma(this.idTurma, this.turmaAction).then(() => {
        this.closeModal();
        this.turmaAction = '';
        notificationService.success('Turma atualizada com sucesso!');
        window.location.reload();
      }).catch((error) => {
        console.log(error);
      })
    }
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
</style>