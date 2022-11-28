<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Covid {{ place }}</h1>

      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            v-on:click="changeTypePlace(0)"
          >
            Dados mundias
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            v-on:click="changeTypePlace(1)"
          >
            Dados Nacionais
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex">
        <select class="form-select m-2" v-on:change="chooseOption($event)">
          <option :value="-1">Todos</option>
          <option v-for="(item, index) in $store.state.labels" :value="index">
            {{ item }}
          </option>
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
      <ChartComponent />
      <TableComponentVue />
    </div>
  </main>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import ChartComponent from "../components/Chart.vue";
import TableComponentVue from "../components/TableComponent.vue";
import api from "../services/api.js";
export default {
  name: "Home",
  components: {
    ChartComponent,
    TableComponentVue,
  },
  data() {
    return {
      place: "Mundo",
      typePlace: 0,
      states: [] as any[],
    };
  },
  methods: {
    changeTypePlace(type: number) {
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
          this.$store.dispatch("setLabelsAction", labels);
          this.$store.dispatch("setConfirmedAction", confirmed);
          this.$store.dispatch("setDeathsAction", deaths);
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
          this.$store.dispatch("setLabelsAction", labels);
          this.$store.dispatch("setConfirmedAction", confirmed);
          this.$store.dispatch("setDeathsAction", deaths);
          this.typePlace = type;
        });
      }
    },
    chooseOption(index: any) {
      if (index.target.value > 0) {
        let labels: any[] = [this.$store.state.labels[index.target.value]];
        let confirmed: any[] = [
          this.$store.state.confirmed[index.target.value],
        ];
        let deaths: any[] = [this.$store.state.deaths[index.target.value]];
        this.$store.dispatch("setPaginatedDataAction", {
          labels: labels,
          confirmed: confirmed,
          deaths: deaths,
        });
      }
      else{
        this.$store.dispatch("setLabelsAction", this.$store.state.labels);
        this.$store.dispatch("setConfirmedAction", this.$store.state.confirmed);
        this.$store.dispatch("setDeathsAction", this.$store.state.deaths);
      }
    },
    dateSearch(date: any){
      console.log(date.target.value)
      let route = 'report/v1/brazil/'+ date.target.value.replaceAll('-', '')
      console.log(route)
      api.get(route).then((response: any) => {
        let labels: any[] = [];
          let confirmed: any[] = [];
          let deaths: any[] = [];
          let states: any[] = [];
          console.log(response.data)
          if(response.data.data.length <=0){
            this.$swal('Não há dados nesse periodo');
            return 
          }
          response.data.data.forEach((x: any) => {
            labels.push(x.state);
            confirmed.push(x.cases);
            deaths.push(x.deaths);
            states.push({ name: x.state, id: x.id });
          });
          this.states = states;
          this.$store.dispatch("setLabelsAction", labels);
          this.$store.dispatch("setConfirmedAction", confirmed);
          this.$store.dispatch("setDeathsAction", deaths);
      })
    }
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
