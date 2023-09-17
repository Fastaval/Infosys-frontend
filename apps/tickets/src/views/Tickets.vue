<script setup>
import { onBeforeMount, ref } from 'vue';
import { createTicket, fetchTickets } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const tickets = ref();
const filteredTickets = ref();
const users = ref();
const tr = ref();
const open = ref(false);
const searchFilter = ref('');
const ticketName = ref('');
const ticketDescription = ref('');
const ticketPriority = ref(0);
const ticketCategory = ref(0);
const ticketAssignee = ref('');

const getTickets = async () => {
  await fetchTickets().then((response) => {
    tickets.value = response.tickets;
    filterTickets();
  });
};

const filterTickets = () => {
  filteredTickets.value = Object.values(tickets.value).filter(
    (ticket) => ticket.name.toLowerCase().includes(searchFilter.value.toLowerCase()) ?? true
  );
};

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

onBeforeMount(async () => {
  tr.value = await getTranslations();
  users.value = await getUserList();
  await getTickets();
});
</script>

<template>
  <div>
    <button type="button" class="button action" @click="openTicketModal()">Opret opgave</button>
    <div class="search-field float-right d-flex gap-2 align-items-center">
      <label for="search">Søg i opgaver:</label>
      <input id="search" v-model.trim="searchFilter" @keyup="filterTickets()" />
    </div>
  </div>

  <table class="table shadow table-striped table-hover mt-3" v-if="filteredTickets">
    <thead style="background-color: var(--bs-orange)">
      <th>ID</th>
      <th>Kategori</th>
      <th>Opgave</th>
      <th>Prioritet</th>
      <th>Oprettet af</th>
      <th>Udføres af</th>
      <th>Status</th>
    </thead>
    <tbody>
      <tr
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        @click="$router.push({ path: `tickets/show/${ticket.id}` })"
      >
        <td>{{ ticket.id }}</td>
        <td>{{ tr?.tickets?.category[ticket.category]?.da }}</td>
        <td>{{ ticket.name }}</td>
        <td>{{ tr?.tickets?.priority[ticket.priority]?.da }}</td>
        <td>{{ users[ticket.creator]?.name }}</td>
        <td>{{ users[ticket.assignee]?.name }}</td>
        <td>
          {{
            ticket.open === 1
              ? tr?.tickets?.status?.open[ticket.status]?.da
              : tr?.tickets?.status?.closed[ticket.status]?.da
          }}
        </td>
      </tr>
    </tbody>
  </table>

  <Transition>
    <dialog v-if="open" class="newTicket">
      <div class="card w-75">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between align-items-center">
            Opret opgave
            <div @click="open = false" class="closer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
              </svg>
            </div>
          </h5>
          <div class="card-text py-3">
            <form class="d-flex flex-column gap-3">
              <div class="form-floating input-sm">
                <input v-model.trim="ticketName" class="form-control" id="name" placeholder="Navn/Titel" required />
                <label for="name">Navn/Titel</label>
              </div>
              <div class="d-flex gap-5 justify-content-between">
                <div class="form-floating w-50">
                  <select class="form-select" id="category" v-model="ticketCategory" required>
                    <option v-for="(cat, index) in tr?.tickets?.category" :key="index" v-bind:value="index">
                      {{ cat.da }}
                    </option>
                  </select>
                  <label for="category">Kategori</label>
                </div>
                <div class="form-floating w-50">
                  <select class="form-select" id="priority" v-model="ticketPriority" required>
                    <option v-for="(priority, index) in tr?.tickets?.priority" :key="index" v-bind:value="index">
                      {{ priority.da }}
                    </option>
                  </select>
                  <label for="priority">Prioritet</label>
                </div>
                <div class="form-floating w-100">
                  <select class="form-select" id="priority" v-model="ticketAssignee" required>
                    <option v-for="assignee in users" :key="assignee.id" v-bind:value="assignee.id">
                      {{ assignee.name }}
                    </option>
                  </select>
                  <label for="priority">Udføres af</label>
                </div>
              </div>
              <div class="form-floating">
                <textarea
                  v-model.trim="ticketDescription"
                  class="form-control"
                  id="description"
                  placeholder="Indhold/Beskrivelse"
                  rows="7"
                  style="height: 100%"
                  required
                ></textarea>
                <label for="description">Indhold/Beskrivelse</label>
              </div>
            </form>
          </div>
          <div class="d-flex float-right gap-3">
            <button class="button cancel" @click="open = false">Luk</button>
            <button
              class="button action"
              @click="createNewTicket()"
              :class="{ disabled: formIsInvalid() }"
              :disabled="formIsInvalid()"
            >
              Opret opgave
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.search-field {
  & label {
    margin-bottom: 0;
  }

  & input {
    width: 300px;
    border: lightgray 1px solid;
    border-radius: 6px;
    padding: 4px;

    &:focus-visible {
      outline: 0;
    }
  }
}

.closer {
  width: 24px;
  height: 24x;
  cursor: pointer;
  outline: 0;
  stroke: grey;

  :hover {
    stroke: black;
  }
}

.table-hover tbody tr:hover > td {
  cursor: pointer;
  background-color: var(--bs-warning-border-subtle);
}

.button {
  border-radius: 6px;
  border: 1px solid var(--bs-btn-bg);
  padding: 6px 12px;
  color: white;
  transition: background-color 0.2s;

  &.action {
    border: 1px solid #157347;
    background-color: #198754;

    &:hover {
      background-color: #157347;
    }

    &:active {
      background-color: #198754;
    }
  }

  &.disabled {
    cursor: not-allowed;
    color: lightgrey;
    background-color: var(--bs-gray-600);
    border-color: var(--bs-gray-600);
    &:hover {
      background-color: var(--bs-gray-600);
    }

    &:active {
      background-color: var(--bs-gray-600);
    }
  }

  &.cancel {
    color: black;
    background-color: var(--bs-gray-200);

    &:hover {
      background-color: var(--bs-gray-300);
    }

    &:active {
      background-color: var(--bs-gray-200);
    }
  }
}

.newTicket {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  border: 0;
  align-items: center;
  justify-content: center;
}
</style>
