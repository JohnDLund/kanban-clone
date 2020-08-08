<template>
  <div @dragstart="moveTask()">
    <div class="tasks d-flex justify-content-between p-2">
      <i
        class="fa fa-pencil text-warning"
        data-toggle="modal"
        :data-target="'#editTaskModal' + taskData.id"
      ></i>

      <div
        class="modal fade text-dark"
        :id="'editTaskModal' + taskData.id"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit "{{taskData.title}}"</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form" @submit.prevent="editTask">
                <input
                  type="text"
                  class="form-control mb-2"
                  placeholder="Edit list ..."
                  v-model="editedTaskObject.title"
                />
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h5
        @click="commentsClicked = !commentsClicked"
        class="text-capitalize"
        data-toggle="tooltip"
        data-placement="top"
        title="Click to show/hide Comments"
      >{{taskData.title}}</h5>
      <i class="fa fa-trash-o text-danger" @click="deleteTask"></i>
    </div>
    <div v-if="commentsClicked">
      <comment
        v-for="comment in comments"
        :commentData="comment"
        :taskId="taskData.id"
        :listId="taskData.listId"
        :key="comment.id"
      ></comment>
      <div class="input-group my-4 d-flex justify-content-center">
        <div class="input-group-prepend"></div>
        <form @submit.prevent="createComment">
          <input
            type="text"
            class="form-control text-capitalize"
            placeholder="Enter New Comment ..."
            v-model="newCommentObject.comment"
          />
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import comment from "../components/comment";
export default {
  mounted() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  name: "tasks",
  props: ["taskData", "listId"],
  data() {
    return {
      commentsClicked: false,
      editedTaskObject: {},
      newCommentObject: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    comments() {
      return this.taskData.comments;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    moveTask() {
      event.dataTransfer.setData("data", JSON.stringify(this.taskData));
      event.dataTransfer.setData("list", this.listId);
    },
    // changeList(listId) {
    //   this.$store.dispatch("changeList", {
    //     listId: listId,
    //     oldId: this.taskData.listId,
    //     taskId: this.taskData.id,
    //   });
    // },

    createComment() {
      this.$store.dispatch("createComment", {
        comment: this.newCommentObject.comment,
        user: this.user.name,
        taskId: this.taskData.id,
        listId: this.taskData.listId,
      });
      this.newCommentObject.comment = "";
    },

    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    editTask() {
      this.$store.dispatch("editTask", {
        id: this.taskData.id,
        title: this.editedTaskObject.title,
        listId: this.taskData.listId,
        creatorEmail: this.user.email,
      });
      $("#editTaskModal" + this.taskData.id).modal("hide");
    },
  },
  components: {
    comment,
  },
};
</script>


<style scoped>
</style>