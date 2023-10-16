<template>
    <Breadcrumbs main="Charts" title="ApexChart" />
    <div class="container-fluid ">
        <Filter />
    
        <ColumnChart />
    
        <div class="row">
        </div>
    </div>
    </template>
    
    <script>
    import Filter from "./filter"
    import ColumnChart from "./columnChart"
    
    export default {
        components: {
            Filter,
            ColumnChart
        },
    };
    </script>
    