<template>
  <div class="w-1/5 border-r-2 border-solid border-gray-600">
    <div class="p-2 m-2 border-2 border-gray-600 text-center">UserList</div>
    <div
      v-for="user in users"
      :key="user.id"
      class="p-2 border-b-2 border-gray-600 hover:bg-gray-300"
    >{{user.name}}</div>
  </div>
</template>

<script>
export default {
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
};
</script>