<template>
  <div class="d-flex">
    <SideBar />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import SideBar from "../src/components/SideBar.vue";
import api from "./services/api.js";
export default {
  name: "app",
  components: {
    SideBar,
  },

  mounted() {
    api.get("/report/v1/countries").then((response: any) => {
      let labels: any[] = [];
      let confirmed: any[] = [];
      let deaths: any[] = [];
      response.data.data.forEach((x: any) => {
        labels.push(x.country);
        confirmed.push(x.confirmed);
        deaths.push(x.deaths);
      });

      this.$store.dispatch("setLabelsAction", labels);
      this.$store.dispatch("setConfirmedAction", confirmed);
      this.$store.dispatch("setDeathsAction", deaths);
    });
  },
};
</script>
