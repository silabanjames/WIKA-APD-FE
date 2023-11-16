<template>
<Breadcrumbs main="Charts" title="ApexChart" />
<div class="container-fluid ">
    <Filter />

    <BasicArea />

    <div class="row">
    </div>
</div>
</template>

<script>
import Filter from "./filter"
import BasicArea from "./basicArea"

export default {
    components: {
        Filter,
        BasicArea
    },
};
</script>
