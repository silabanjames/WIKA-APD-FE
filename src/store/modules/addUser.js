import axiosInstance from "@/lib";

const actions = {
    async handleAddUser(context, {formData}){
        console.log([...formData])
        axiosInstance.post('/user', formData , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(res=>res.data)
        .then(
            data => {
                console.log(data.message)
                return true
            }
        )
        .catch(
            err => {
                console.log(err)
                return false
            }
        )
    }
}

export default {
    namespaced: true,
    actions
}