<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Product List
      </h2>

      <div class="grid gap-4 mb-4">
        <div class="grid grid-cols-7"> 
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
          Цена (Маржа + НДС)
        </div>
         <div class="font-medium text-gray-800 grid-cols-1">
          Цена после доставки 
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
        <!-- <div class="flex gap-4">
          <input v-model="searchProductValue" type="text" name="searchProduct" placeholder="Поиск продукта" class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-400 outline-none" />
          <button name="addProduct" @click="addProduct" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Добавить продукт
          </button>
        </div> -->
        <productSearch @add-product="addProduct" />
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, } from 'vue'
import productRow from './productRow.vue'
import productSearch from './productSearch.vue'

const products = ref([
  // {
  //   name: 'OSB 9mm',
  //   minPrice: 100,
  //   marginPrice: 0,
  //   finalPrice: 0,
  //   unit: 'м2',
  //   amount: 1,
  //   deliveryPrice: 0
  // },
 
])

const roadExpense = ref(0)

const setFinalPrice = () => { // Функция для расчета итоговой цены с учетом маржи и дорожных расходов
    const totalMarginPrice = products.value.reduce((sum, product) => sum + product.marginPrice * product.amount, 0) // Суммируем цену с маржой для всех продуктов, умножая на количество
    for (const product of products.value) {
      const productPriceSumm = product.marginPrice * product.amount // Сумма для конкретного продукта (цена с маржой * количество)
      const productShare = productPriceSumm / totalMarginPrice // Доля конкретного продукта в общей сумме цен с маржой
      const deliveryCost = productShare * roadExpense.value // Доля дорожных расходов для конкретного продукта
      product.deliveryPrice = (productPriceSumm + deliveryCost)/ product.amount // Цена после доставки для конкретного продукта (с учетом его доли в дорожных расходах)
      product.finalPrice = productPriceSumm + deliveryCost // Итоговая цена для конкретного продукта (цена с маржой + его доля в дорожных расходах)
    }
}

const addProduct = (product) => {
  products.value.push({
    ...product,
    deliveryPrice: 0,
    marginPrice: 0,
    amount: 1,
    finalPrice: 0
  })
  console.log(products.value);
  
}

// const setFinalPrice = (() => {
//   const totalFinalPrice = products.value.reduce((sum, product) => sum + product.finalPrice, 0)
//   for (const product of products.value) {
//       product.finalPrice = product.minPrice + (product.minPrice / totalFinalPrice) * roadExpense.value * product.amount
//       console.log(totalFinalPrice)
//   } 
// })  

// const searchProductValue = ref('')
// const addProduct = () => {
//   products.value.push({
//     name: searchProductValue.value,
//     minPrice: 150,
//     marginPrice: 0,
//     finalPrice: 0,
//     unit: 'шт',
//     amount: 1,
//     deliveryPrice: 0
//   })
//   searchProductValue.value = ''
// }


// const setFinalPrice = (event) => {
//   const roadExpenseValue = event.target.value
//   const totalFinalPrice = products.value.reduce((sum, product) => sum + product.marginPrice, 0)
//   for (const product of products.value) {
//     product.finalPrice = product.marginPrice + (product.marginPrice / totalFinalPrice) * roadExpenseValue
//   }}

</script>
