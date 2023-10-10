<template>
    <div class="card">
      <canvas id="chart1"></canvas>
    </div>
    
    <div class="card">
      <canvas id="chart2"></canvas>
    </div>

    <div class="card">
      <canvas id="chart3"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default{
  data(){
    return {
      data: [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
      ],
    }
  },
  computed:{
    config(){
      return {
        type: 'bar',
        data: {
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data.map(row => row.count)
            }
          ]
        }
      }
    }
  },
  mounted(){
    new Chart(
      document.getElementById('chart1'),
      this.config
    );
    new Chart(
      document.getElementById('chart2'),
      this.config
    );
    new Chart(
      document.getElementById('chart3'),
      this.config
    );
  }
}
</script>