<template>
  <div class="stat-card">
    <div class="card-body">
      <h5 class="card-title text-secondary">{{ title }}</h5>
      <p class="card-text display-6 fw-bold">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
  },
};
</script>

<style scoped>
.stat-card {
  background-color: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-align: center;
  padding: 1.5rem 1rem;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>