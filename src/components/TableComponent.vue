<template>
  <div class="table-responsive">
    <div class="d-flex justify-content-center">
      <pagination
      v-model="currentPage"
      :records="record"
      :per-page="10"
      @paginate="paginate"
    />
    </div>
    
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
import Pagination from "v-pagination-3";
export default {
  name: "tableComponent",
  components: {
    Pagination,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,

    };
  },
  computed: {
    record() : number{
      return this.$store.state.labels.length;
    },
    labels() : any[]{
      return this.$store.state.paginatedData.labels;
    },
    confirmed() : any[]{
      return this.$store.state.paginatedData.confirmed;
    },
    deaths() : any[]{
      return this.$store.state.paginatedData.deaths;
    },
  },
  methods: {
    paginate(page: any) {
      let paginatedLabels = this.$store.state.labels?.slice(
        (page - 1) * this.perPage,
        page * this.perPage
      );
      let paginatedConfirmed = this.$store.state.confirmed?.slice(
        (page - 1) * this.perPage,
        page * this.perPage
      );
      let paginatedDeaths = this.$store.state.deaths?.slice(
        (page - 1) * this.perPage,
        page * this.perPage
      );

      this.$store.dispatch("setPaginatedDataAction", {
        labels: paginatedLabels,
        confirmed: paginatedConfirmed,
        deaths: paginatedDeaths,
      });
    },
  },
};
</script>
