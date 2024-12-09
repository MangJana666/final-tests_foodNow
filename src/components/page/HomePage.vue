<template>
  <main>
    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-9 mt-5">
          <h1 style="color: #e67e22">Choose your pizza</h1>
          <div class="row">
            <PizzaCardList />
          </div>
        </div>
        <div class="col-sm-3 mt-5">
          <PaymentSummary />
        </div>
      </div>

      <div class="container">
        <div class="row">
          <h1 style="color: #e67e22">Custom Pizza</h1>
          <SizeList />
        </div>
      </div>

      <div class="container mt-5">
        <div class="row">
          <ToppingList />
        </div>
      </div>
    </div>
  </main>
  <hr class="container" style="margin-top: 150px" />
</template>

<script setup lang="ts">
import PaymentSummary from "../pizza/PaymentSummary.vue";
import PizzaCardList from "../pizza/PizzaCardList.vue";
import SizeList from "../pizza/SizeList.vue";
import ToppingList from "../pizza/ToppingList.vue";
</script>

<style scoped>
h1 {
  font-weight: bold;
}

.container {
  margin-top: 30px;
}

.mt-3 {
  margin-top: 20px;
}

.col-sm-3 {
  padding-top: 50px;
}

.col-sm-9 {
  padding-top: 50px;
}

.card-body {
  background-color: #f8f9fa;
}
</style>
