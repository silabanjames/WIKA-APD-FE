import axiosInstance from '../../lib/index'
import router from '../../router/index'

const state = {
    user: {
        id: '',
        name: sessionStorage.getItem('name'),
        profilePicture: sessionStorage.getItem('profilePicture'),
        email: {
            value: '',
            errormsg: ''
        },
        password: {
            value: '',
            errormsg: ''
        },
        role: sessionStorage.getItem('role'),
    }
}

const getters = {
    getEmail: state => {return state.user.email.value},
    getPassword: state => {return state.user.password.value},
    getRole: state => (state.user.role.toLowerCase())
}


const mutations = {
    handleLogin(state){
        // state.user.id = data.id
        // state.user.name = data.name
        // state.user.email.value = data.email
        // state.user.password.value = ''
        state.user.role = sessionStorage.getItem('role')
        state.user.name = sessionStorage.getItem('name')
        state.user.profilePicture = sessionStorage.getItem('profilePicture')
    },
    handleLogOut(state){
        // Reset user data
        // state.id = ''
        state.name = ''
        state.email = ''
        state.password = ''
        state.role = sessionStorage.getItem('role')
    },
    editEmail(state, email){
        state.user.email.value = email
    },
    editPassword(state, password){
        state.user.password.value = password
    },
    editEmailErrMsg(state, msg){
        state.user.email.errormsg = msg
    },
    editPasswordErrMsg(state, msg){
        state.user.password.errormsg = msg
    }
}

const actions = {
    handleLogin(context){
        const email = context.getters.getEmail
        const password = context.getters.getPassword
        return axiosInstance.post('/auth/login', {
            email,
            password
        })
        .then(res => res.data)
        .then(
            data => {
                const token = data.token
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('role', data.user.role)
                sessionStorage.setItem('name', data.user.name)
                sessionStorage.setItem('profilePicture', data.user.profilePicture)
                console.log(token)
                axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
                context.commit('handleLogin')
                console.log('true')
                return true
            }
        )
        .catch(err => {
            console.log(err)
            return false
        })
    },
    handleRegister(context, {first_name, last_name, email, password, confirmPassword}){
        let name = first_name + " " + last_name
        axiosInstance.post('/auth/register', {
            name,
            email,
            password,
            confirmPassword
        })
        .then( () => {
            router.push('/auth/login')
            return true
        })
        .catch(err => {
            console.log(err)
            return false
        })
    },
    handleLogOut(context){
        let confirmation = confirm("Apakah anda yakin ingin keluar dari aplikasi?")
        if(confirmation){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('role')
            context.commit('handleLogOut')
            router.push('/auth/login')
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}