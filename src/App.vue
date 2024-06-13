<template>
  <main
    class="w-full h-[100dvh] flex items-center justify-center bg-orange-900"
  >
    <div
      class="max-w-[600px] text-right text-wrap w-full mx-auto shadow-2xl drop-shadow-2xl text-3xl text-white p-[2px] bg-[rgba(50,30,0,0.8)]"
    >
      <display-value></display-value>
      <div class="grid grid-cols-4 w-full gap-[2px]">
        <base-button
          color="customGrey"
          label="AC"
          @click="handleClear"
        ></base-button>
        <base-button
          color="customGrey"
          label="+/-"
          @click="handleToggleMinus"
        ></base-button>
        <base-button
          color="customGrey"
          label="%"
          @click="handlePercent"
        ></base-button>
        <base-button
          color="customYellow"
          label="/"
          @click="handleOperator('/')"
        ></base-button>

        <base-button
          color="lighterGrey"
          label="7"
          @click="handleInput('7')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="8"
          @click="handleInput('8')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="9"
          @click="handleInput('9')"
        ></base-button>
        <base-button
          disable="previousValue"
          color="customYellow"
          label="&times;"
          @click="handleOperator('*')"
        ></base-button>

        <base-button
          color="lighterGrey"
          label="4"
          @click="handleInput('4')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="5"
          @click="handleInput('5')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="6"
          @click="handleInput('6')"
        ></base-button>
        <base-button
          color="customYellow"
          label="-"
          @click="handleOperator('-')"
        ></base-button>

        <base-button
          color="lighterGrey"
          label="1"
          @click="handleInput('1')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="2"
          @click="handleInput('2')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="3"
          @click="handleInput('3')"
        ></base-button>
        <base-button
          color="customYellow"
          label="+"
          @click="handleOperator('+')"
        ></base-button>

        <base-button
          color="lighterGrey"
          label="0"
          @click="handleInput('0')"
        ></base-button>
        <base-button
          color="lighterGrey"
          label="&dot;"
          @click="handleDecimal"
        ></base-button>
        <base-button
          color="customYellow"
          label="="
          @click="handleEqualsTo"
        ></base-button>
      </div>
    </div>
  </main>
</template>

<script setup>
import BaseButton from "./components/BaseButton.vue";
import DisplayValue from "./components/DisplayValue.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const currentValue = computed(() => {
  return store.getters.currentValue;
});
const previousValue = computed(() => {
  return store.getters.previousValue;
});

const operation = computed(() => {
  return store.getters.operation;
});

const result = computed(() => {
  return store.getters.result;
});

const handleInput = (value) => {
  if (currentValue.value === "0" || result.value !== null) {
    store.commit("setCurrentValue", value);
    store.commit("setResult", null);
  } else {
    store.commit("setCurrentValue", currentValue.value + value);
  }
};

const handleOperator = (operator) => {
  if (currentValue.value === "0") {
    store.commit("setPreviousValue", "0");
    store.commit("setOperation", operator);
    store.commit("setCurrentValue", "");
  } else if (previousValue.value === null) {
    store.commit("setPreviousValue", currentValue.value);
    store.commit("setOperation", operator);
    store.commit("setCurrentValue", "");
  } else if (operation.value !== null && currentValue.value === "") {
    store.commit("setOperation", operator);
  } else {
    store.dispatch("calculate");
    store.commit("setPreviousValue", result.value);
    store.commit("setOperation", operator);
    store.commit("setCurrentValue", "");
  }
};

const handlePercent = () => {
  store.commit("percent");
};
const handleEqualsTo = () => {
  if (currentValue.value !== null) {
    store.dispatch("calculate");
  }
};
const handleClear = () => {
  store.commit("resetValue");
};
const handleToggleMinus = () => {
  store.commit("negate");
};
const handleDecimal = () => {
  if (!currentValue.value.includes(".")) {
    store.commit("setCurrentValue", currentValue.value + ".");
  }
};
</script>
