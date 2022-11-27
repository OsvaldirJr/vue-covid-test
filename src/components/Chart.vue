<template>
      <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
      {{labels}}
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    
import Chart from 'chart.js'
    export default {
        name: 'ChartComponent',
        data() {
            return {
                chartData: {},
                chart: {}
            }
        },
        computed: {
            labels(){
                return this.$store.state.labels
            }
        },
        watch:{
            labels:{
                handler(){
                    let labels: any[] = this.$store.state.labels
                    let confirmed: any[] = this.$store.state.confirmed
                    let deaths: any[] = this.$store.state.deaths
               
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
                    this.chartData =  {
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
                const ctx = document.getElementById('myChart');
                this.chart = new Chart(ctx, this.chartData);
                }
            }

        }
    }
</script>