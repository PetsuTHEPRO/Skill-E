<script setup>
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <main class="container-fluid home-view p-0">
    <div class="text-white">
      <NavBar />
      <main
        class="flex flex-col items-center justify-center flex-1 p-4 text-center"
      >
        <h1 class="font-bold">
          Transforme e expanda seu aprendizado, <br />
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-red-500 to-blue-500"
          >
            conquiste novos horizontes!
          </span>
        </h1>
        <p class="mt-4 text-lg md:text-xl">
          A plataforma completa para você aprender tudo e um pouco mais de
          maneira nova, segura e com conteúdos de qualidade.
        </p>
        <div
          class="flex flex-wrap justify-center mt-8 space-x-4 space-y-4 md:space-y-0"
        >
          <div class="badge rounded-pill px-4 py-2">BOTÂNICA</div>
          <div class="badge rounded-pill px-4 py-2">PROGRAMAÇÃO</div>
          <div class="badge rounded-pill px-4 py-2">FÍSICA</div>
          <div class="badge rounded-pill px-4 py-2">ENEM</div>
          <div class="badge rounded-pill px-4 py-2">MATEMÁTICA</div>
          <div class="badge rounded-pill px-4 py-2">CÁLCULO</div>
          <div class="badge rounded-pill px-4 py-2">FILOSOFIA</div>
        </div>
      </main>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

.badge {
  background-color: #000 !important;
  color: #fff !important;
  border: 1px solid #7d1479;
  margin: 5px;
  font-size: 0.9rem; /* Responsivo */
}

.home-view{
  background-color: #1A001A;
  min-height: 100vh;
}

main {
  font-family: "Inter", sans-serif;
  width: 100vw;
}

/* Configuração de textos */
h1 {
  font-size: 2.5rem; /* Tamanho base */
}

p {
  font-size: 1.1rem; /* Tamanho base */
}

.text-transparent {
  color: transparent;
}

.bg-clip-text {
  background-clip: text;
}

.bg-gradient-to-r {
  background-image: linear-gradient(to right, /* gradient direction */);
}

.from-purple-600 {
  background-image: linear-gradient(to right, #7a28cb, /* start color */);
}

.via-red-500 {
  background-image: linear-gradient(
    to right,
    #7a28cb,
    #ff3737,
    /* middle color */
  );
}

.to-blue-500 {
  background-image: linear-gradient(
    to right,
    #7a28cb,
    #ff3737,
    #3498db /* end color */
  );
}
</style>
