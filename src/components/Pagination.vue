<template>
  <div class="d-flex justify-content-center">
    <pagination
      v-model="currentPage"
      :records="record"
      :per-page="10"
      @paginate="paginate"
    />
  </div>
</template>

<script lang="ts">
import Pagination from "v-pagination-3";
export default {
  name: "paginationComponent",
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
    record(): number {
      return this.$store.state.data.labels.length;
    },
  },
  methods: {
    paginate(page: any) {
      let paginatedLabels = this.$store.state.data.labels?.slice(
        (page - 1) * this.perPage,
        page * this.perPage
      );
      let paginatedConfirmed = this.$store.state.data.confirmed?.slice(
        (page - 1) * this.perPage,
        page * this.perPage
      );
      let paginatedDeaths = this.$store.state.data.deaths?.slice(
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

<style>
.active > .page-link,
.page-link.active {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  color: white !important;
}
.page-link{
    color: #6c757d !important;
}
</style>
