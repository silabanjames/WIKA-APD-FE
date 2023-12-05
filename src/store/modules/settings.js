import axiosInstance from '../../lib/index'
import router from '../../router/index'
import Swal from 'sweetalert2'

const state = {
    users_data: [],
    user: {},
}

const mutations = {
    getAllUsers(state, data){
        state.users_data = data
    },
    searchDetailUser(state, user){
        state.user = user
    },
    deleteUser(state, id){
        state.users_data = state.users_data.filter(data => data.id !== id);
    },
    editUserId(state, id){
        state.user_id = id
        console.log("check state.user_id")
        console.log(state.user_id)
    }
}

const actions = {
    async getAllUsers(context){
        await axiosInstance.get("/user")
        .then(res => res.data)
        .then(data => {
            context.commit('getAllUsers', data)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    async deleteUser(context, {id}){
        const confirmResult = await Swal.fire({
            title: 'Are you sure?',
            text: 'Delete permanent this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirmResult.isConfirmed) {
            await axiosInstance.delete(`/user/${id}`)
            .then(res => res.data)
            .then(data => {
                router.go(0)
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
                });
            })
        }

        
    }, 
    async handleAddUser(context, {formData}){
        // console.log([...formData])
        axiosInstance.post('/user', formData , { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res=>res.data)
        .then(
            data => {
                router.push({name: 'userManagement'})
                Swal.fire({
                    title: "User Created Successfully !",
                    icon: "success"
                })
            }
        )
        .catch(
            err => {
                Swal.fire({
                    title: err.response.data.message,
                    icon: "error"
                })
            }
        )
    },
    async searchDetailUser(context, {id}){
        await axiosInstance.get(`/user/${id}`)
        .then(res => res.data)
        .then(data => {
            context.commit("searchDetailUser", data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async handleEditUser(context, {id, formData}){
        await axiosInstance.patch(
            `/user/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(res => res.data)
        .then(data => {
            if(data.error){
                console.log(data)
                Swal.fire({
                    title: data.error.message,
                    icon: "error"
                })
            }
            else{
                router.push({name: 'userManagement'})
                Swal.fire({
                    title: "User updated successfully",
                    icon: 'success'
                })
            }
        })
        .catch(err => {
            console.log(err)
            Swal.fire({
                title: err.response.data.message,
                icon: "error"
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}