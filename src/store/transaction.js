export default {
  namespaced: true,
  state() {
    return {
      selectedPizza: null,
      selectedSize: null,
      selectedToppings: [],
    };
  },
  getters: {
    checkoutTotal(state) {
      let total = 0;

      if (state.selectedPizza) {
        total += state.selectedPizza.discount.final_price;
      }

      if (state.selectedSize) {
        total += state.selectedSize.extra_price;
      }

      state.selectedToppings.forEach((topping) => {
        total += topping.price;
      });

      console.log("Total price:", total);
      return total;
    },
  },
  mutations: {
    setSelectedPizza(state, pizza) {
      console.log("Pizza selected:", pizza);
      state.selectedPizza = pizza;
    },

    setSize(state, size) {
      console.log("size selected:", size);
      state.selectedSize = size;
    },
    setToppings(state, topping) {
      console.log("toppings selected:", topping);
      state.selectedToppings = topping;
    },
    clearCart(state) {
      state.selectedPizza = null;
      state.selectedSize = { name: "small", extra_price: 0 };
      state.selectedToppings = [];
      this.commit("clearToppings");
    },
    clearToppings(state) {
      state.selectedToppings = [];
    },
  },
  actions: {
    setSelectedPizza({ commit }, pizza) {
      commit("setSelectedPizza", pizza);
    },
    setSize({ commit }, size) {
      commit("setSize", size);
    },
    setToppings({ commit }, topping) {
      commit("setToppings", topping);
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
    clearToppings({ commit }) {
      commit("clearToppings");
    },
  },
};
