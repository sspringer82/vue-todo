import Vue from 'vue';

const initialState = { todos: [], error: null };

export const TOGGLE_DONE = 'TOGGLE_DONE';
export const TOGGLE_DONE_SUCCESS = 'TOGGLE_DONE_SUCCESS';
export const GET_TODOS = 'GET_TODOS';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const CREATE_TODO = 'CREATE_TODO';
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS';
export const CREATE_TODO_ERROR = 'CREATE_TODO_ERROR';

export default {
  namespaced: true,
  state: initialState,
  getters: {
    openTodos: state => state.todos.filter(todo => !todo.done),
    filter: state => query =>
      state.todos.filter(todo => todo.title.includes(query)),
    byId: state => id => state.todos.filter(todo => todo.id === id).pop(),
  },
  mutations: {
    [TOGGLE_DONE_SUCCESS](state, modifiedTodo) {
      const todo = state.todos.find(todo => todo.id === modifiedTodo.id);
      Vue.set(todo, 'done', modifiedTodo.done);
    },
    [GET_TODOS_SUCCESS](state, todos) {
      Vue.set(state, 'todos', todos);
    },
    [CREATE_TODO_SUCCESS](state, todo) {
      state.todos.push(todo);
      Vue.set(state, 'error', null);
    },
    [CREATE_TODO_ERROR](state, error) {
      Vue.set(state, 'error', error);
    },
  },
  actions: {
    async [GET_TODOS]({ commit }) {
      const response = await fetch('/todos');
      commit(GET_TODOS_SUCCESS, await response.json());
    },
    async [TOGGLE_DONE]({ commit }, todo) {
      const clone = { ...todo, done: !todo.done };
      const result = await fetch(`/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(clone),
      });
      commit(TOGGLE_DONE_SUCCESS, await result.json());
    },
    async [CREATE_TODO]({ commit }, todo) {
      try {
        const result = await fetch('/todos', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(todo),
        });
        if (result.status > 299) {
          commit(CREATE_TODO_ERROR, result.statusText);
        } else {
          commit(CREATE_TODO_SUCCESS, await result.json());
        }
      } catch (e) {
        commit(CREATE_TODO_ERROR, e);
      }
    },
  },
};
