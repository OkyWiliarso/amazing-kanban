<template>

  <div class="container is-fullhd">
    <a class="button is-dark" @click='modalIn'>New Task</a>
    <div :class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">

        <header class="modal-card-head">
          <p class="modal-card-title">New Task</p>
          <button class="delete" aria-label="close" @click='modalOut'></button>
        </header>

        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <p>Title:</p>
              <input class="input" type="text" v-model="newTitle" placeholder="Task title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <p>Description:</p>
              <textarea class="textarea" v-model="newDesc" placeholder="Description"></textarea>
            </div>
          </div>
        </section>

        <footer class="modal-card-foot">
          <button class="button is-dark" @click='addNewTask'>Add</button>
          <button class="button" @click='modalOut'>Cancel</button>
        </footer>
      </div>
    </div>

    <stages/>

  </div>
</template>

<script>
import { tasksRef } from '@/firebase'
import stages from '@/components/Stages.vue'

export default {
  name: 'home',
  data () {
    return {
      modal: 'modal',
      newTitle: '',
      newDesc: ''
    }
  },
  components: {
    stages
  },
  firebase: {
    firebaseTask: tasksRef
  },
  methods: {
    modalIn: function () {
      this.modal = 'modal is-active'
    },
    modalOut: function () {
      this.modal = 'modal'
    },
    addNewTask: function () {
      tasksRef.push({title: this.newTitle, description: this.newDesc, status: 'Back-log'})
      this.modal = 'modal'
      this.newTitle = ''
      this.newDesc = ''
    }
  },
  computed: {
    tasks: function () {
      return this.firebaseTask
    }
  }

}
</script>

<style>
  body {
    background-color: rgb(45, 243, 177);
  }
  .button {
    margin-bottom: 3%
  }
</style>

