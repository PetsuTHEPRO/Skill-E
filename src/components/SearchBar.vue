<template>
    <div
      v-if="role !== 'Professor'"
      class="border border-2 p-1 me-3 d-none d-lg-block"
      style="border-radius: 16px"
    >
      <input
        type="text"
        class="bg-preto border border-0 text-white no-focus"
        placeholder="Pesquisar cursos..."
        aria-label="Pesquisar cursos..."
        aria-describedby="button-addon2"
        v-model="query"
        @input="handleInput"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <button
        class="bi bi-search text-white bg-preto border-0 me-2"
        type="button"
        id="button-addon2"
        @click="search"
      ></button>
  
      <ul class="list-group position-absolute" v-if="showSuggestions">
        <template v-if="filteredClasses.length > 0">
          <li
            class="list-group-item list-group-item-action"
            v-for="(classItem, index) in filteredClasses"
            :key="index"
            @mousedown="selectClass(classItem)"
          >
            {{ classItem.name }}
          </li>
        </template>
        <template v-else>
          <li class="list-group-item text-center">
            Nenhum resultado encontrado
          </li>
        </template>
      </ul>
    </div>
  </template>
  
  <script>
  import axiosService from "@/api/axios.js";
  
  export default {
    name: "SearchBar",
    props: {
      role: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        query: '',
        showSuggestions: false,
        classrooms: [],
      };
    },
    mounted() {
      this.searchClassrooms();
    },
    computed: {
      atualizarClasses() {
         return this.filteredClasses();
      }
      
    },watch: {
        '$route.query.search'(newSearch) {
            this.query = newSearch || '';
            this.searchClassrooms();
        }
    },
    methods: {
      search() {
        this.$router.push({ name: 'allClassrooms', query: { search: this.query } });
      },
      filteredClasses() {
        // Adicionando log para verificar os dados
        return this.classrooms.filter((classItem) =>
          classItem.name.toLowerCase().startsWith(this.query.toLowerCase())
        );
      },
      searchClassrooms() {
        axiosService.getNameTurmas(this.query).then((response) => {
            this.classrooms = response.data;
        }).catch((error) => {
            console.log(error);
        });
      },
      handleInput() {
        this.showSuggestions = this.query !== '';
      },
      hideSuggestions() {
        setTimeout(() => {
          this.showSuggestions = false;
        }, 100);
      },
      selectClass(classItem) {
        this.query = classItem.name;
        this.showSuggestions = false;
        this.$router.push({ name: 'allClassrooms', query: { search: this.query } });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Se você deseja aplicar uma cor específica ao item 'li', use a classe 'list-group-item' diretamente */
  .list-group-item {
    color: #1a001a !important;
  }
  </style>  