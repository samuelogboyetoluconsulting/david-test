import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import DisplayValue from "@/components/DisplayValue.vue";
import BaseButton from "@/components/BaseButton.vue";
import store from "@/store";

describe("App.vue", () => {
  it("renders the display component", () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.findComponent(DisplayValue).exists()).toBeTruthy();
  });

  it("render the button components", () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [store],
      },
    });
    const buttonComponents = wrapper.findAllComponents(BaseButton);
    expect(wrapper.findComponent(BaseButton).exists()).toBeTruthy();
    expect(buttonComponents).toHaveLength(19);
  });

  it("handles button clicks correctly", async () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [store],
      },
    });
    const sevenButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "7");
    await sevenButton[0].trigger("click");
    expect(store.state.currentValue).toBe("7");

    const plusButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "+");
    await plusButton[0].trigger("click");
    expect(store.state.previousValue).toBe("7");
    expect(store.state.operation).toBe("+");
    expect(store.state.currentValue).toBe("");

    const threeButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "3");
    await threeButton[0].trigger("click");
    expect(store.state.currentValue).toBe("3");

    const equalsButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "=");
    await equalsButton[0].trigger("click");
    expect(store.state.result).toBe(10);

    const clearButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "AC");

    await clearButton[0].trigger("click");
    expect(store.state.currentValue).toBe("0");
    expect(store.state.previousValue).toBe(null);
    expect(store.state.operation).toBe(null);
    expect(store.state.result).toBe(null);

    const inverseButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "+/-");

    store.state.currentValue = "5";

    await inverseButton[0].trigger("click");
    await inverseButton[[0][0]].trigger("click");
    expect(store.state.currentValue.includes("-")).toBeFalsy();

    const percentButton = wrapper
      .findAllComponents(BaseButton)
      .filter((b) => b.props("label") === "%");
    store.state.currentValue = "100";

    await percentButton[0].trigger("click");
    expect(store.state.currentValue).toBe("1");
  });
});
