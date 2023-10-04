import axiosInstance from '../../lib/index'
import router from '../../router/index'

const state = {
    user: {
        id: '',
        name: '',
        username: 'superdede',
        password: 'super@dede.com',
        role: '',
    }
}

const getters = {
    
}


const mutations = {
    handleLogin(state){
        const { username, password } = state.user
        axiosInstance.post('/auth/login/', {
            username,
            password
        }).then(
            res => {
                const token = res.data.access_token

                sessionStoreage.setItem('token', token)

                state.token = token
                state.user.id = res.data.user.id
                state.user.name = res.data.user.name
                state.user.role = res.data.user.role
                state.user.password = ''

                router.push('/')
            }
        )
    }
}

const actions = {
    handleLogin(context){
        context.commit('handleLogin')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}