import axiosInstance from "@/lib";

const state = {
    id: "",
    name: "",
    email: "",
}

const getters = {
}

const mutations = {
    editId(state, id){
        state.id = id
    },
    editName(state, name){
        state.name = name
    },
    editEmail(state, email){
        state.email = email
    }
}

const actions = {
    getData(){
        axiosInstance.get('')
    },
    async handleEditUser(context, {formData}){
        axiosInstance.patch('/editUser', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
    state,
    mutations,
    actions
}