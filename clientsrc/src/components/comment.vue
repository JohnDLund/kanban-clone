<template>
  <div class="comment">
    <div
      class="card border border-secondary rounded shadow m-1"
      style="overflow:auto display:block; border-bottom:solid 1px black"
    >
      <div class="card-body border border-danger bg-secondary text-wrap text-capitalize">
        {{commentData.user}}: {{commentData.comment}}
        <i
          class="fa fa-trash-o text-danger"
          @click="deleteComment"
        ></i>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentData", "taskId", "listId"],

  data() {
    return {};
  },
  computed: {
    user() {},
  },
  methods: {
    deleteComment() {
      this.$store.dispatch("deleteComment", {
        body: this.commentData,
        id: this.commentData._id,
        taskId: this.taskId,
        listId: this.listId,
      });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>