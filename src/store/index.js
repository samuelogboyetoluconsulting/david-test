import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default createStore({
  state() {
    return {
      currentValue: "0",
      previousValue: null,
      operation: null,
      result: null,
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
});
