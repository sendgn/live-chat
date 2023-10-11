<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id">
        <span class="created-at">{{ doc.createdAt }} ago</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import getCollection from '../composables/getCollection';

export default {
  setup() {
    const { documents, error } = getCollection('messages');

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

    return { error, documents, formattedDocuments };
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
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 300px;
  overflow: auto;
}
</style>
