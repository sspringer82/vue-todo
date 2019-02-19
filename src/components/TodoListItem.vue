<template>
  <li v-bind:class="todo.done ? 'done' : 'open'">
    <span @click="goToDetails()">{{todo.title}}</span>
    <span class="status" v-if="todo.done" v-on:click="toggleDone(todo)">✔</span>
    <span class="status" v-else @click="toggleDone(todo)">✘</span>
  </li>
</template>

<script>
import { TOGGLE_DONE } from "../todo";
import { createNamespacedHelpers } from "vuex";
import router from "../router";

const { mapActions } = createNamespacedHelpers("todo");

export default {
  props: ["todo"],
  methods: {
    ...mapActions({ toggleDone: TOGGLE_DONE }),
    goToDetails() {
      router.push(`/details/${this.todo.id}`);
    }
  }
};
</script>

<style scoped>
li {
  line-height: 30px;
  border: 1px solid darkgray;
  padding: 10px;
  margin: 2px 0;
  position: relative;
}
span.status {
  position: absolute;
  right: 10px;
}

.done {
  background-color: lightgreen;
}

.open {
  background-color: lightsalmon;
}
</style>
