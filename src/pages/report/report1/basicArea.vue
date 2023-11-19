<template>
    <div class="col">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-end align-items-center">
                    <vue-feather type="plus-circle" class="me-1"></vue-feather>
                    <vue-feather type="minus-circle" class="me-1"></vue-feather>
                    <vue-feather type="zoom-in" class="me-1"></vue-feather>
                    <i class="icon-hand-open me-1"></i>
                    <vue-feather type="home" class="me-1"></vue-feather>
                    <vue-feather type="align-justify" class="me-1"></vue-feather>

                </div>
                <div id="basic-apex">
                    <apexchart type="area" height="350" ref="chart" :options="chartOptions" :series="series"></apexchart>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import chart from "@/data/chart.json";
    var primary = localStorage.getItem('primary_color') || '#24695c';
    export default {
        data() {
            return {
                series: [{
                    name: "Chart 1",
                    data: chart.monthDataSeries1.prices,
                }, ],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'area',
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    // title: {
                    //     text: 'Fundamental Analysis of Stocks',
                    //     align: 'left'
                    // },
                    // subtitle: {
                    //     text: 'Price Movements',
                    //     align: 'left'
                    // },
                    labels: chart.monthDataSeries1.dates,
                    xaxis: {
                        type: 'datetime',
                    },
                    yaxis: {
                        // opposite: true
                    },
                    legend: {
                        horizontalAlign: 'left'
                    },
                    colors: [primary]
                }
            }
        },
        mounted() {
            this.series[0].data = chart.monthDataSeries1.prices;
        },
    }
    </script>
    