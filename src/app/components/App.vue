<template>
  <div>
    <nav class="nabvar navbar-dark bg-dark">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container mt-5">
      <div class="row pt-4">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTasks">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Inserte a task"
                    class="form-control"
                    v-model="task.title"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    cols="30"
                    rows="10"
                    placeholder="Insert a description"
                    class="form-control"
                    v-model="task.description"
                  ></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.title">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button class="btn btn-danger" @click="deleteTask(task._id)">
                    Delete
                  </button>
                  <button class="btn btn-secondary" @click="editTask(task._id)">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      tasksToEdit: "",
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          this.tasks = data;
        });
    },
    sendTasks() {
      if (this.edit === false) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getTasks();
          });
      } else {
        fetch(`/api/tasks/${this.tasksToEdit}`, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getTasks();
            this.edit = false;
          });
      }
      this.task = new Task();
    },
    deleteTask(id) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.getTasks();
        });
    },
    editTask(id) {
      this.edit = true;
      fetch(`/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          this.task = new Task(data.title, data.description);
          this.tasksToEdit = data._id;
        });
    },
  },
};
</script>

<style scoped>
</style>