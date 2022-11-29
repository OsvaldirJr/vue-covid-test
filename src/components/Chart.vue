<template>
  <canvas class="w-100" id="myChart" width="800" height="250"></canvas>
</template>

<script lang="ts">
import Chart from "chart.js";
export default {
  name: "ChartComponent",
  data() {
    return {
      chartData: {} as any,
      chart: null as any,
    };
  },
  computed: {
    labels() {
      return this.$store.state.paginatedData.labels;
    },
  },
  watch: {
    labels: {
      handler() {
        let labels: any[] = this.$store.state.paginatedData.labels;
        let confirmed: any[] = this.$store.state.paginatedData.confirmed;
        let deaths: any[] = this.$store.state.paginatedData.deaths;

        let dataSet = [
          {
            label: "Casos Confirmados",
            data: confirmed,
            backgroundColor: "rgba(54,73,93,.5)",
            borderColor: "#36495d",
            borderWidth: 3,
          },
          {
            label: "Mortes",
            data: deaths,
            backgroundColor: "#f86368",
            borderColor: "#e65054",
            borderWidth: 3,
          },
        ];
        this.chartData = {
          type: "bar",
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
                    padding: 25,
                  },
                },
              ],
            },
          },
        };
        if (this.chart) {
          this.chart.data = this.chartData.data;
          this.chart.update();
        } else {
          const ctx = document.getElementById("myChart") as HTMLCanvasElement;
          this.chart = new Chart(ctx, this.chartData);
        }
      },
    },
  },
  mounted() {
    let labels: any[] = this.$store.state.paginatedData.labels;
    let confirmed: any[] = this.$store.state.paginatedData.confirmed;
    let deaths: any[] = this.$store.state.paginatedData.deaths;

    let dataSet = [
      {
        label: "Casos Confirmados",
        data: confirmed,
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3,
      },
      {
        label: "Mortes",
        data: deaths,
        backgroundColor: "#f86368",
        borderColor: "#e65054",
        borderWidth: 3,
      },
    ];
    this.chartData = {
      type: "bar",
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
                padding: 25,
              },
            },
          ],
        },
      },
    };
    if (this.chart) {
      this.chart.data = this.chartData.data;
      this.chart.update();
    } else {
      const ctx = document.getElementById("myChart") as HTMLCanvasElement;
      this.chart = new Chart(ctx, this.chartData);
    }
  },
};
</script>
