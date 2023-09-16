<script setup lang="ts">
import { onBeforeMount, ref, Ref } from 'vue';
import { getTickets, TicketDetails } from '../services/tickets.service';
import { getTranslations } from '../services/translations.service';
import { getUserList } from '../services/users.service';

const tickets: Ref<TicketDetails[]> = ref();
const users = ref();
const tr = ref();

onBeforeMount(async () => {
  await getTranslations().then((result) => (tr.value = result));
  await getUserList().then((result) => (users.value = result));
  getTickets().then((response) => {
    tickets.value = response.tickets;
  });
});
</script>

<template>
  <table class="table table-striped table-hover mt-4" v-if="tickets">
    <thead>
      <th>ID</th>
      <th>Kategori</th>
      <th>Opgave</th>
      <th>Prioritet</th>
      <th>Oprettet af</th>
      <th>Udføres af</th>
      <th>Status</th>
    </thead>
    <tbody>
      <tr v-for="ticket in tickets" :key="ticket.id" @click="$router.push({ path: `tickets/show/${ticket.id}` })">
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
</template>

<style scoped>
.table-hover tbody tr:hover > td {
  cursor: pointer;
  background-color: lightblue;
}
</style>
