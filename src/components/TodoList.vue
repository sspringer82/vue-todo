<template>
  <ul>
    <TodoListItem v-for="todo in todos" v-bind:todo="todo" 
     v-bind:key="todo.id"></TodoListItem>
  </ul>
</template>


<script>
import TodoListItem from './TodoListItem.vue';

export default {
  name: 'TodoList',
  components: { TodoListItem },
  data() {
    return {
      todos: [
        { id: 1, title: 'Get up', done: true },
        { id: 2, title: 'Eat', done: true },
        { id: 3, title: 'Sleep', done: false },
      ],
    };
  },
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

