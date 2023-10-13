<script setup>
import { onBeforeMount, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { fetchTickets } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const router = useRouter();
const tickets = ref();
const filteredTickets = ref();
const users = ref();
const loggedInUser = ref();
const tr = ref();
const open = ref(false);
const onlyShowOpen = ref(false);
const onlyShowMine = ref(false);
const searchFilter = ref('');

const createNewTicket = async () => {
  await createTicket({
    name: ticketName.value,
    description: ticketDescription.value,
    priority: ticketPriority.value,
    category: ticketCategory.value,
    assignee: ticketAssignee.value
  }).then(async () => {
    await getTickets();
    open.value = false;
  });
};

const getTickets = async () => {
  await fetchTickets().then((response) => {
    tickets.value = Object.values(response.tickets).map((ticket) => {
      ticket.category = tr.value.tickets.category[ticket.category].da;
      ticket.priority = tr.value.tickets.priority[ticket.priority].da;
      ticket.creator = users.value.find((user) => user.id === ticket.creator).name;
      ticket.assignee = users.value.find((user) => user.id === ticket.assignee).name;
      ticket.status =
        ticket.open === 1
          ? tr.value.tickets.status.open[ticket.status].da
          : tr.value.tickets.status.closed[ticket.status].da;
      return ticket;
    });
    filterTickets();
  });
};

const filterTickets = () =>
  (filteredTickets.value = tickets.value.filter(
    (ticket) => ticketNameIncludes(ticket) && ticketStatusOpen(ticket) && ticketOnlyMine(ticket)
  ));

const ticketNameIncludes = (ticket) => ticket.name.toLowerCase().includes(searchFilter.value.toLowerCase()) ?? true;

const ticketStatusOpen = (ticket) => (onlyShowOpen.value ? ticket.open === 1 : true);

const ticketOnlyMine = (ticket) => (onlyShowMine.value ? ticket.assignee === loggedInUser.value : true);

const openTicketModal = () => {
  ticketName.value = '';
  ticketDescription.value = '';
  open.value = true;
};

const onRowClick = (event) => router.push({ path: `tickets/show/${event.data.id}` });

onBeforeMount(async () => {
  tr.value = await getTranslations();
  users.value = Object.values(await getUserList());
  await getTickets();
});

onUpdated(async () => {
  loggedInUser.value = users.value.find((user) => user.id === window?.infosys?.user_id)?.name;
});
</script>

<template>
  <div>
    <Button style="gap: 0.5rem" size="small" raised @click="openTicketModal()" label="Opret opgave" />
  </div>
  <Toolbar>
    <template #start>
      <div style="display: inline-flex; gap: 1rem">
        <div style="display: inline-flex; gap: 0.5rem">
          <InputSwitch inputId="showOnlyOpen" v-model="onlyShowOpen" @change="filterTickets()" />
          <label for="showOnlyOpen">Åbne opgaver</label>
        </div>
        <div style="display: inline-flex; gap: 0.5rem">
          <InputSwitch inputId="showOnlyMine" v-model="onlyShowMine" @change="filterTickets()" />
          <label for="showOnlyMine">Mine opgaver</label>
        </div>
      </div>
    </template>
    <template #end>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          class="search-field"
          v-model.trim="searchFilter"
          @keyup="filterTickets()"
          placeholder="Søg i opgaver"
        />
      </span>
    </template>
  </Toolbar>

  <DataTable
    v-if="filteredTickets"
    :value="filteredTickets"
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50, 100]"
    :rowHover="true"
    @row-click="onRowClick"
    paginator
    stripedRows
    removableSort
    size="small"
  >
    <Column field="id" header="ID" sortable></Column>
    <Column field="category" header="Kategori" sortable></Column>
    <Column field="name" header="Navn" sortable></Column>
    <Column field="priority" header="Prioritet" sortable></Column>
    <Column field="creator" header="Opretter" sortable></Column>
    <Column field="assignee" header="Udfører" sortable></Column>
    <Column field="status" header="Status" sortable></Column>
  </DataTable>

  <TicketsDialog :open="open" title="test" />
</template>

<style scoped>
.p-toolbar {
  padding: 1rem 0;
  background-color: transparent;
  border: 0;
}

.pi {
  color: #6c757d;
  font-size: 14px;
  left: 14px;
}

.p-inputtext {
  padding: 10.5px;
  line-height: normal;
  border: 1px solid #ced4da;
  color: #495057;
}

.search-field {
  padding-left: 35px;
}

label {
  margin: auto 0;
}

.help-text {
  font-size: 12px;
  color: #6c757d;
  margin-top: 0.5rem;
  cursor: default;
}
</style>
