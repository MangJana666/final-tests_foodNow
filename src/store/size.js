export default {
  namespaced: true,
  state: () => ({
    size: [],
  }),
  mutations: {
    setSizeData(state, payload) {
      state.size = payload;
    },
  },
  actions: {
    async getSizeData({ commit }) {
      try {
        const response = await fetch("src/json/size-list.json");
        if (!response.ok) throw new Error("Failed to fetch size data");
        const size = await response.json();
        console.log("Fetched size:", size);
        commit("setSizeData", size.data);
      } catch (error) {
        console.error("Error fetching size data:", error);
      }
    },
  },
  getters: {
    allSize: (state) => state.size,
  },
};
