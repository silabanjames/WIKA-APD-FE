import axiosInstance from "@/lib";

const state = {
    id: "",
    name: "",
    email: "",
    pathImage: "",
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
    },
    editPath(state, path){
        state.path = path
    },
}

const actions = {
    async getData(context){
        axiosInstance.get('/user/edit-user')
        .then(res=>res.data)
        .then(
            data=>{
                context.commit('editUser/editName', data.name)
                context.commit('editUser/editEmail', data.email)
                context.commit('editUser/editPath', data.image_url)
            }
        )
        .catch(err => console.log(err))
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