import { createStore } from "vuex";
import pizza from "./pizza.js";
import size from "./size.js";
import topping from "./topping.js";
import transaction from "./transaction.js";

const store = createStore({
  modules: {
    pizza,
    size,
    topping,
    transaction,
  },
});

export default store;
