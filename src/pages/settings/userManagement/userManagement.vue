<template>
    <h2 class="mt-5">User Management</h2>
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