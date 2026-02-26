<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4">
    <!-- Card -->
    <div
      class="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 transition-all duration-300"
    >
      <!-- Title -->
      <h1
        class="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6 sm:mb-8"
      >
        Вход
      </h1>

      <!-- Input -->
      <div class="space-y-4">
        <div class="flex justify-between items-center gap-2">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Введите пароль"
            @keyup.enter="handleLogin"
            class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
          />
          <button
            @click="showPassword = !showPassword"
            class="text-sm text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none"
          >
            <div class="w-10 h-10 flex items-center justify-center">
              <img
                v-show="showPassword"
                src="../assets/img/eye-hidepassword.svg"
                alt="Показать"
              />
              <img
                v-show="!showPassword"
                src="../assets/img/eye-showpassword.svg"
                alt="Скрыть"
              />
            </div>
          </button>
        </div>

        <!-- Button -->
        <button
          @click="handleLogin"
          class="w-full bg-black text-white py-3 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 active:scale-[0.98] transition duration-200 cursor-pointer"
        >
          Войти
        </button>
      </div>

      <!-- Error -->
      <p
        v-if="error"
        class="text-red-500 text-sm text-center mt-4 animate-pulse"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const password = ref("");
const error = ref("");
const emit = defineEmits(["success"]);
const showPassword = ref(false);

const SAVED_HASH = import.meta.env.VITE_APP_PASSWORD_HASH;

async function hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const sessionDuration = 30 * 60 * 1000; // 30 минут
const expiresAt = Date.now() + sessionDuration;

const handleLogin = async (e) => {
  e.preventDefault();
  const hashedInput = await hash(password.value);

  if (hashedInput === SAVED_HASH) {
    localStorage.setItem("auth", "true");
    localStorage.setItem("expiresAt", expiresAt.toString());
    emit("success");
  } else {
    error.value = "Неверный пароль";
  }
};
</script>
