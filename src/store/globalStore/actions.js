export default {
  setCameFromValue(context, value) {
    context.commit("setCameFromValue", value);
  },

  setCurrentColor(context, value) {
    context.commit("setCurrentColor", value);
  },

  setRemainedSeconds(context, value) {
    context.commit("setRemainedSeconds", value);
  },
};
