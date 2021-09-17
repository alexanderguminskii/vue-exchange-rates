import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selected: [],
    courses: [],
  },
  getters: {
    GET_SELECTED: (state) => {
      return state.selected;
    },
    GET_COURSES: (state) => {
      return state.courses;
    },
  },
  mutations: {
    ADD_SELECTED(state, payload) {
      state.selected = payload;
    },
    ADD_COURSES(state, payload) {
      state.courses = payload;
    },
  },
  actions: {},
});
