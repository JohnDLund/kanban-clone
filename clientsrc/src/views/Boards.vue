<template>
  <div class="boards bg-beach">
    <h2>WELCOME TO THE BOARDS!!!</h2>
    <div class="row justify-content-center">
      <form class @submit.prevent="addBoard">
        <input
          class="form-control text-center text-capitalize"
          type="text"
          placeholder="title"
          v-model="newBoard.title"
          required
        />
        <input
          class="form-control text-center text-capitalize"
          type="text"
          placeholder="description"
          v-model="newBoard.description"
        />
        <button class="btn btn-outline-success mt-2" type="submit">Create Board</button>
      </form>
    </div>

    <div class="row">
      <div class="col-12 col-md-4 pr-0" v-for="board in boards" :boardData="board" :key="board.id">
        <div class="bg-transparent text-dark p-2 rounded border d-flex justify-content-between">
          <i
            class="fa fa-2x fa-pencil text-warning"
            data-toggle="modal"
            :data-target="'#editBoardModal' + board.id"
          ></i>
          <router-link :to="{name: 'board', params: {boardId: board.id}}">
            <h3 class="text-capitalize text-dark">
              <u>{{board.title}}</u>
            </h3>
            <h3 class="text-capitalize text-dark">{{board.description}}</h3>
          </router-link>
          <i class="fa fa-2x fa-trash-o text-danger" @click="removeBoard(board.id)"></i>
        </div>
        <div
          class="modal fade text-dark"
          :id="'editBoardModal' + board.id"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-capitalize..">Edit "{{board.title}}"</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="form" @submit.prevent="editBoard(board.id)">
                  <input
                    type="text"
                    class="form-control mb-2 text-capitalize"
                    placeholder="Edit list ..."
                    v-model="editedBoardObject.title"
                  />
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Save changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  props: ["boardData"],
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
      editedBoardObject: {},
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    removeBoard(id) {
      this.$store.dispatch("deleteBoard", id);
    },

    editBoard(id) {
      this.$store.dispatch("editBoard", {
        id: id,
        title: this.editedBoardObject.title,
        creatorEmail: this.user.email,
      });
      this.title = "";
      $("#editBoardModal" + id).modal("hide");
    },
  },
};
</script>
<style scoped>
.bg-beach {
  background-image: url("~@/assets/beach.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 90vh;
  background-position: center;
}
</style>