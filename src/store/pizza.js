export default {
  namespaced: true,
  state: () => ({
    pizza: [],
  }),
  getters: {
    allPizza: (state) => state.pizza,
  },
  mutations: {
    setPizzaData(state, payload) {
      state.pizza = payload;
    },
  },
  actions: {
    async getAllPizza({ commit }) {
      try {
        const response = await fetch("src/json/pizza-list.json");
        if (!response.ok) throw new Error("Failed to fetch pizza data");
        const pizza = await response.json();
        commit("setPizzaData", pizza.data);
      } catch (error) {
        console.error("Error fetching pizza data:", error);
      }
    },
  },
};
