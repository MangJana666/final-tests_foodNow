<template>
  <div class="col-sm-8 mt-3">
    <h3>Size</h3>
    <div
      class="form-check form-check-inline mt-3"
      v-for="(size, index) in sizeList"
      :key="size.id"
    >
      <input
        class="form-check-input"
        type="radio"
        name="size"
        :id="`size-${index}`"
        :value="size"
        @click="selectSize(size)"
      />
      <label class="form-check-label d-flex" :for="`size-${index}`">
        {{ size.name }}
        <div style="color: gray; margin-left: 5px">
          (+{{ size.extra_price }}$)
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const sizeList = ref([]);
const selectedSize = ref(null);

onMounted(async () => {
  try {
    await store.dispatch("size/getSizeData");
    sizeList.value = store.state.size.size;

    const defaultSize = sizeList.value.find((size) => size.name === "small");
    if (defaultSize) {
      selectedSize.value = defaultSize;
      store.dispatch("transaction/setSize", defaultSize);
    }
  } catch (err) {
    console.log(err);
  }
});

const selectSize = (size) => {
  selectedSize.value = size;
  store.dispatch("transaction/setSize", size);
};
</script>
<style scoped>
.form-check-input {
  border: 2px #e67e22;
}

.form-check-input:checked {
  background-color: #e67e22;
  border-color: #e67e22;
}
</style>
