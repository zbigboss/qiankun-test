<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view /> -->
    <h1>app</h1>
    <ul class="nav">
      <li>
        <router-link to="/">主应用</router-link>
      </li>
      <li>
        <router-link to="/child-app-vue">vue</router-link>
      </li>
      <li>
        <router-link to="/child-app-vue3">vue3</router-link>
      </li>
      <li>
        <router-link to="/child-app-react">react</router-link>
      </li>
    </ul>
    <div id="vue-app"></div>
    <div id="vue-app-3"></div>
    <div id="react-app"></div>
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.nav {
  list-style: none;
  display: flex;
  flex-direction: row;
}
.nav li {
  margin-right: 20px;
}

</style>
