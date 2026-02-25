<template>
  <div
    class="grid grid-cols-[24%_10%_6%_8%_8%_14%_13%_13%_4%] items-center py-3 px-4 text-text-main rounded-lg shadow-md border border-border bg-surface"
  >
    <div class="max-w-9/10">
      {{ product.name }}
    </div>

    <div>{{ formatPrice(minPrice) }} сум</div>
    <div>
      {{ product.unit }}
    </div>
    <div class="flex flex-row">
      <input
        name="amount"
        type="number"
        v-model.number="product.amount"
        @input="setAmount"
        class="w-full px-4 max-w-3/4 py-2 bg-primary-light border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        :class="
          isNegativeAmount
            ? 'bg-red-100 border-red-400 focus:border-red-400 focus:ring-red-200'
            : 'bg-primary-light border-border focus:border-primary focus:ring-primary/20'
        "
      />
    </div>
    <div class="flex flex-row">
      <input
        name="margin"
        type="number"
        @input="setMargin"
        :class="
          isNegativeMargin
            ? 'bg-red-100 border-red-400 focus:border-red-400 focus:ring-red-200'
            : 'bg-primary-light border-border focus:border-primary focus:ring-primary/20'
        "
        class="w-full px-4 max-w-3/4 py-2 bg-primary-light border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        v-model.number="product.margin"
      />
    </div>
    <div class="flex gap-2 pr-1">
      <!-- {{ formatPrice(product.marginPrice) }} сум -->
      <input
        name="marginPrice"
        type="number"
        v-model.number="product.marginPrice"
        @input="setPrice"
        class="w-full max-w-3/4 px-4 py-2 bg-primary-light border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
      />
      <span class="block content-center">сум</span>
    </div>
    <div class="">{{ formatPrice(product.deliveryPrice) }} сум</div>
    <div class="">{{ formatPrice(product.finalPrice) }} сум</div>
    <div class="flex justify-end pr-5">
      <button
        @click="removeProduct"
        class="bg-red-500 text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
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

const setPrice = () => {
  props.product.margin = (
    ((props.product.marginPrice / 1.12 - props.product.minPrice) /
      (props.product.marginPrice / 1.12)) *
    100
  ).toFixed(2);
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

const isNegativeMargin = computed(() => {
  return props.product.margin < 0 || props.product.margin > 100;
});

const isNegativeAmount = computed(() => {
  return props.product.amount < 0;
});
</script>
