<template>
    <div class="container-center">
      <div class="card">
        <input
          @change="toggleTheme"
          id="checkbox"
          type="checkbox"
          class="switch-checkbox"
        />
        <label for="checkbox" class="switch-label">
          <span>🌙</span>
          <span>☀️</span>
          <div
            class="switch-toggle"
            :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
          ></div>
        </label>
        <p>Wer sitzt dort so spät, bei Nacht und Wind?</p>
        <p>Entwickler Clemens, mit einem Pint.</p>
        <p>Man hört ihn seufzen, ziemlich hart -</p>
        <p>Sonntag ist's, die Deadline naht</p>
      </div>
    </div>
  </template>

<script>
export default {
  mounted() {
    const initUserTheme = this.getMediaPreference();
    this.setTheme(initUserTheme);
  },

  data() {
    return {
      userTheme: "light-theme",
    };
  },
};
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
/* Define styles for the default root window element */
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}

p {
  color: var(--text-primary-color);
}

.container-center {
  background-color: var(--background-color-primary);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  padding: 2rem 4rem;
  height: 200px;
  width: 300px;
  text-align: center;
  border: 1px solid var(--accent-color);
  border-radius: 4px;
  background-color: var(--background-color-secondary);
}
</style>

