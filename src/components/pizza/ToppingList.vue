<template>
  <h3>Toppings</h3>
  <div class="col-8 d-flex flex-wrap">
    <div class="row topping-list-content" v-for="topping in toppingList" :key="topping.id">
      <input
        type="checkbox"
        :id="'cb-' + topping.id"
        class="topping-button hidden"
        @click="toppingClicker(topping)"
        :disabled="!toppingAvailable(topping.id)">
      </input>
      <label :for="'cb-' + topping.id">{{ topping.name }}</label>
    </div>
  </div>
  
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  
  const store = useStore();
  const toppingList = ref([]);
  const selectedToppings = ref([]);
  const selectedPizza = computed(() => store.state.transaction.selectedPizza);
  
  const toppingAvailable = (id) => {
    return selectedPizza.value && selectedPizza.value.toppings.includes(id);
  }
  
  onMounted(async () => {
    try {
      await store.dispatch("topping/getToppingData");
      toppingList.value = store.state.topping.topping;
    } catch (err) {
      console.error(err);
    }
  });
  
  const toppingClicker = (topping) => {
    const index = selectedToppings.value.findIndex(t => t.id === topping.id);
    if (index === -1) {
      selectedToppings.value.push(topping);
    } else {
      selectedToppings.value.splice(index, 1);
    }
    store.dispatch('transaction/setToppings', selectedToppings.value);
  };
  
  </script>
  
  <style scoped>
  .topping-list-content {
    margin-left: 30px;
    text-align: center;
    width: 120px;
    gap: 20px;
  }
  .no-pizza-selected, .no-toppings-available {
    text-align: center;
    color: rgb(249, 245, 245);
    font-style: italic;
    margin: 20px 0;
  }
  
  .hidden {
    position: absolute;
    visibility: hidden;
    
  }
  
  input[type="checkbox"][disabled]+label {
    background-color: #f5f5f5; 
    color: rgb(228, 226, 226);
    border: none;
  }
  
  input[type=checkbox]+label {
    color: var(--checkbox-default-color, black);
    margin: 10px;
    background-color: white;
    border: 1px solid rgb(146, 146, 146);
    padding: 10px 30px;
    border-radius: 300px;
    font-weight: bold;
    font-size: 14px;
    transition: color 0.3s, font-style 0.3s, border 0.3s;
  }
  
  input[type=checkbox]:checked+label {
    color: var(--checkbox-checked-color, #E77E23);
    border: 1px solid #E77E23;
    background-color: #ffddbf;
    font-style: normal;
  }
  
  input[type=checkbox]+label:hover {
    color: var(--checkbox-hover-color, #E77E23);
    border: 1px solid #E77E23;
  }
  
  </style>
