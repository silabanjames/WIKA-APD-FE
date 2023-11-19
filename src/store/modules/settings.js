import axiosInstance from '../../lib/index'

const state = {
    users_data: ""
}

const mutations = {
    getAllUser(state, data){
        state.users_data = data.users_data
    },
    deleteUser(state, id){
        state.users_data = state.users_data.filter(data => data.id !== id);
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
    },
    async deleteUser(context){
        if(confirm("Apakah yakin ingin menghapus data?")){
            await axiosInstance.delete(`user/delete-data/${id}`)
            .then(res => res.data)
            .then(data => {
                context.commit('log/deleteUser', id)
            })
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}