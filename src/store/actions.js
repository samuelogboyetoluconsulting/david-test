export default {
  calculate(context) {
    if (
      context.getters.previousValue !== null &&
      context.getters.operation !== null &&
      context.getters.currentValue !== null
    ) {
      const previous = parseFloat(context.getters.previousValue);
      const current = parseFloat(context.getters.currentValue);
      let result = null;

      switch (context.getters.operation) {
        case "+":
          result = previous + current;
          break;
        case "-":
          result = previous - current;
          break;
        case "*":
          result = previous * current;
          break;
        case "/":
          result = previous / current;
          break;
      }

      context.commit("setResult", result);
      context.commit("setPreviousValue", null);
      context.commit("setOperation", null);
      context.commit("setCurrentValue", result.toString());
    }
  },
};
