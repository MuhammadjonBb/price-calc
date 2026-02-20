<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-full mx-auto bg-white shadow-xl rounded-2xl p-6">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Калькулятор маржи и дорожных расходов
      </h2>

      <div class="grid gap-4 mb-4">
        <div class="grid grid-cols-10 font-bold">
          <div class="font-medium text-gray-800 col-span-2">Наименование</div>
          <div class="font-medium text-gray-800">СС Факт</div>
          <div class="font-medium text-gray-800">Ед. изм.</div>
          <div class="font-medium text-gray-800">Количество</div>
          <div class="font-medium text-gray-800">Маржа %</div>
          <div class="font-medium text-gray-800">Цена (Маржа + НДС)</div>
          <div class="font-medium text-gray-800">Цена после доставки</div>
          <div class="font-medium text-gray-800">Сумма</div>
        </div>
        <div
          v-if="!products.length"
          class="text-gray-900 text-center p-4 mt-2 border-dashed border-2 border-gray-600 font-bold rounded-lg"
        >
          Добавьте товары для расчета
        </div>
        <productRow
          v-for="(product, index) in products"
          :key="index"
          :product="product"
          @update:finalPrice="setFinalPrice"
          @update:removeProduct="removeProduct"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-2 gap-4 mt-6 max-w-full mx-auto bg-white shadow-xl rounded-2xl p-6"
    >
      <div class="flex flex-col gap-2">
        <div>🚚 Дорожный расход:</div>
        <input
          placeholder="Дорожный расход"
          name="roadExpense"
          type="text"
          class="block w-full border rounded-lg px-2 py-1 text-black focus:ring-2 focus:ring-blue-400 outline-none"
          @input="setFinalPrice"
          v-model="formattedValue"
        />
      </div>
      <div class="flex-col gap-2">
        <div>🔍 Поиск</div>
        <productSearch @add-product="addProduct" :added-products="products" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import productRow from "./productRow.vue";
import productSearch from "./productSearch.vue";

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
]);
const roadExpense = ref("");

// Загружаем данные из Local Storage при загрузке страницы
onMounted(() => {
  if (localStorage.getItem("products")) {
    products.value = JSON.parse(localStorage.getItem("products"));
  }
  if (localStorage.getItem("roadExpense")) {
    roadExpense.value = parseFloat(localStorage.getItem("roadExpense"));
  }
});

// Функция для расчета итоговой цены с учетом маржи и дорожных расходов
const setFinalPrice = () => {
  const totalMarginPrice = products.value.reduce(
    (sum, product) => sum + product.marginPrice * product.amount,
    0,
  ); // Суммируем цену с маржой для всех продуктов, умножая на количество
  for (const product of products.value) {
    const productPriceSumm = product.marginPrice * product.amount; // Сумма для конкретного продукта (цена с маржой * количество)
    const productShare = productPriceSumm / totalMarginPrice; // Доля конкретного продукта в общей сумме цен с маржой
    const deliveryCost = productShare * roadExpense.value; // Доля дорожного расхода для конкретного продукта
    product.deliveryPrice =
      productPriceSumm / product.amount + deliveryCost / product.amount; // Цена после доставки для конкретного продукта (с учетом его доли в дорожных расходах)
    product.finalPrice = productPriceSumm + deliveryCost; // Итоговая цена для конкретного продукта (цена с маржой + его доля в дорожных расходах)
  }
};

// Функция для добавления продукта в список
const addProduct = (product) => {
  products.value.push({
    ...product,
    deliveryPrice: 0,
    marginPrice: 0,
    amount: 1,
    finalPrice: 0,
    margin: 0,
  });
};

// Функция для удаления продукта из списка
const removeProduct = (product) => {
  const index = products.value.findIndex((p) => p.id === product.id);
  if (index !== -1) {
    products.value.splice(index, 1);
    setFinalPrice(); // Пересчитываем итоговую цену после удаления продукта
  }
};

// Используем Local Storage для сохранения данных при перезагрузке страницы
if (localStorage.getItem("products")) {
  products.value = JSON.parse(localStorage.getItem("products"));
  roadExpense.value = parseFloat(localStorage.getItem("roadExpense"));
}
// Сохраняем данные в Local Storage при изменении продуктов или дорожных расходов
watch(
  products,
  (newProducts) => {
    localStorage.setItem("products", JSON.stringify(newProducts));
    localStorage.setItem("roadExpense", roadExpense.value);
  },
  { deep: true },
);

// Форматируем значение дорожного расхода для отображения с пробелами
const formattedValue = computed({
  get() {
    if (!roadExpense.value) return "";
    return new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 2,
    }).format(roadExpense.value);
  },
  set(val) {
    // Убираем пробелы и всё кроме цифр
    roadExpense.value = val.replace(/\s/g, "").replace(/[^\d]/g, "");
  },
});
</script>
