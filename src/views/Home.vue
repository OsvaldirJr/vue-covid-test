
<template>
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Covid {{place}}</h1>

        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="changeTypePlace(0)">Dados mundias</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" v-on:click="changeTypePlace(1)">Dados Nacionais</button>
          </div>
        </div>
      </div>
      <div>
        <select v-if="typePlace == 1 && states">
            <option v-for="item  in states">{{item.name}}</option>
        </select>      
      </div>
      <ChartComponent/>

      </main>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
import ChartComponent from '../components/Chart.vue'
import api from '../services/api.js'
    export default {
  name: 'Home',
  components: {
    ChartComponent
  },
  data(){
    return {
        place: 'Mundo',
        typePlace: 0, 
        states: [] as any[]
    }
  },
  methods:{
    changeTypePlace(type: number){

        let route = type==0 ? '/report/v1/countries' : '/report/v1'
        if(type != this.typePlace && type == 1){
            api.get(route).then((response: any)=>{
                let labels: any[] = []
                let confirmed: any[] = []
                let deaths: any[] = []
                let states: any[] = []
                response.data.data.forEach((x: any) => {
                    labels.push(x.state)
                    confirmed.push(x.cases)
                    deaths.push(x.deaths)
                    states.push({name: x.state, id: x.id})
                });
                this.states = states;
                this.$store.dispatch('setLabelsAction', labels)
                this.$store.dispatch('setConfirmedAction', confirmed)
                this.$store.dispatch('setDeathsAction', deaths)
                this.typePlace = type;
            })
        }
        else  if(type != this.typePlace && type == 0){
            api.get(route).then((response: any)=>{
                let labels: any[] = []
                let confirmed: any[] = []
                let deaths: any[] = []
                response.data.data.forEach((x: any) => {
                    labels.push(x.country)
                    confirmed.push(x.confirmed)
                    deaths.push(x.deaths)
                });
                this.$store.dispatch('setLabelsAction', labels)
                this.$store.dispatch('setConfirmedAction', confirmed)
                this.$store.dispatch('setDeathsAction', deaths)
                this.typePlace = type;
            })
        }
        
    }
    
  }
}
</script>