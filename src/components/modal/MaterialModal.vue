<template>
  <div>
    <!-- Modal -->
    <div v-if="visible" class="modal fade show d-block" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">
              <slot name="title">Adicionar Material</slot>
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <!-- Input para o nome do material -->
              <div class="mb-3">
                <label for="materialName" class="form-label">Nome</label>
                <input
                  type="text"
                  id="materialName"
                  v-model="materialData.name"
                  class="form-control"
                  placeholder="Digite o nome do material"
                />
              </div>
              
              <!-- Seleção do tipo de material -->
              <div class="mb-3">
                <label for="materialType" class="form-label">Tipo</label>
                <select
                  id="materialType"
                  v-model="materialData.tipo"
                  class="form-select"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="PDF">PDF</option>
                  <option value="VIDEO">Vídeo</option>
                  <option value="IMAGEM">Imagem</option>
                </select>
              </div>
              
              <!-- Input para o URL do material -->
              <div class="mb-3">
                <label for="materialUrl" class="form-label">URL</label>
                <input
                  type="text"
                  id="materialUrl"
                  v-model="materialData.url"
                  class="form-control"
                  placeholder="Digite o URL do material"
                />
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
                @click="submitMaterial"
              >
                Adicionar
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
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      materialData: {
        name: '',
        tipo: '',
        url: '',
        codigoTurma: ''
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitMaterial() {
      // Emitir os dados do material para o componente pai
      this.$emit('submit', { ...this.materialData });

      // Limpar os campos e fechar o modal
      this.materialData = {
        name: '',
        tipo: '',
        url: '',
      };
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
</style>
