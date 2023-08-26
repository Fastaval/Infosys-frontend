<script setup lang="ts">
import { onBeforeMount, ref, Ref } from 'vue';
import { getTickets, TicketDetails } from '../services/tickets.service';

const tickets: Ref<TicketDetails[]> = ref();

onBeforeMount(async () => {
  getTickets().then((response) => {
    tickets.value = response.tickets;
  });
});
</script>

<template>
  <h3>Opgaver til tilmelding og infosys</h3>
  <table>
    <thead>
      <th>ID</th>
      <th>Kategori</th>
      <th>Opgave</th>
      <th>Prioritet</th>
      <th>Oprettet af</th>
      <th>Udføres af</th>
      <th>Status</th>
    </thead>
    <tr v-for="ticket in tickets" :key="ticket.id" onclick="window.location='/tickets/show/1'">
      <td>{{ ticket.id }}</td>
      <td>{{ ticket.category }}</td>
      <td>{{ ticket.name }}</td>
      <td>{{ ticket.priority }}</td>
      <td>{{ ticket.creator }}</td>
      <td>{{ ticket.assignee }}</td>
      <td>{{ ticket.status }}</td>
    </tr>
  </table>
</template>

<style scoped>
table th,
table td {
  padding: 0 1em;
  border: 1px solid black;
}
</style>
