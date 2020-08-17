<template>
  <div class="flex-1">
    <p>chatting with user {{ chatId }}</p>
    <div>mesaages</div>
    <div>mesaages</div>
    <div>mesaages</div>
    <div>mesaages</div>
    <div>mesaages</div>
  </div>
</template>

<script>
export default {
  props: {
    chatId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {},
};
</script>