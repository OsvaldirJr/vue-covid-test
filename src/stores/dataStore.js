import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  strict: true,
  state() {
    return {
      labels: [],
      confirmed: [],
      deaths: [],
      paginatedData: {
        labels: [],
        confirmed: [],
        deaths: [],
      },
    };
  },
  mutations: {
    setLabels(state, payload) {
      state.labels = payload;
      state.paginatedData.labels = payload?.slice(1, 11);
    },
    setConfirmed(state, payload) {
      state.confirmed = payload;
      state.paginatedData.confirmed = payload?.slice(1, 11);
    },
    setDeaths(state, payload) {
      state.deaths = payload;
      state.paginatedData.deaths = payload?.slice(1, 11);
    },
    setPaginatedData(state, payload) {
      state.paginatedData.labels = payload.labels;
      state.paginatedData.confirmed = payload.confirmed;
      state.paginatedData.deaths = payload.deaths;
    },
  },
  actions: {
    setLabelsAction(context, payload) {
      context.commit("setLabels", payload);
    },
    setConfirmedAction(context, payload) {
      context.commit("setConfirmed", payload);
    },
    setDeathsAction(context, payload) {
      context.commit("setDeaths", payload);
    },
    setPaginatedDataAction(context, payload) {
      context.commit("setPaginatedData", payload);
    },
  },
});

export default store;
