<template>
  <div class="relative w-full">
    <input
      v-model="search"
      type="text"
      placeholder="Поиск товара..."
      class="w-full border rounded px-3 py-2"
    />

    <!-- Подсказки -->
    <div
      v-if="filteredProducts.length"
      class="absolute w-full bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        @click="addProduct(product)"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ product.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import data from "../data/products.json";

const search = ref("");

const filteredProducts = computed(() => {
  if (!search.value) return [];
  return data.filter((product) =>
    product.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});
const emit = defineEmits(["add-product"]);
const addProduct = (product) => {
  search.value = "";
  emit("add-product", product);
};
</script>
