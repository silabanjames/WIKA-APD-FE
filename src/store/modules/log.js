import axiosInstance from '../../lib/index'
import router from '../../router/index'

// Data dummy
import trackingList from "../../data/log/trackingList.json"

const state = {
    trackingList: [],
    date: ''
};

const getters={
    changeDateStyle: (state)=>{
        if(state.date){
            // style date sebelumnya = yyyy-mm-dd
            // akan diubah menjadi yyyy/mm/dd
            const dateStr = state.date.split("-")
            const newDateStr = `${dateStr[0]}/${dateStr[1]}/${dateStr[2]}`
            return newDateStr
        }
    },
    compareDate: (state, getters) => (dateStr)=> {
        if(state.date){
            // Estimate the date value is string
            const dateWorker = new Date(dateStr)
            const dateFilter = new Date(getters.changeDateStyle)
            return dateFilter.getTime() === dateWorker.getTime()
        }
    }
}

const mutations = {
    changeDate(state, newDate){
        state.date = newDate
    },
    deleteTrack: (state, payload) => {
        state.trackingList = state.trackingList.filter(data => data.id !== payload);
    },
    getRequestData(state, payload){
        state.trackingList = payload
        console.log(state.trackingList)
    }
};

const actions={
    /*
    * Get Data
    * Gunakan di mounted pada @/pages/log/monitoringLog.vue
    */
    async getRequestData(context){
        /*
        * Edit 'track_information' untuk mendapatkan data
        */
        await axiosInstance.get("/equipment")
        .then(res => res.data)
        .then(data => {
            context.commit("getRequestData", data.records)
        })
        .catch(err => {
            console.log(err)
        })
    },
    async handleFilter(context, params){
        await axiosInstance.get('/equipment/filter', {
            params
        })
        .then(res => res.data)
        .then(data => {
            console.log("cek log pada filter")
            console.log(params)
            console.log(data)
            context.commit("getRequestData", data.records)
        })
        .catch(err => {
            console.log(err)
        })
    },
    /*
    * Delete data function
    */
    async deleteTrack(context, {id}){
        if(confirm("Apakah yakin ingin menghapus data?")){
            await axiosInstance.delete(`log/delete-data/${id}`)
            .then(res => res.data)
            .then(data => {
                context.commit('log/deleteTrack', id)
            })
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};