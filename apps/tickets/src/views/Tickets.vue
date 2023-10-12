<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createTicket, fetchTickets } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const router = useRouter();
const tickets = ref();
const filteredTickets = ref();
const users = ref();
const tr = ref();
const open = ref(false);
const onlyShowOpen = ref(false);
const onlyShowMine = ref(false);
const searchFilter = ref('');
const ticketName = ref('');
const ticketDescription = ref('');
const ticketPriority = ref(0);
const ticketCategory = ref(0);
const ticketAssignee = ref('');

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

const filterTickets = () => {
  filteredTickets.value = tickets.value.filter(
    (ticket) => ticketNameIncludes(ticket) && ticketStatusOpen(ticket) && ticketOnlyMine(ticket)
  );
};

const ticketNameIncludes = (ticket) => ticket.name.toLowerCase().includes(searchFilter.value.toLowerCase()) ?? true;

const ticketStatusOpen = (ticket) => (onlyShowOpen.value ? ticket.open === 1 : true);

const ticketOnlyMine = (ticket) => (onlyShowMine.value ? ticket.assignee === window.infosys?.user_id : true);

const openTicketModal = () => {
  ticketName.value = '';
  ticketDescription.value = '';
  open.value = true;
};

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

const formIsInvalid = () => !ticketName.value || !ticketDescription.value || !ticketAssignee.value;

const onRowClick = (event) => {
  const id = event.data.id;
  router.push({ path: `tickets/show/${id}` });
};

onBeforeMount(async () => {
  tr.value = await getTranslations();
  users.value = Object.values(await getUserList());
  await getTickets();
});
</script>

<template>
  <div>
    <Button
      style="gap: 0.5rem"
      icon="pi pi-plus"
      size="small"
      severity="success"
      raised
      @click="openTicketModal()"
      label="Opret opgave"
    />
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

  <Dialog v-model:visible="open" modal class="newTicket">
    <template #header><h4>Opret opgave</h4></template>
    <div style="display: grid; grid-template-columns: minmax(400px, 800px) 1fr; gap: 1rem">
      <div style="display: flex; flex-direction: column">
        <label class="help-text">Navn/Titel</label>
        <InputText v-model.trim="ticketName" required style="width: 400px" />

        <label class="help-text">Opgavebeskrivelse</label>
        <Textarea v-model.trim="ticketDescription" :autoResize="true" :rows="10" style="width: 100%" required />
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
          v-model="ticketCategory"
          :options="tr.tickets.category.map((item, index) => ({ label: item.da, value: index }))"
          optionLabel="label"
          optionValue="value"
        />

        <label class="help-text">Prioritet</label>
        <Dropdown
          v-model="ticketPriority"
          :options="tr.tickets.priority.map((item, index) => ({ label: item.da, value: index }))"
          optionLabel="label"
          optionValue="value"
        />

        <label class="help-text">Udføres af</label>
        <Dropdown
          v-model="ticketAssignee"
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
        <Button severity="info" text label="Luk" icon="pi pi-times" @click="open = false" />
        <Button label="Opret opgave" raised :disabled="formIsInvalid()" @click="createNewTicket()" />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.p-toolbar {
  padding: 1rem 0;
}

.p-inputswitch {
  margin-top: 2px;
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
  margin-bottom: 0;
}

.help-text {
  font-size: 12px;
  color: #6c757d;
  margin-top: 0.5rem;
}
</style>
