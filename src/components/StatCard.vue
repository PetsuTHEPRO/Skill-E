<template>
  <div class="stat-card" :class="color">
    <div class="icon-container">
      <i :class="icon"></i>
    </div>
    <div class="info-container">
      <h3 class="card-value">{{ animatedValue }}</h3>
      <p class="card-title">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  value: { type: Number, required: true },
  icon: { type: String, default: 'bi bi-bar-chart-fill' },
  color: { type: String, default: 'primary' } // e.g., 'primary', 'success', 'danger'
});

const animatedValue = ref(0);

// Anima o número crescendo do 0 até o valor final
const animateNumber = (targetValue) => {
  const duration = 1500; // 1.5 segundos
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameRate);
  let currentFrame = 0;

  const counter = setInterval(() => {
    currentFrame++;
    const progress = Math.min(currentFrame / totalFrames, 1);
    // Usa uma função de "ease-out" para uma animação mais suave
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    animatedValue.value = Math.floor(easedProgress * targetValue);

    if (progress === 1) {
      clearInterval(counter);
    }
  }, frameRate);
};

// Observa mudanças no valor para re-animar se necessário
watch(() => props.value, (newValue) => {
  animateNumber(newValue);
});

// Inicia a animação quando o componente é montado
onMounted(() => {
  animateNumber(props.value);
});
</script>

<style scoped>
@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: var(--surface-color);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: pop-in 0.5s ease-out forwards;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07);
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon-container i {
  font-size: 1.8rem;
  color: #fff;
}

.info-container {
  text-align: left;
}

.card-value {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.card-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: var(--text-secondary);
}

/* --- Variações de Cor --- */
.stat-card.primary .icon-container {
  background: linear-gradient(135deg, #007bff, #0056b3);
}
.stat-card.success .icon-container {
  background: linear-gradient(135deg, #28a745, #1e7e34);
}
.stat-card.danger .icon-container {
  background: linear-gradient(135deg, #dc3545, #b02a37);
}
</style>