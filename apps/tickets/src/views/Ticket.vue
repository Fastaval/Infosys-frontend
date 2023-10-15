<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { MessageDetails, TicketDetails, getTicket, getTicketMessages, updateTicket } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const route = useRoute();
const ticket: Ref<TicketDetails> = ref();
const messages: Ref<MessageDetails[]> = ref();
const editTicketDialogOpen = ref(false);
const users = ref();
const tr = ref();

const getFormattedTicketLabel = () => {
  const open = ticket?.value.open === 1 ? tr.value.tickets?.open?.da : tr.value.tickets?.closed?.da;
  const status =
    ticket.value.open === 1
      ? tr.value.tickets?.status?.open[ticket.value.status]?.da
      : tr.value.tickets?.status?.closed[ticket.value.status]?.da;

  return `${open} - ${status}`;
};

const editTicket = async () => {
  await updateTicket(ticket.value).then(async () => await getTicketInfo());
};

const getTicketInfo = async () =>
  await getTicket(route.params.id).then((response) => (ticket.value = response.tickets[route.params.id as string]));

const formIsInvalid = () => !ticket.value.name || !ticket.value.description || !ticket.value.assignee;

onBeforeMount(async () => {
  await getTranslations().then((result) => (tr.value = result));
  await getUserList().then((result) => (users.value = result));
  await getTicketInfo();
  await getTicketMessages(route.params.id).then((response) => (messages.value = response.messages));
});
</script>

<template>
  <RouterLink to="/">&larr; Tilbage til ticket listen</RouterLink>
  <Card class="card shadow mt-3" v-if="users && ticket">
    <template #title>
      {{ ticket?.name }}
      <Chip class="chip" :label="getFormattedTicketLabel()" />
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

  <Dialog v-model:visible="editTicketDialogOpen" modal class="newTicket">
    <template #header><h4>Opret opgave</h4></template>
    <div style="display: grid; grid-template-columns: minmax(400px, 800px) 1fr; gap: 1rem">
      <div style="display: flex; flex-direction: column">
        <label class="help-text">Navn/Titel</label>
        <InputText v-model.trim="ticket.name" required style="width: 400px" />

        <label class="help-text">Opgavebeskrivelse</label>
        <Textarea v-model.trim="ticket.description" :autoResize="true" :rows="10" style="width: 100%" required />
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          background-color: #eee;
          padding: 1rem;
          height: min-content;
          padding-bottom: 1.5rem;
          border-radius: 4px;
        "
      >
        <label class="help-text">Kategori</label>
        <Dropdown
          v-model="ticket.category"
          :options="tr.tickets.category.map((item, index) => ({ label: item.da, value: index }))"
          optionLabel="label"
          optionValue="value"
        />

        <label class="help-text">Prioritet</label>
        <Dropdown
          v-model="ticket.priority"
          :options="tr.tickets.priority.map((item, index) => ({ label: item.da, value: index }))"
          optionLabel="label"
          optionValue="value"
        />

        <label class="help-text">Udføres af</label>
        <Dropdown
          v-model="ticket.assignee"
          :options="users"
          :resetFilterOnHide="true"
          optionLabel="name"
          optionValue="id"
          filter
        />
      </div>
    </div>

    <template #footer>
      <div style="display: inline-flex; gap: 1rem">
        <Button severity="info" text label="Luk" icon="pi pi-times" @click="editTicketDialogOpen = false" />
        <Button label="Opret opgave" raised :disabled="formIsInvalid()" @click="editTicket()" />
      </div>
    </template>
  </Dialog>
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
