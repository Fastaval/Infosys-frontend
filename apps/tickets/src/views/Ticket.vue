<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { MessageDetails, TicketDetails, getTicket, getTicketMessages } from '../services/tickets.service';

const route = useRoute();
const ticket: Ref<TicketDetails> = ref();
const messages: Ref<MessageDetails[]> = ref();

onBeforeMount(async () => {
  getTicket(route.params.id).then((response) => {
    const id = route.params.id as string;
    ticket.value = response.tickets[id];
  });
  getTicketMessages(route.params.id).then((response) => {
    messages.value = response.messages;
  });
});
</script>

<template>
  <RouterLink to="/">&larr; Tilbage til ticket listen</RouterLink>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ ticket?.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">ID: {{ ticket?.id }}</h6>
      <p class="card-text">
        {{ ticket?.description }}
      </p>
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">Kommentarer</h5>
      <p v-for="message of messages" :key="message.id" class="card-text">
        {{ message?.message }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
