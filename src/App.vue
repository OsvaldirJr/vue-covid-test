<template>
  <div class="d-flex">
    <SideBar />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import SideBar from "../src/components/SideBar.vue";
export default {
  name: "app",
  components: {
    SideBar,
  },
};
</script>
