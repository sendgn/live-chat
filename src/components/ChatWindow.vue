<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages">
      <div v-for="doc in documents" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt.toDate() }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection';

export default {
  setup() {
    const { documents, error } = getCollection('messages');

    return { documents, error };
  }
}
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.single {
  margin: 18px 0;
}
.single:last-child {
  margin-bottom: 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>