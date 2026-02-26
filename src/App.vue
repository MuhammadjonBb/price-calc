<script setup>
import { ref, onMounted } from "vue";
import productList from "./components/productList.vue";
import Login from "./components/Login.vue";

const isAuth = ref(false);

onMounted(() => {
  isAuth.value = localStorage.getItem("auth") === "true";
});

const handleLoginSuccess = () => {
  isAuth.value = true;
};
</script>

<template>
  <Login v-if="!isAuth" @success="handleLoginSuccess" />
  <productList v-else />
</template>

<style scoped></style>
