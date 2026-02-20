<template>
  <div class="grid grid-cols-10 items-center py-3 border-b">
    <div class="font-medium text-gray-800 col-span-2 pr-2">
      {{ product.name }}
    </div>

    <div class="text-gray-600">{{ formatPrice(minPrice) }} сум</div>
    <div class="text-gray-600">
      {{ product.unit }}
    </div>
    <div class="flex flex-row text-black">
      <input
        name="amount"
        type="number"
        v-model.number="product.amount"
        @input="setAmount"
        class="block w-full max-w-30 border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-900 outline-none"
      />
    </div>
    <div class="flex flex-row text-black max-w-30">
      <input
        name="margin"
        type="number"
        @input="setMargin"
        class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-900 outline-none"
        v-model.number="product.margin"
      />
    </div>
    <div class="font-medium text-gray-800">
      {{ formatPrice(product.marginPrice) }} сум
    </div>
    <div class="font-medium text-gray-800">
      {{ formatPrice(product.deliveryPrice) }} сум
    </div>
    <div class="font-medium text-gray-800">
      {{ formatPrice(product.finalPrice) }} сум
    </div>
    <div class="font-medium flex justify-end pr-5">
      <button
        @click="removeProduct"
        class="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatPrice } from "../utils/format.js";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["update:finalPrice"], ["update:removeProduct"]);
const minPrice = computed(() => props.product.minPrice.toFixed(2));

const setMargin = (event) => {
  const value = event.target.value;
  props.product.marginPrice =
    (props.product.minPrice / (1 - value / 100)) * 1.12;
  emit("update:finalPrice");
};

const setAmount = (event) => {
  const value = event.target.value;
  props.product.amount = value;
  emit("update:finalPrice");
};

const removeProduct = () => {
  emit("update:removeProduct", props.product);
};
</script>
