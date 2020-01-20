<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@media (max-width: 576px) {
  #app {
    font-size: 12px;
  }
}

@media (min-width: 992px) {
  #app {
    font-size: 14px;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: initial;
}

main {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.page__wrapper {
  width: 80%;
  margin: 1rem auto;
}

.btn {
  cursor: pointer;
  padding: 1em;
  letter-spacing: 0.1em;
  font-weight: 600;
  border: 1px solid lightgray;
  border-radius: 0.25em;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  color: darkgray;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  &:hover {
    color: gray;
    border-color: gray;
  }
}
</style>
