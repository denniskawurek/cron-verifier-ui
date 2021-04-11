<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/imprint">Imprint</router-link>
  </div>
  <router-view/>
</template>

<style>
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


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

.alert {
  border-color:yellow;
  background-color: rgb(243, 243, 171);
  padding: 10px;
}

input,
input:focus {
  font-size: 2.5em;
  text-align: center;
  border-style: solid;
  color: #000000;
}

input.success {
  border-color: #4bda99;
}
input.error {
  border-color: #da4b52;
}
</style>
