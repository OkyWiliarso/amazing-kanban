<template>

  <div class="board">
    <div v-for='(title, index) in stageTitle' v-bind:key='index' id="stages" class="card">
      <header class="card-header">
        <p class="card-header-title"> {{ title }} </p>
      </header>
      <div class="card-content" v-for='(task, index) in tasks' v-bind:key='index'>
        <!-- card task -->
        <div class="card" v-if="task.status == title" id="task-card" >
          <header class="card-header">
            <p class="card-header-title"> {{ task.title }} </p>
          </header>
          <div class="card-content">
            <p> Description: </p><br>
            <p> {{ task.description }} </p>
            <br>
            <a class="button is-small is-danger is-outlined" @click="deleteTask(firebaseTask[index]['.key'])">Delete</a>
          </div>
          <footer class="card-footer">
            <a v-if="title != stageTitle[0]" href="#" @click="prevStage(firebaseTask[index]['.key'], title)" class="card-footer-item">Previous</a>
            <a v-if="title != stageTitle[3]" href="#" @click="nextStage(firebaseTask[index]['.key'], title)" class="card-footer-item">Next</a>
          </footer>
        </div>
        <!-- card task ends-->
      </div>
    </div>
  </div>

</template>

<script>
import swal from 'sweetalert2'
import { tasksRef } from '@/firebase'

export default {
  name: 'stages',
  data () {
    return {
      stageTitle: [ 'Back-log', 'To-do', 'Doing', 'Done' ]
    }
  },
  firebase: {
    firebaseTask: tasksRef
  },
  methods: {
    nextStage: function (key, title) {
      let stageIndex = this.stageTitle.indexOf(title)

      tasksRef.child(key).update({
        status: this.stageTitle[stageIndex + 1]
      })
    },
    prevStage: function (key, title) {
      let stageIndex = this.stageTitle.indexOf(title)

      tasksRef.child(key).update({
        status: this.stageTitle[stageIndex - 1]
      })
    },
    deleteTask: function (key) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          tasksRef.child(key).remove()
          swal(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )
        }
      })
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
  .board {
    width: 100%;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
  .card {
    border-radius: 15px;
    margin: 5px;
  }
  #task-card {
    border-radius: 10px;
  }
  #stages {
    width: 260px;
  }
</style>
