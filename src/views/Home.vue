<template>
  <main class="col-md-9 col-lg-12 px-md-4 mt-5">
    <div class="mt-5">
      <div class="d-flex">
        <select class="form-select form-select-lg  m-2" v-on:change="chooseOption($event)">
          <option :value="-1">Todos</option>
          <option v-for="(item, index) in $store.state.data.labels" :value="index">
            {{ item }}
          </option>
        </select>
        <select class="form-select form-select-lg  m-2" v-on:change="changeTypePlace($event)" aria-label="Default select example">
          <option :value="0">Mundo</option>
          <option :value="1">Brasil</option>
        </select>
        <input
          v-if="typePlace == 1"
          type="date"
          class="form-control m-2"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-on:change="dateSearch"
        />
      </div>
    </div>
    <div class="scrollarea">
      <div class="btn-toolbar ms-3 mt-2">
        <div class="btn-group me-2">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :class="{active: typeShown==0}"
            v-on:click="changeTypeShown(0)"
          >
            Grafico
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :class="{active: typeShown==1}"
            v-on:click="changeTypeShown(1)"
          >
            Tabela
          </button>
        </div>
      </div>
      <ChartComponent v-if="typeShown==0" class="ms-3"/>
      <TableComponent v-else class="ms-3 mt-2"/>
      <PaginationComponent/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@media (max-width: 768px) {
    .chart {
      // display: none !important;
    }
  }
</style>

<script lang="ts">
import ChartComponent from "../components/Chart.vue";
import TableComponent from "../components/TableComponent.vue";
import PaginationComponent from "../components/Pagination.vue";
// @ts-ignore
import api from "../services/api.js";
export default {
  name: "Home",
  components: {
    ChartComponent,
    TableComponent,
    PaginationComponent
  },
  data() {
    return {
      place: "Mundo",
      typePlace: 0,
      typeShown: 0,
      states: [] as any[],
    };
  },
  methods: {
    changeTypePlace(event: any) {
      let type= event.target.value;
      let route = type == 0 ? "/report/v1/countries" : "/report/v1";
      if (type != this.typePlace && type == 1) {
        api.get(route).then((response: any) => {
          let labels: any[] = [];
          let confirmed: any[] = [];
          let deaths: any[] = [];
          let states: any[] = [];
          response.data.data.forEach((x: any) => {
            labels.push(x.state);
            confirmed.push(x.cases);
            deaths.push(x.deaths);
            states.push({ name: x.state, id: x.id });
          });
          this.states = states;
          this.$store.dispatch("setDataAction", {
            labels: labels,
            confirmed: confirmed,
            deaths: deaths,
          });
          this.typePlace = type;
        });
      } else if (type != this.typePlace && type == 0) {
        api.get(route).then((response: any) => {
          let labels: any[] = [];
          let confirmed: any[] = [];
          let deaths: any[] = [];
          response.data.data.forEach((x: any) => {
            labels.push(x.country);
            confirmed.push(x.confirmed);
            deaths.push(x.deaths);
          });
          this.states = labels;
          this.$store.dispatch("setDataAction", {
            labels: labels,
            confirmed: confirmed,
            deaths: deaths,
          });
          this.typePlace = type;
        });
      }
    },
    changeTypeShown(type: number){
      this.typeShown = type;
    },
    chooseOption(index: any) {
      if (index.target.value >= 0) {
        let labels: any[] = [this.$store.state.data.labels[index.target.value]];
        let confirmed: any[] = [
          this.$store.state.data.confirmed[index.target.value],
        ];
        let deaths: any[] = [this.$store.state.data.deaths[index.target.value]];
        this.$store.dispatch("setPaginatedDataAction", {
          labels: labels,
          confirmed: confirmed,
          deaths: deaths,
        });
      } else {
        this.$store.dispatch("setDataAction", {
          labels: this.$store.state.data.labels,
          confirmed: this.$store.state.data.confirmed,
          deaths: this.$store.state.data.deaths,
        });
      }
    },
    dateSearch(date: any) {
      let route = "report/v1/brazil/" + date.target.value.replaceAll("-", "");
      api.get(route).then((response: any) => {
        let labels: any[] = [];
        let confirmed: any[] = [];
        let deaths: any[] = [];
        let states: any[] = [];

        if (response.data.data.length <= 0) {
          this.$swal("Não há dados nesse periodo");
          return;
        }
        
        response.data.data.forEach((x: any) => {
          labels.push(x.state);
          confirmed.push(x.cases);
          deaths.push(x.deaths);
          states.push({ name: x.state, id: x.id });
        });
        this.states = states;
        this.$store.dispatch("setDataAction", {
          labels: labels,
          confirmed: confirmed,
          deaths: deaths,
        });
      });
    },
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

      this.$store.dispatch("setDataAction", {
        labels: labels,
        confirmed: confirmed,
        deaths: deaths,
      });
    });
  },
};
</script>
