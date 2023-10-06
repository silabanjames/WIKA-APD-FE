<template>
    <h2 class="py-3">User Management</h2>
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