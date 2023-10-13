<template>
  <div class="chat-window">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id">
        <span class="created-at">
          {{ doc.createdAt }} {{ $t('chat_window.ago') }}
        </span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUpdated } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import getCollection from '../composables/getCollection';

export default {
  setup() {
    const { documents, error } = getCollection('messages');
    
    const locale = ref(null);
    
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate(), { locale: locale.value });
          return { ...doc, createdAt: time };
        });
      }
    });
    
    // auto-scroll to bottom of messages
    const messages = ref(null);
    
    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages };
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
