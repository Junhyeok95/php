<template>
  <div class="flex h-full">
    <ChatUserList
      :current-user="currentUser"
      @updatedChatWith="updatedChatWith"
      @deletedChatWith="deletedChatWith"
    />

    <div v-if="chatWith" class="w-4/5 flex flex-col">
      <ChatArea :chat-id="chatWith" />
      <div class="flex-initial p-2">
        <input
          class="border-2 border-solid rounded border-gray-600 w-full p-3"
          type="text"
          v-model="text"
          @keyup.enter="submit"
        />
      </div>
    </div>
    <div v-else class="p-3">채팅 상대를 선택해주세요</div>
  </div>
</template>


<script>
import ChatUserList from "./ChatUserList";
import ChatArea from "./ChatArea";
export default {
  props: {
    currentUser: {
      // layouts 파일 -> :current-user="{{ auth()->id() }}"
      type: Number,
      required: true,
    },
  },
  components: {
    ChatUserList,
    ChatArea,
  },
  data() {
    return {
      chatWith: null,
      text: "",
    };
  },
  mounted() {
    console.log("Component mounted.");
  },
  methods: {
    updatedChatWith(value) {
      this.chatWith = value; // null 을 선택하면 변경하도록
      console.log("채팅상대 : ", value);
    },
    deletedChatWith() {
      this.chatWith = null;
      console.log("채팅상대 : null");
    },
    submit() {
      console.log("haha");
      if (this.text) {
        axios.post("/api/messages", {
          message: this.text,
          to: this.chatWith,
          from: this.currentUser,
        });
      }
    },
  },
};
</script>
