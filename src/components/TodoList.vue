<template>
  <div>
    <Button v-on:click="toggleFilter()">Filter</Button>
    <ul>
      <TodoListItem v-for="todo in getTodos()" v-bind:todo="todo" v-bind:key="todo.id"></TodoListItem>
    </ul>
    <Form/>
  </div>
</template>


<script>
import TodoListItem from "./TodoListItem.vue";
import Form from "./Form.vue";
import { createNamespacedHelpers } from "vuex";

import { GET_TODOS } from "../todo";

const { mapState, mapGetters, mapActions } = createNamespacedHelpers("todo");

export default {
  name: "TodoList",
  components: { TodoListItem, Form },
  data() {
    return {
      showOnlyOpen: false
    };
  },
  methods: {
    toggleFilter() {
      this.showOnlyOpen = !this.showOnlyOpen;
    },
    getTodos() {
      return this.showOnlyOpen ? this.openTodos : this.todos;
    },
    ...mapActions({ fetchTodos: GET_TODOS })
  },
  computed: {
    ...mapState(["todos"]),
    ...mapGetters(["openTodos"])
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
  width: 400px;
  margin: 0 auto;
}
</style>

