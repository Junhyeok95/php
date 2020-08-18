<template>
  <div class="flex-1">
    <div>{{ message.from.name }} {{ message.created_at }}</div>
    <div>{{ message.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>
