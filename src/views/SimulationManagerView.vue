<script setup>
import MenuBar from "@/components/MenuBar.vue";
import SideBar from "@/components/SideBar.vue";
import SimulationController from "@/components/SimulationController.vue";
</script>

<template>
  <div class="container-fluid d-flex dashboard-view p-0" :class="theme">
    <SideBar />
    <div class="container-fluid content-wrapper p-0">
      <MenuBar />
      <main class="p-4">
        <SimulationController />
      </main>
    </div>
  </div>
</template>