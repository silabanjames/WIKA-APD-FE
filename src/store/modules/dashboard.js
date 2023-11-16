const state = {
    activeCamera: ""
};

const mutations = {
    editActiveCamera(state, data){
        state.activeCamera = data
    }
}

export default {
	namespaced: true,
	state,
    mutations
};