export default {
  setCurrentValue(state, value) {
    state.currentValue = value;
  },
  setPreviousValue(state, value) {
    state.previousValue = value;
  },
  setOperation(state, value) {
    state.operation = value;
  },
  setResult(state, value) {
    state.result = value;
  },
  resetValue(state) {
    state.currentValue = "0";
    state.previousValue = null;
    state.operation = null;
    state.result = null;
  },
  negate(state) {
    const value = parseFloat(state.currentValue);
    state.currentValue = (-value).toString();
  },
  percent(state) {
    const value = parseFloat(state.currentValue);
    state.currentValue = (value / 100).toString();
  },
};
