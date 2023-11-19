import axiosInstance from '../../lib/index'
import router from '../../router/index'

const state = {
    chart1_dataSeries: "",
    chart1_label: "",
    chart2_dataSeries1: "",
    chart2_dataSeries2: "",
    chart2_dataSeries3: "",
    chart2_label: ""
}

const mutations = {
    getDataChart1(state, data){
        state.chart1_dataSeries = data.series
        state.chart1_label = data.label
    },
    getDataChart2(state, data){
        state.chart2_dataSeries1 = data.series1
        state.chart2_dataSeries2 = data.series2
        state.chart2_dataSeries3 = data.series3
        state.chart2_label = data.label
    }
}

const actions = {
    /*
    * Get Data untuk Chart1
    * Gunakan pada mounted()
    */
    getDataChart1(context){
        axiosInstance.get('/chart/table_1')
        .then(res=>res.data)
        .then(data=>{
            context.commit('chart/getDataChart1', data)
        })
        .catch(err => console.log(err))
    },

    /*
    * Get Data untuk Chart1
    * Gunakan pada mounted()
    */
    getDataChart2(context){
        axiosInstance.get('/chart/table_2')
        .then(res=>res.data)
        .then(data=>{
            context.commit('chart/getDataChart2', data)
        })
        .catch(err => console.log(err))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}