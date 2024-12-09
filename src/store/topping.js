export default {
  namespaced: true,
  state: () => ({
    topping: [],
  }),
  mutations: {
    setToppingData(state, payload) {
      state.topping = payload;
    },
  },
  actions: {
    async getToppingData({ commit }) {
      try {
        const response = await fetch("src/json/topping-list.json");
        if (!response.ok) throw new Error("Failed to fetch topping data");
        const topping = await response.json();
        console.log("Fetched topping:", topping);
        commit("setToppingData", topping.data);
      } catch (error) {
        console.error("Error fetching topping data:", error);
      }
    },
  },
  getters: {
    allTopping: (state) => state.topping,
  },
};
