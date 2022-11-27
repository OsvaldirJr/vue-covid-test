<template>
    <div class="d-flex">
        <SideBar/>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import SideBar from '../src/components/SideBar.vue'
import api from './services/api.js'
    export default{
        name: 'app',
        components:{
            SideBar
        },

        mounted() {
            api.get('/report/v1/countries').then((response: any)=>{
                console.log(response.data.data)
                let labels: any[] = []
                let confirmed: any[] = []
                let deaths: any[] = []
                response.data.data.forEach((x: any) => {
                    labels.push(x.country)
                    confirmed.push(x.confirmed)
                    deaths.push(x.deaths)
                });
                let dataSet = [
                        {
                        label: "Casos Confirmados",
                        data: confirmed,
                        backgroundColor: "rgba(54,73,93,.5)",
                        borderColor: "#36495d",
                        borderWidth: 3
                        },
                        {
                        label: "Mortes",
                        data: deaths,
                        backgroundColor: "rgba(71, 183,132,.5)",
                        borderColor: "#47b784",
                        borderWidth: 3
                        }
                    ]
                let chartData =  {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: dataSet,

                    },
                    options: {
                        responsive: true,
                        lineTension: 1,
                        scales: {
                            yAxes: [
                            {
                                ticks: {
                                beginAtZero: true,
                                padding: 25
                                }
                            }
                            ]
                        }
                        }
                }
                this.$store.dispatch('setLabelsAction', labels)
                this.$store.dispatch('setConfirmedAction', confirmed)
                this.$store.dispatch('setDeathsAction', deaths)
                console.log(this.$store.state)
            })
            
        }
    }
</script>