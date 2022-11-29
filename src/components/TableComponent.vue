<template>
  <div class="table-responsive">
     <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Local</th>
          <th scope="col">Casos confirmados</th>
          <th scope="col">Número de mortes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in labels">
          <td></td>
          <td>{{ item }}</td>
          <td>{{ confirmed[index] }}</td>
          <td>{{ deaths[index] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "tableComponent",
  computed: {
    labels() : any[]{
      return this.$store.state.paginatedData.labels;
    },
    confirmed() : any[]{
      return this.$store.state.paginatedData.confirmed;
    },
    deaths() : any[]{
      return this.$store.state.paginatedData.deaths;
    },
  }
};
</script>
