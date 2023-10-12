<template>
  <div>
    <h2>Error 404. Page not found</h2>
    <router-link :to="{ name: 'welcome' }">Go back</router-link>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  margin: 20px auto;
}
a {
  display: block;
  margin-top: 10px;
  color: #444;
}
a:hover {
  text-decoration: none;
}
</style>
