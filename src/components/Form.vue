<template>
  <form @submit.prevent="handleSubmit">
    <div class="formContainer">
      <div>
        <input
          autofocus
          id="title"
          name="title"
          type="text"
          v-model="title"
          placeholder="Neue Aufgabe erstellen"
        >
        <div v-if="$v.title.$invalid" class="errorContainer">
          <span v-if="$v.title.$dirty && !$v.title.required">Der Titel ist ein Pflichtfeld</span>
          <span v-if="!$v.title.maxLength">Maximal 40 Zeichen</span>
        </div>
      </div>
      <div>
        <select id="done" name="done" v-model="done">
          <option :value="false">offen</option>>
          <option :value="true">erledigt</option>>
        </select>
        <div v-if="$v.done.$invalid" class="errorContainer">
          <span v-if="$v.done.$dirty && !$v.done.required">Der Status ist ein Pflichtfeld</span>
        </div>
      </div>
      <button type="submit">OK</button>
    </div>
    <div class="errorContainer" v-if="error !== null">Es ist ein Fehler aufgetreten: {{error}}</div>
  </form>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

const { mapActions, mapState } = createNamespacedHelpers("todo");
import { CREATE_TODO } from "../todo";

export default {
  methods: {
    ...mapActions({ createTodo: CREATE_TODO }),
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.createTodo({
          title: this.title,
          done: this.done
        });
        this.title = "";
        this.done = false;
        this.$v.$reset();
      }
    }
  },
  data() {
    return {
      title: "",
      done: false
    };
  },
  computed: {
    ...mapState(["error"])
  },
  validations: {
    title: {
      required,
      maxLength: maxLength(40)
    },
    done: {
      required
    }
  }
};
</script>

<style scoped>
form {
  margin: 2px auto;
  line-height: 30px;
  padding: 10px;
  background-color: lightyellow;
  width: 378px;
  border: 1px solid darkgray;
}

.formContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.errorContainer {
  color: red;
}

input {
  height: 30px;
  width: 250px;
}

select {
  height: 36px;
}

button {
  height: 36px;
}
</style>
