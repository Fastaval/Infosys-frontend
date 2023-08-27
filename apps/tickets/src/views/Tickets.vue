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
  <table class="table table-striped table-hover mt-4">
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
      <tr v-for="ticket in tickets" :key="ticket.id" @click="$router.push({ path: `/${ticket.id}` })">
        <td>{{ ticket.id }}</td>
        <td>{{ ticket.category }}</td>
        <td>{{ ticket.name }}</td>
        <td>{{ ticket.priority }}</td>
        <td>{{ ticket.creator }}</td>
        <td>{{ ticket.assignee }}</td>
        <td>{{ ticket.status }}</td>
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
