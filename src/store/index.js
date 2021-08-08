import { createStore } from "vuex";

import state from "./globalStore/state.js";
import mutations from "./globalStore/mutations.js";
import actions from "./globalStore/actions.js";
import getters from "./globalStore/getters.js";

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
