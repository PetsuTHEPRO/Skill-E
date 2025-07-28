<script setup>
import CardLogin from "../../components/forms/LoginForm.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar />

  <div class="construction-login-view">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">

        <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-left pe-5 mt-5">
          <h1 class="display-4 fw-bold mb-3">Construindo o Futuro, Projeto a Projeto.</h1>
          <p class="lead text-secondary mb-4">
            Acesse o portal para gerenciar suas obras, equipes e cronogramas com eficiência.
          </p>
          <img 
            src="@/components/icons/login-construction.png" 
            alt="Ilustração de um engenheiro analisando uma planta de construção" 
            class="img-fluid"
            style="max-width: 500px;"
          >
        </div>

        <div class="col-lg-6 col-md-8 col-sm-12">
          <CardLogin/>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
/* Definição da paleta de cores para ser usada em todo o site.
  Idealmente, isso ficaria em um arquivo CSS global (ex: main.css).
*/
:root {
  --background-color: #F4F7F5;   /* Cinza Claro (Fundo) */
  --background-deep-color: #DDE2DF;
  --surface-color: #FFFFFF;      /* Branco (Cards e superfícies) */
  --primary-color: #FF7A00;      /* Laranja Industrial (Botões e CTAs) */
  --primary-hover-color: #E66A00;/* Laranja mais escuro para hover */
  --border-color: #DDE2DF;       /* Borda sutil para formulários */
  --text-primary: #1E1E1E;       /* Cinza Escuro (Texto principal) */
  --text-secondary: #6C757D;    /* Cinza médio para textos secundários */
  --font-main: "Inter", sans-serif;
}

.construction-login-view {
  background-color: var(--background-color);
  color: var(--text-primary);
  min-height: 100vh;
  font-family: var(--font-main);

  /* Usando d-flex para garantir que o container ocupe a altura total */
  display: flex;
  align-items: center;
}

.construction-login-view h1 {
  color: var(--text-primary);
}

.construction-login-view .text-secondary {
  color: var(--text-secondary) !important; /* !important para sobrescrever classes do Bootstrap se necessário */
}

</style>