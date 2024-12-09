<template>
  <div class="pizza-container mt-5">
    <div class="pizza-grid">
      <div
        @click="selectCard(pizza)"
        class="pizza-card"
        style="position: relative"
        :class="{ 'selected-card': selectedCard === pizza }"
        v-for="(pizza, index) in pizzaList"
        :key="pizza.id"
      >
        <input type="checkbox" class="hidden-input" />

        <div v-if="pizza.id === 2" class="pizza-veggie">
          <div class="offer">
            <img src="/src/assets/logo/ribbon.svg" alt="" />
          </div>
          <div class="pizza-content">
            <div class="pizza-image">
              <img :src="pizza.images" alt="" />
            </div>
            <div class="pizza-details">
              <h6 class="pizza-name">{{ pizza.name }}</h6>
              <div>
                <strike style="color: lightgray">${{ pizza.price }}.00</strike>
                ${{ pizza.discount.final_price }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="pizza-content">
          <div class="pizza-image">
            <img :src="pizza.images" alt="" />
          </div>
          <div class="pizza-details">
            <h6 class="pizza-name">{{ pizza.name }}</h6>
            <div>${{ pizza.price }}.00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const pizzaList = ref([]);
const selectedCard = ref(null);

onMounted(async () => {
  try {
    await store.dispatch("pizza/getAllPizza");
    pizzaList.value = store.state.pizza.pizza;
  } catch (err) {
    console.error("Error fetching pizza data:", err);
  }
});

const selectCard = (pizza) => {
  selectedCard.value = pizza;
  store.dispatch("transaction/setSelectedPizza", pizza);
};
</script>

<style scoped>
.pizza-image {
  transition: transform 0.3s ease-in-out;
}

.pizza-card:hover .pizza-image {
  transform: rotate(25deg);
}

.pizza-card:hover {
  background-color: rgb(255, 214, 138);
}

.pizza-card:active {
  background-color: #e67e22;
  color: white;
}
.pizza-wrapper {
  padding: 20px;
}

.pizza-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.pizza-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  /* justify-content: center; */
}

.pizza-card {
  position: relative;
  width: 308px;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.pizza-card:hover {
  background-color: #e67e22;
}

.selected-card {
  border: 2px solid #e67e22;
  background-color: #e67e22;
  transition: background-color 0.3s ease, border 0.3s ease;
}

.pizza-veggie {
  position: relative;
  overflow: hidden;
}

.pizza-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.pizza-image img {
  max-width: 90%;
  height: auto;
  border-radius: 50%;
}

.pizza-details {
  text-align: left;
}

.hidden-input {
  display: none;
}
</style>
