import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const initialState = { todos: [] };

export const TOGGLE_DONE = 'TOGGLE_DONE';
export const TOGGLE_DONE_SUCCESS = 'TOGGLE_DONE_SUCCESS';
export const GET_TODOS = 'GET_TODOS';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';

export default new Vuex.Store({
  state: initialState,
  getters: {
    openTodos: state => state.todos.filter(todo => !todo.done),
    filter: state => query =>
      state.todos.filter(todo => todo.title.includes(query)),
  },
  mutations: {
    [TOGGLE_DONE_SUCCESS](state, modifiedTodo) {
      const todo = state.todos.find(todo => todo.id === modifiedTodo.id);
      Vue.set(todo, 'done', modifiedTodo.done);
    },
    [GET_TODOS_SUCCESS](state, todos) {
      Vue.set(state, 'todos', todos);
    },
  },
  actions: {
    async [GET_TODOS]({ commit }) {
      const response = await fetch('/todos');
      commit(GET_TODOS_SUCCESS, await response.json());
    },
    async [TOGGLE_DONE]({ commit }, todo) {
      const clone = { ...todo, done: !todo.done };
      await fetch(`/todos/${todo.id}`, {
        method: 'PUT',
        body: JSON.stringify(clone),
      });
      commit(GET_TODOS_SUCCESS, clone);
    },
  },
});
