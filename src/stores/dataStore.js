import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  strict: true,
  state () {
    return {
        labels: [],
        confirmed: [],
        deaths:[],
    }
  },
  mutations: {
    setLabels (state, payload) {
      state.labels = payload
    },
    setConfirmed (state, payload) {
        state.confirmed = payload
    },
    setDeaths (state, payload) {
        state.deaths = payload
    }
  },
  actions:{
    setLabelsAction(context, payload){
        context.commit('setLabels', payload)
    },
    setConfirmedAction(context, payload){
        context.commit('setConfirmed', payload)
    },
    setDeathsAction(context, payload){
        context.commit('setDeaths', payload)
    }
  }
});

export default store;