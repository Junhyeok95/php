<template>
  <div class="w-1/5 border-r-2 border-solid border-gray-600">
    <div class="p-2 m-2 border-2 border-gray-600 text-center">UserList</div>
    <div
      v-for="user in usersWithoutSignedInUser"
      :key="user.id"
      class="p-2 border-b-2 border-gray-600 hover:bg-gray-300 cursor-pointer"
      @click="updateChatWith(user.id)"
    >{{user.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Number,
      required: true,
    },
  },
  computed: {
    usersWithoutSignedInUser() {
      // 자신 제외
      return this.users.filter((user) => user.id !== this.currentUser);
    },
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    axios
      .get("/api/users")
      .then((res) => {
        console.log(res);
        this.users = res.data.users;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    updateChatWith(userId) {
      this.$emit("updatedChatWith", userId); // 부모로 보내는 방법
    },
  },
};
</script>