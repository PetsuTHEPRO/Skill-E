<script setup>
import RegisterForm from "@/components/forms/RegisterForm.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar />

  <div class="construction-register-view">
    <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center">

        <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center text-left pe-5 ">
          <h1 class="display-4 fw-bold mb-3">Crie Sua Conta e Comece a Construir.</h1>
          <p class="lead text-secondary mb-4">
            Preencha seus dados para ter acesso completo à nossa plataforma de gerenciamento de projetos.
          </p>
          <img 
            src="@/components/icons/login-construction.png" 
            alt="Ilustração de um engenheiro analisando uma planta de construção" 
            class="img-fluid"
            style="max-width: 500px;"
          >
        </div>

        <div class="col-lg-6 col-md-8 col-sm-12 my-5">
          <RegisterForm />
        </div>

      </div>
    </div>
  </div>
</template>

<style>
/* Definição da paleta de cores para ser usada em todo o site.
  Esta paleta é a mesma da página de login para manter a consistência.
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

.construction-register-view {
  background-color: var(--background-color);
  color: var(--text-primary);
  min-height: 100vh;
  font-family: var(--font-main);

  /* Usando d-flex para centralizar o conteúdo verticalmente */
  display: flex;
  align-items: center;
}

.construction-register-view h1 {
  color: var(--text-primary);
}

.construction-register-view .text-secondary {
  color: var(--text-secondary) !important;
}
</style>