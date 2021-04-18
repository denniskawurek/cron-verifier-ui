<template>
  <div id="nav">
    <router-link to="/"><i class="pi pi-home" style="fontSize: 1.5rem"></i></router-link>
    <router-link to="/about"><i class="pi pi-info-circle" style="fontSize: 1.5rem"></i></router-link> 
    <a href="https://github.com/denniskawurek/cron-verifier-ui"><i class="pi pi-github" style="fontSize: 1.5rem"></i></a> 
    <router-link to="/imprint"><i class="pi pi-envelope" style="fontSize: 1.5rem"></i></router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding:10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.p-inputtext.p-inputtext-lg {
  font-size: 5em
}
</style>
