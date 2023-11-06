import axiosInstance from '../../lib/index'

const state = {
    users_data: ""
}

const mutations = {
    getAllUser(state, data){
        state.users_data = data.users_data
    }
}

const actions = {
    getAllUser(context){
        axiosInstance.get("/user/get-all-user")
        .then(res => res.data)
        .then(data => {
            context.commit('settings/gettAllUsers')
        })
        .catch(err=>console.log(err))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}