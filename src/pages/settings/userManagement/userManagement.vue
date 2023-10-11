<template>
    <h3 class="px-4 pt-5 pb-3">User Management</h3>
    <User />
    <SetAlarm />
</template>

<script>
import User from "./user.vue"
import SetAlarm from "./setAlarm.vue"

export default{
    components: {User, SetAlarm},
}
</script>