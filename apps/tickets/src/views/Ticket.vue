<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { MessageDetails, TicketDetails, getTicket, getTicketMessages } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const route = useRoute();
const ticket: Ref<TicketDetails> = ref();
const messages: Ref<MessageDetails[]> = ref();
const users = ref();
const tr = ref();

const getTicketLabel = () => {
  const open = ticket?.value.open === 1 ? tr.value.tickets?.open?.da : tr.value.tickets?.closed?.da;
  const status =
    ticket.value.open === 1
      ? tr.value.tickets?.status?.open[ticket.value.status]?.da
      : tr.value.tickets?.status?.closed[ticket.value.status]?.da;

  return `${open} - ${status}`;
};

onBeforeMount(async () => {
  await getTranslations().then((result) => (tr.value = result));
  await getUserList().then((result) => (users.value = result));
  await getTicket(route.params.id).then((response) => (ticket.value = response.tickets[route.params.id as string]));
  await getTicketMessages(route.params.id).then((response) => (messages.value = response.messages));
});
</script>

<template>
  <RouterLink to="/">&larr; Tilbage til ticket listen</RouterLink>
  <Card class="card shadow mt-3" v-if="users && ticket">
    <template #title>
      {{ ticket?.name }}
      <Chip class="chip" :label="getTicketLabel()" />
    </template>
    <template #content>
      <div style="display: inline-flex">
        <div>{{ ticket?.description ?? 'Ingen beskrivelse' }}</div>
        <div class="ticket-actions">
          <span>Oprettet:</span>
          <span>{{ ticket.created ? new Date(ticket.created * 1000).toLocaleString() : 'Ukendt' }}</span>
          <span>Ændret:</span>
          <span>{{ ticket.last_edit ? new Date(ticket.last_edit * 1000).toLocaleString() : '-' }} </span>
          <span>Prioritet:</span>
          <span>{{ tr?.tickets?.priority[ticket.priority].da ?? 'Ukendt' }}</span>
          <span>Oprettet af:</span>
          <span>{{ users[ticket.creator]?.name ?? 'Ukendt' }}</span>
          <span>Udføres af:</span>
          <span>{{ users[ticket.assignee]?.name ?? 'Ukendt' }}</span>
        </div>
      </div>
    </template>
  </Card>
  <div class="card-body d-flex">
    <div class="ticket-body w-100">
      <div class="d-flex align-items-center pb-2">
        <h5 class="ps-3 mb-1"></h5>
      </div>
      <p></p>
      <div>
        <div class="card shadow-sm p-2 mt-3" v-for="message of messages?.slice().reverse()" :key="message.id">
          <span style="color: #ccc"
            >Oprettet: {{ new Date(message.posted * 1000).toLocaleString() }} | {{ users[message.user]?.name }}</span
          >
          <span>{{ message?.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-chip {
  font-size: 14px;

  .p-chip-text {
    line-height: 1.5;
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
  }
}
.ticket-actions {
  height: min-content;
  background-color: #eee;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(5, 32px);
  padding: 8px 16px;
  margin-left: 16px;

  :nth-child(2n-1) {
    font-weight: bold;
    white-space: nowrap;
  }

  :nth-child(2n) {
    white-space: nowrap;
    padding-left: 16px;
    text-align: right;
  }
}
</style>
