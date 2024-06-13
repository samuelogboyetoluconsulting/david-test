import { shallowMount } from "@vue/test-utils";
import BaseButton from "@/components/BaseButton.vue";

const factory = (labelValue, colorValue) => {
  return shallowMount(BaseButton, {
    props: { label: labelValue, color: colorValue },
  });
};

describe(BaseButton.vue, () => {
  it("renders the buttons with the correct label and colorTwo", () => {
    const wrapper = factory("+", "customYellow");
    expect(wrapper.text()).toBe("+");
    expect(wrapper.classes()).toContain("bg-[#ff9f0c]");
    expect(wrapper.classes()).toContain("hover:bg-[#dd890d]");
    expect(wrapper.classes()).toContain("px-6");
    expect(wrapper.classes()).toContain("py-5");
  });

  it("renders the buttons with the correct label and colorThree", () => {
    const wrapper = factory("7", "lighterGrey");
    expect(wrapper.text()).toBe("7");
    expect(wrapper.classes()).toContain("bg-[#9c9286]");
    expect(wrapper.classes()).toContain("hover:bg-[#b2a9a0]");
    expect(wrapper.classes()).toContain("px-6");
    expect(wrapper.classes()).toContain("py-5");
  });

  it("emits a click event when button is clicked", async () => {
    const wrapper = factory("7", "lighterGrey");
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
});
