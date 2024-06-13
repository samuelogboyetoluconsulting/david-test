<template>
  <div
    class="bg-transparent w-full text-right text-6xl p-4 overflow-scroll whitespace-normal break-words text-wrap"
  >
    {{ displayCurrentOperation }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const currentValue = computed(() => store.getters.currentValue);
const previousValue = computed(() => store.getters.previousValue);
const operation = computed(() => store.getters.operation);
const displayCurrentOperation = computed(() => {
  if (!previousValue.value) {
    return currentValue.value;
  } else if (!operation.value && !currentValue.value) {
    return `${previousValue.value} ${operation.value}`;
  } else {
    return `${previousValue.value}${operation.value}${currentValue.value}`;
  }
});
</script>
