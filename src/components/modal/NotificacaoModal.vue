<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Notificações <span class="badge bg-danger">{{ notifications.length }}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li class="dropdown-header">Notificações</li>
      <li v-if="notifications.length === 0" class="dropdown-item text-center">
        Sem notificações
      </li>
      <li v-for="(notification, index) in notifications" :key="index" class="dropdown-item">
        <i class="bi bi-bell-fill"></i> {{ notification }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        'Educator João adicionou mais um material à turma "Nome".',
        'Educator João deletou um material da turma "Nome".',
        'Estudante João entrou na sua turma "Nome".',
        'Nova mensagem recebida na turma "Nome".'
      ]
    };
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-toggle {
  position: relative;
}

.dropdown-menu {
  min-width: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.dropdown-header {
  font-weight: bold;
  background-color: #343a40;
  color: #ffffff;
  padding: 0.5rem 1rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
}

.dropdown-item i {
  margin-right: 10px;
  color: #f8f9fa; /* Cor dos ícones */
}

.dropdown-item:hover {
  background-color: #495057; /* Cor de fundo ao passar o mouse */
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.75rem;
}
</style>
