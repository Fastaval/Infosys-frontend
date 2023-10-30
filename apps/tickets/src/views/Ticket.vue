<script setup>
import { onBeforeMount, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchTicketMessages, getTicket, updateTicket, updateTicketMessage } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const route = useRoute();
const loggedInUser = ref();
const ticket = ref();
const ticketEdited = ref();
const messageEdited = ref();
const messages = ref();
const editTicketDialogOpen = ref(false);
const editMessageDialogOpen = ref(false);
const editMessageDialogType = ref('new');
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

const getTicketStatus = () => {
  const openText = ticket?.value.open === 1 ? tr.value.tickets?.open?.da : tr.value.tickets?.closed?.da;
  const statusText =
    ticket.value.open === 1
      ? tr.value.tickets?.status?.open[ticket.value.status]?.da
      : tr.value.tickets?.status?.closed[ticket.value.status]?.da;

  const severity = ticket.value.open === 1 ? 'success' : 'secondary';

  return { pt: { root: { class: `p-badge p-badge-${severity}` } }, label: `${openText} - ${statusText}` };
};

const getTicketCategory = () => ({
  pt: { root: { class: 'p-badge p-badge-info' } },
  label: tr.value.tickets.category[ticket.value.category].da
});

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

const editMessage = async () => {
  dialogEditLoading.value = true;
  await updateTicketMessage(messageEdited.value).then(async () => {
    await getTicketMessages();
    editMessageDialogOpen.value = false;
    dialogEditLoading.value = false;
  });
};

const openTicketModal = () => {
  ticketEdited.value = { ...ticket.value };
  editTicketDialogOpen.value = true;
  statusSelected.value = statusOptions[ticket.value.open].options[ticket.value.status];
};

const openMessageModal = (message) => {
  messageEdited.value = { ...message, ticket: ticket.value.id };
  editMessageDialogType.value = !message ? 'new' : 'edit';
  editMessageDialogOpen.value = true;
};

const getTicketInfo = async () =>
  await getTicket(route.params.id).then((response) => (ticket.value = response.tickets[route.params.id]));

const getTicketMessages = async () =>
  await fetchTicketMessages(ticket.value.id).then((response) => (messages.value = response.messages));

const ticketFormIsInvalid = () =>
  !ticketEdited.value.name || !ticketEdited.value.description || !ticketEdited.value.assignee;

const messageFormIsInvalid = () => !messageEdited.value;

const getUsername = (id) => users.value.find((user) => user.id === id).name;

const getFormattedDate = (date) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium' })
    .format(new Date(date * 1000))
    .replace(',', '');

onBeforeMount(async () => {
  await getTranslations().then((result) => (tr.value = result));
  users.value = Object.values(await getUserList());
  await getTicketInfo();
  await getTicketMessages();
});

onUpdated(async () => (loggedInUser.value = window?.infosys?.user_id));
</script>

<template>
  <RouterLink to="/" style="margin-bottom: 1rem; display: inline-flex">&larr; Tilbage </RouterLink>
  <Card v-if="users && ticket">
    <template #title>
      {{ ticket?.name }}
      <Chip v-bind="getTicketStatus()" />
      <Chip v-bind="getTicketCategory()" />
      <div style="display: flex; float: right; gap: 1rem">
        <Button
          icon="pi pi-file-edit"
          @click="openTicketModal()"
          outlined
          raised
          rounded
          severity="secondary"
          size="small"
          v-tooltip.top="'Rediger opgave'"
        />
        <Button
          icon="pi pi-comment"
          raised
          rounded
          size="small"
          @click="openMessageModal()"
          v-tooltip.top="'Ny besked'"
        />
      </div>
    </template>
    <template #content>
      <div style="display: flex">
        <div style="width: 100%">{{ ticket?.description ?? 'Ingen beskrivelse' }}</div>
        <div class="ticket-details">
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
  <Timeline :value="messages" style="padding-top: 1rem">
    <template #opposite="prop">
      <small class="p-text-secondary">
        {{ getUsername(prop.item.user) }} | {{ getFormattedDate(prop.item.posted) }}
      </small>
    </template>
    <template #marker="prop">
      <Button
        v-if="prop.item.user === loggedInUser"
        class="timeline-btn"
        icon="pi pi-file-edit"
        raised
        rounded
        size="small"
        @click="openMessageModal(prop.item)"
        v-tooltip.top="'Rediger din besked'"
      />
    </template>
    <template #content="prop"> {{ prop.item.message }} </template>
  </Timeline>

  <Dialog v-if="ticketEdited" v-model:visible="editTicketDialogOpen" modal>
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
        <Button
          label="Gem"
          raised
          :disabled="ticketFormIsInvalid()"
          @click="editTicket()"
          :loading="dialogEditLoading"
        />
      </div>
    </template>
  </Dialog>
  <Dialog v-model:visible="editMessageDialogOpen" modal style="width: 100%; max-width: 750px; margin: 0 10px">
    <template #header>
      <h4>{{ editMessageDialogType === 'new' ? 'Ny besked' : 'Rediger besked' }}</h4>
    </template>
    <label class="help-text">Besked</label>
    <Textarea v-model.trim="messageEdited.message" :autoResize="true" :rows="10" style="width: 100%" required />
    <template #footer>
      <div style="display: inline-flex; gap: 1rem">
        <Button severity="info" text label="Luk" icon="pi pi-times" @click="editMessageDialogOpen = false" />
        <Button
          label="Gem"
          raised
          :disabled="messageFormIsInvalid()"
          @click="editMessage"
          :loading="dialogEditLoading"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.success {
  background-color: red;
}

.ticket-details {
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

.p-button-sm {
  font-size: 12.25px;
  line-height: 15px;
  padding: 9px 15px;
  align-items: center;
  &.p-button-icon-only {
    width: 2.5rem;
    height: 2.5rem;
  }
  &.timeline-btn {
    width: 30px;
    height: 30px;
    left: -3px;
    margin: 3px 0;
    position: relative;
  }
}

:deep(.p-button-sm + .p-timeline-event-connector) {
  margin-left: -6px;
}

:deep(.p-timeline-event) {
  min-height: unset;
}

:deep(.p-timeline-event-content) {
  flex: 2;
  padding-bottom: 30px;
}

:deep(.p-timeline-event-marker) {
  margin: 3px 0;
}
</style>
