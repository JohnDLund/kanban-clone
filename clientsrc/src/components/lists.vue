<template>
  <div dropzone="list" @dragover.prevent @drop.prevent="moveTask()">
    <div class="d-flex justify-content-between">
      <i
        class="fa fa-pencil text-warning"
        data-toggle="modal"
        :data-target="'#editListModal' + listData.id"
      ></i>

      <div
        class="modal fade text-dark"
        :id="'editListModal' + listData.id"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit "{{listData.title}}"</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form" @submit.prevent="editList">
                <input
                  type="text"
                  class="form-control mb-2"
                  placeholder="Edit list ..."
                  v-model="editedListObject.title"
                />
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <i class="fa fa-trash-o text-danger" @click="removeList"></i>
    </div>
    <h4 class="lists p-2 text-capitalize">
      <u>{{listData.title}}</u>
    </h4>
    <tasks
      class="rounded border border-warning bg-secondary text-white m-2"
      v-for="task in tasks"
      :taskData="task"
      :listId="listData.id"
      :key="task.id"
      draggable="true"
    ></tasks>
    <div class="input-group my-4 d-flex justify-content-center">
      <div class="input-group-prepend"></div>
      <form @submit="createTask">
        <input
          type="text"
          class="form-control text-capitalize"
          placeholder="Enter New Task ..."
          v-model="newTaskObject.title"
        />
      </form>
    </div>
  </div>
</template>


<script>
import tasks from "../components/tasks";
export default {
  name: "lists",
  props: ["listData"],
  data() {
    return {
      editedListObject: {},
      newTaskObject: {},
    };
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listData.id);
  },

  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    },
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    moveTask() {
      let task = JSON.parse(event.dataTransfer.getData("data"));
      let moveData = {
        oldListId: event.dataTransfer.getData("list"),
        taskToMove: task,
        newListId: this.listData.id,
      };
      console.log(moveData);
      this.$store.dispatch("moveTask", moveData);
    },
    removeList() {
      this.$store.dispatch("deleteList", this.listData);
    },

    editList() {
      this.$store.dispatch("editList", {
        id: this.listData.id,
        title: this.editedListObject.title,
        boardId: this.listData.boardId,
        creatorEmail: this.user.email,
      });
      $("#editListModal" + this.listData.id).modal("hide");
    },
    createTask() {
      this.$store.dispatch("createTask", {
        title: this.newTaskObject.title,
        listId: this.listData.id,
        creatorEmail: this.user.email,
      });
      this.newTaskObject.title = "";
    },
  },

  components: {
    tasks,
  },
};
</script>


<style scoped>
</style>