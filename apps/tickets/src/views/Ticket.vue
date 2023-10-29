<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchTicketMessages, getTicket, updateTicket } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const route = useRoute();
const ticket = ref();
const ticketEdited = ref();
const messages = ref();
const ticketMenuOpened = ref();
const editTicketDialogOpen = ref(false);
const dialogEditLoading = ref(false);
const statusSelected = ref();
const users = ref();
const tr = ref();
let statusOptions = [
  {
    label: 'Lukket',
    options: [
      { label: 'Annulleret', open: 0, status: 0 },
      { label: 'Godkendt', open: 0, status: 1 },
      { label: 'Kan/vil ikke lave', open: 0, status: 2 }
    ]
  },
  {
    label: 'Åben',
    options: [
      { label: 'Oprettet', open: 1, status: 0 },
      { label: 'Startet', open: 1, status: 1 },
      { label: 'Skal testes', open: 1, status: 2 },
      { label: 'Venter', open: 1, status: 3 }
    ]
  }
];

const getFormattedTicketLabel = () => {
  const open = ticket?.value.open === 1 ? tr.value.tickets?.open?.da : tr.value.tickets?.closed?.da;
  const status =
    ticket.value.open === 1
      ? tr.value.tickets?.status?.open[ticket.value.status]?.da
      : tr.value.tickets?.status?.closed[ticket.value.status]?.da;

  return `${open} - ${status}`;
};

const updateTicketStatus = () => {
  ticketEdited.value = { ...ticketEdited.value, open: statusSelected.value.open, status: statusSelected.value.status };
};

const editTicket = async () => {
  dialogEditLoading.value = true;
  await updateTicket(ticketEdited.value).then(async () => {
    await getTicketInfo();
    editTicketDialogOpen.value = false;
    dialogEditLoading.value = false;
  });
};

const openTicketModal = () => {
  ticketEdited.value = { ...ticket.value };
  editTicketDialogOpen.value = true;
  statusSelected.value = statusOptions[ticket.value.open].options[ticket.value.status];
};

const getTicketInfo = async () =>
  await getTicket(route.params.id).then((response) => (ticket.value = response.tickets[route.params.id]));

const formIsInvalid = () => !ticketEdited.value.name || !ticketEdited.value.description || !ticketEdited.value.assignee;

const toggleMenuOpened = (event) => {
  ticketMenuOpened.value.toggle(event);
};

const items = ref([
  { label: 'New', icon: 'pi pi-fw pi-plus', command: () => openTicketModal() },
  { label: 'Delete', icon: 'pi pi-fw pi-trash' }
]);

onBeforeMount(async () => {
  await getTranslations().then((result) => (tr.value = result));
  users.value = Object.values(await getUserList());
  await getTicketInfo();
  await fetchTicketMessages(route.params.id).then((response) => (messages.value = response.messages));
});
</script>

<template>
  <RouterLink to="/" style="margin-bottom: 1rem; display: inline-flex">&larr; Tilbage </RouterLink>
  <Card v-if="users && ticket">
    <template #title>
      {{ ticket?.name }} <Chip class="chip" :label="getFormattedTicketLabel()" />

      <Button
        style="float: right"
        type="button"
        icon="pi pi-ellipsis-v"
        @click="toggleMenuOpened"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        rounded
      />
      <Menu ref="ticketMenuOpened" id="overlay_menu" :model="items" :popup="true" />
    </template>
    <template #content>
      <div style="display: flex">
        <div style="width: 100%">{{ ticket?.description ?? 'Ingen beskrivelse' }}</div>
        <div class="ticket-actions">
          <span>Oprettet:</span>
          <span>{{ ticket.created ? new Date(ticket.created * 1000).toLocaleString() : 'Ukendt' }}</span>
          <span>Ændret:</span>
          <span>{{ ticket.last_edit ? new Date(ticket.last_edit * 1000).toLocaleString() : '-' }} </span>
          <span>Prioritet:</span>
          <span>{{ tr?.tickets?.priority[ticket.priority].da ?? 'Ukendt' }}</span>
          <span>Oprettet af:</span>
          <span>{{ users.find((user) => user.id === ticket.creator).name ?? 'Ukendt' }}</span>
          <span>Udføres af:</span>
          <span>{{ users.find((user) => user.id === ticket.assignee).name ?? 'Ukendt' }}</span>
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

  <Dialog v-if="ticketEdited" v-model:visible="editTicketDialogOpen" modal class="newTicket">
    <template #header><h4>Rediger opgave</h4></template>
    <div style="display: grid; grid-template-columns: minmax(400px, 800px) minmax(150px, 300px); gap: 1rem">
      <div style="display: flex; flex-direction: column">
        <label class="help-text">Navn/Titel</label>
        <InputText v-model.trim="ticketEdited.name" required style="width: 400px" />

        <label class="help-text">Opgavebeskrivelse</label>
        <Textarea v-model.trim="ticketEdited.description" :autoResize="true" :rows="10" style="width: 100%" required />
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
        <label class="help-text">Status</label>
        <Dropdown
          class="status-select"
          v-model="statusSelected"
          :options="statusOptions"
          optionLabel="label"
          optionGroupLabel="label"
          optionGroupChildren="options"
          v-on:change="updateTicketStatus()"
        ></Dropdown>
        <label class="help-text">Kategori</label>
        <Dropdown
          v-model="ticketEdited.category"
          :options="tr.tickets.category.map((item, index) => ({ label: item.da, value: index }))"
          optionLabel="label"
          optionValue="value"
        />

        <label class="help-text">Prioritet</label>
        <Dropdown
          v-model="ticketEdited.priority"
          :options="tr.tickets.priority.map((item, index) => ({ label: item.da, value: index }))"
          optionLabel="label"
          optionValue="value"
        />

        <label class="help-text">Udføres af</label>
        <Dropdown
          v-model="ticketEdited.assignee"
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
        <Button label="Gem" raised :disabled="formIsInvalid()" @click="editTicket()" :loading="dialogEditLoading" />
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
  border-radius: 6px;
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

.help-text {
  font-size: 12px;
  color: #6c757d;
  margin-top: 0.5rem;
  cursor: default;
}
</style>
