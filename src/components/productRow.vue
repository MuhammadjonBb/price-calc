<template>
  <div class="grid grid-cols-6 gap-4 items-center py-3 border-b">
    
    <div class="font-medium text-gray-800">
      {{ product.name }}  
    </div>

    <div class="text-gray-600">
      СС: {{ minPrice }} {{ product.unit }}
      
    </div>
    
    <div class="flex flex-row text-black">
      <div class="font-medium mr-1"></div>
      <input
        name="margin"
        type="number"
        @input="setMargin"
        class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
      <div class="flex flex-row text-black">
      <input
        name="amount"
        type="number"
        v-model.number="product.amount"
        @input="setAmount"
        class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
     <div class="font-medium text-gray-800">
      {{ product.marginPrice.toFixed(2) }}
    </div>
    <div class="font-medium text-gray-800">
      {{ product.finalPrice.toFixed(2) }}  
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: Object,
})

const emit = defineEmits(['update:finalPrice'])
const minPrice = computed(() => (props.product.minPrice/1.12).toFixed(2))

const setMargin = (event) => {
  const value = event.target.value
  props.product.marginPrice = (props.product.minPrice/1.12)/(1-(value/100))
  emit('update:finalPrice', props.product.marginPrice)
}

const setAmount = (event) => {
  const value = event.target.value
  props.product.amount = value
  emit('update:finalPrice', props.product.marginPrice)
}
</script>
