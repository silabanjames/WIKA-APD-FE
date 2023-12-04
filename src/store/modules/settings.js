import axiosInstance from '../../lib/index'
import router from '../../router/index'
import Swal from 'sweetalert2'

const state = {
    users_data: []
}

const mutations = {
    getAllUsers(state, data){
        state.users_data = data
    },
    deleteUser(state, id){
        state.users_data = state.users_data.filter(data => data.id !== id);
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
                    // text: 'An error occurred while deleting the user.',
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
                console.log(data.message)
                router.push({name: 'userManagement'})
                Swal.fire({
                    title: "User Created Successfully !",
                    icon: "success"
                })
            }
        )
        .catch(
            err => {
                console.log(err)

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