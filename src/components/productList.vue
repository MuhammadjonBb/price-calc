<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Product List
      </h2>

      <div class="grid grid-rows-3 gap-4 mb-4">
        <div class="grid grid-cols-6"> 
          <div class="font-medium text-gray-800 grid-cols-1">
          Наименование
        </div>
        <div class="font-medium text-gray-800 grid-cols-1">
          СС
        </div>
        <div class="font-medium text-gray-800 grid-cols-1">
          Маржа %
        </div>
        <div class="font-medium text-gray-800 grid-cols-1">
          Количество
        </div>
        <div class="font-medium text-gray-800 grid-cols-1">
          Цена с маржой
        </div>
        <div class="font-medium text-gray-800 grid-cols-1">
          Сумма
        </div>
        </div>
       
    <productRow
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        @update:finalPrice="setFinalPrice"
      />
      <div class="flex flex-col gap-4 mt-6">
        <div class="flex">
          <div>
            Дорожный расход:
          </div>
          <input
          placeholder="Дорожный расход"
            name="roadExpense"
            type="number"
            class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-400 outline-none"
            @input="setFinalPrice"
            v-model.number="roadExpense"
          />  
        </div>
        <div class="flex gap-4">
          <input v-model="searchProductValue" type="text" name="searchProduct" placeholder="Поиск продукта" class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-400 outline-none" />
          <button name="addProduct" @click="addProduct" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Добавить продукт
          </button>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, } from 'vue'
import productRow from './productRow.vue'

const products = ref([
  {
    name: 'OSB 9mm',
    minPrice: 100,
    marginPrice: 0,
    finalPrice: 0,
    unit: 'м2',
    amount: 1
  },
  {
    name: 'Plywood 12mm',
    minPrice: 150,
    marginPrice: 0,
    finalPrice: 0,
    unit: 'м2',
    amount: 1
  },
])
const roadExpense = ref(0)
const totalMarginPrice = computed(() => products.value.reduce((sum, product) => sum + product.marginPrice, 0))
const setFinalPrice = (() => {
  for (const product of products.value) {
    product.finalPrice = product.marginPrice + (product.marginPrice / totalMarginPrice.value) * roadExpense.value * product.amount
  }
})

const searchProductValue = ref('')
const addProduct = () => {
  products.value.push({
    name: searchProductValue.value,
    minPrice: 0,
    marginPrice: 0,
    finalPrice: 0,
    unit: '',
    amount: 1
  })
  searchProductValue.value = ''
}
// const setFinalPrice = (event) => {
//   const roadExpenseValue = event.target.value
//   const totalMarginPrice = products.value.reduce((sum, product) => sum + product.marginPrice, 0)
//   for (const product of products.value) {
//     product.finalPrice = product.marginPrice + (product.marginPrice / totalMarginPrice) * roadExpenseValue
//   }}

</script>
