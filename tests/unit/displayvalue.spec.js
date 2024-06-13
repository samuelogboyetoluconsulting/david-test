import DisplayValue from "@/components/DisplayValue.vue";
import store from "@/store";
import { shallowMount } from "@vue/test-utils";

const factory = () => {
  return shallowMount(DisplayValue, {
    global: {
      plugins: [store],
    },
  });
};

describe(DisplayValue.vue, () => {
  it("render the current value and operation correctly", () => {
    store.state.currentValue = "5";
    store.state.previousValue = "3";
    store.state.operation = "+";
    const wrapper = factory();
    expect(wrapper.text()).toContain("3+5");
  });

  it("renders the result correctly", () => {
    store.state.result = "3+5";
    const wrapper = factory();
    expect(wrapper.text()).toContain("3+5");
  });
});
