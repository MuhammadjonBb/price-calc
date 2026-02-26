<script setup>
import { ref, onMounted } from "vue";
import productList from "./components/productList.vue";
import Login from "./components/Login.vue";

const isAuth = ref(false);
let logoutTimer = null;

// 🚪 logout функция
const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("expiresAt");
  isAuth.value = false;

  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
  }
};

// запуск таймера до авто-logout
const startLogoutTimer = (expiresAt) => {
  const timeLeft = Number(expiresAt) - Date.now();

  if (timeLeft <= 0) {
    logout();
    return;
  }

  logoutTimer = setTimeout(() => {
    logout();
  }, timeLeft);
};

// 🔍 проверка сессии при загрузке
onMounted(() => {
  const auth = localStorage.getItem("auth");
  const expiresAt = localStorage.getItem("expiresAt");

  if (!auth || !expiresAt) {
    isAuth.value = false;
    return;
  }

  if (Date.now() > Number(expiresAt)) {
    logout();
  } else {
    isAuth.value = true;
    startLogoutTimer(expiresAt);
  }
});

// 🎉 после успешного логина
const handleLoginSuccess = () => {
  const expiresAt = localStorage.getItem("expiresAt");
  isAuth.value = true;

  if (expiresAt) {
    startLogoutTimer(expiresAt);
  }
};
</script>

<template>
  <Login v-if="!isAuth" @success="handleLoginSuccess" />
  <productList v-else />
</template>

<style scoped></style>
