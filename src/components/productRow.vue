<template>
  <div class="grid grid-cols-9 gap-4 items-center py-3 border-b">
    <div class="font-medium text-gray-800 col-span-2">
      {{ product.name }}
    </div>

    <div class="text-gray-600">{{ formatPrice(minPrice) }} сум</div>
    <div class="text-gray-600">
      {{ product.unit }}
    </div>

    <div class="flex flex-row text-black">
      <div class="font-medium mr-1"></div>
      <input
        name="margin"
        type="number"
        @input="setMargin"
        class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-900 outline-none"
      />
    </div>
    <div class="flex flex-row text-black">
      <input
        name="amount"
        type="number"
        v-model.number="product.amount"
        @input="setAmount"
        class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-900 outline-none"
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
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatPrice } from "../utils/format.js";

const props = defineProps({
  product: Object,
});

const emit = defineEmits(["update:finalPrice"]);
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
</script>
