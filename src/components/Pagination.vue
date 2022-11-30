<template>
  <div class="d-flex justify-content-center">
    <pagination
      v-model="currentPage"
      :records="record"
      :per-page="perPage"
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
      windowHeight: window.innerHeight,
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
  mounted() {
    this.perPage = 10;
    if (this.windowHeight <= 900 && this.perPage == 10) {
      this.perPage = 5;
      this.$store.dispatch("setPerPageAction", 5);
      this.paginate(1)
    }

    window.addEventListener("resize", (event: any) => {
      this.perPage = 10;
      if (event?.target?.innerWidth <= 900) {
        this.perPage = 5;
        this.$store.dispatch("setPerPageAction", 5);
      }
      this.paginate(1)
    });
  },
};
</script>

<style lang="scss">
.active > .page-link,
.page-link.active {
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  color: white !important;
}
.page-link {
  color: #6c757d !important;
}
.pagination {
  @media (max-width: 768px) {
    --bs-pagination-padding-x: 0.35rem !important;
    --bs-pagination-font-size: 0.7rem !important;
  }
}
</style>
