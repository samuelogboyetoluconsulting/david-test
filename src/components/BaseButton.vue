<template>
  <button
    :class="`${color === 'customGrey' && colorOne} ${
      color === 'customYellow' && colorTwo
    } ${color === 'lighterGrey' && colorThree} ${
      label === '0' ? 'col-[1/3]' : 'px-6 py-5'
    }`"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
const colorOne = ref("bg-[#7b6e5e] hover:bg-[#9c9286]");
const colorTwo = ref("bg-[#ff9f0c] hover:bg-[#dd890d]");
const colorThree = ref("bg-[#9c9286] hover:bg-[#b2a9a0]");
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["click"]);

const handleClick = () => {
  emits("click", props.value);
};
</script>
