<template>
  <div class="d-flex">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import NavBar from "../src/components/NavBar.vue";
export default {
  name: "app",
  components: {
    NavBar
  },
};
</script>
