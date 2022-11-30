import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  strict: true,
  state() {
    return {
      perPage:10,
      data: {
        labels: [],
        confirmed: [],
        deaths: [],
      },
      paginatedData: {
        labels: [],
        confirmed: [],
        deaths: [],
      },
    };
  },
  mutations: {
    setData(state, payload) {
      state.data.labels = payload.labels;
      state.data.confirmed = payload.confirmed;
      state.data.deaths = payload.deaths;
      state.paginatedData.labels = payload.labels?.slice(1, state.perPage+1);
      state.paginatedData.confirmed = payload.confirmed?.slice(1, state.perPage+1);
      state.paginatedData.deaths = payload.deaths?.slice(1, state.perPage+1);
    },
    setPaginatedData(state, payload) {
      state.paginatedData.labels = payload.labels;
      state.paginatedData.confirmed = payload.confirmed;
      state.paginatedData.deaths = payload.deaths;
    },
    setPerPageData(state, payload) {
      state.perPage = payload;
    },
  },
  actions: {
    setDataAction(context, payload) {
      context.commit("setData", payload);
    },
    setPaginatedDataAction(context, payload) {
      context.commit("setPaginatedData", payload);
    },
    setPerPageAction(context, payload) {
      context.commit("setPerPageData", payload);
    },
  },
});

export default store;
