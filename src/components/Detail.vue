<template>
  <div>
    <div v-if="this.todo !== null">{{this.todo.title}}</div>
    <router-link tag="button" to="/list">zurück zur Liste</router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import { GET_TODOS } from "../todo";

const { mapGetters, mapActions, mapState } = createNamespacedHelpers("todo");

export default {
  data() {
    return {
      todo: null
    };
  },
  methods: {
    ...mapActions({ fetchTodos: GET_TODOS })
  },

  beforeRouteEnter(to, from, next) {
    next(async vm => {
      if (vm.todos.length === 0) {
        await vm.fetchTodos();
      }
      vm.todo = vm.byId(parseInt(to.params.id, 10));
    });
  },

  async beforeRouteUpdate(to, from, next) {
    this.todo = null;
    if (this.todos.length === 0) {
      await this.fetchTodos();
    }
    this.todo = this.byId(parseInt(to.params.id, 10));
    next();
  },

  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["byId"])
  }
};
</script>

<style scoped>
</style>