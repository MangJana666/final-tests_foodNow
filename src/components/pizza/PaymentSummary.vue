<template>
  <div class="row">
    <div class="col-12">
      <div class="card card-total" style="border-radius: 10px; width: 320px">
        <div class="card-body">
          <h5 class="mt-2" style="color: #e67e22">Payment Summary</h5>

          <div
            v-if="selectedPizza"
            :key="selectedPizza.id"
            class="d-flex justify-content-between mt-4"
          >
            <p>{{ selectedPizza.name }}</p>
            <p>${{ selectedPizza.discount?.final_price }}</p>
          </div>

          <div
            v-if="selectedSize"
            :key="selectedSize.id"
            class="d-flex justify-content-between"
          >
            <p>Size - {{ selectedSize.name }}</p>
            <p>${{ selectedSize.extra_price }}</p>
          </div>

          <div
            v-for="topping in filteredToppings"
            :key="topping.id"
            class="d-flex justify-content-between"
          >
            <p>{{ topping.name }}</p>
            <p>+${{ topping.price }}</p>
          </div>

          <hr />

          <div class="d-flex justify-content-between">
            <h5>Total Price</h5>
            <h5 style="color: #e67e22">${{ totalPrice }}</h5>
          </div>

          <button
            :disabled="
              !selectedPizza || !selectedSize || filteredToppings.length === 0
            "
            @click="checkout"
            type="button"
            class="btn mt-3"
            style="
              width: 100%;
              background-color: #e67e22;
              color: white;
              border-radius: 20px;
            "
            data-bs-toggle="modal"
            data-bs-target="#orderModal"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <i
            style="
              color: #e67e22;
              font-size: 100px;
              padding: 25px;
              margin-bottom: 10px;
            "
            class="fa-solid fa-cart-shopping"
          ></i>
          <div class="modal-order-success">Order Success</div>
          <div>Thank you, we have received your order successfully.</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary modal-button"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const selectedPizza = computed(() => store.state.transaction.selectedPizza);
const selectedSize = computed(() => store.state.transaction.selectedSize);
const selectedToppings = computed(
  () => store.state.transaction.selectedToppings
);
const totalPrice = computed(() => store.getters["transaction/checkoutTotal"]);

const filteredToppings = computed(() => {
  if (!selectedPizza.value || !selectedPizza.value.toppings) return [];
  return selectedToppings.value.filter((topping) =>
    selectedPizza.value.toppings.includes(topping.id)
  );
});

watch(selectedPizza, () => {
  const availableToppings = selectedToppings.value.filter((topping) =>
    selectedPizza.value.toppings.includes(topping.id)
  );
  store.commit("transaction/selectedToppings", availableToppings);
  store.commit("transaction/selectedSize", null);
});

const checkout = () => {
  store.dispatch("transaction/clearCart");
  store.commit("transaction/clearToppings");
  document.querySelectorAll(".topping").forEach((topping) => {
    topping.classList.remove("active");
  });
};
</script>

<style scoped>
.modal-body {
  text-align: center;
}
.modal-order-success {
  font-size: 20px;
  font-weight: bold;
}
.modal-button {
  background-color: #e67e22;
  color: white;
  border: none;
}
</style>
