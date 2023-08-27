<script setup lang="ts">
import { Ref, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { TicketDetails, getTicket } from '../services/tickets.service';

const route = useRoute();
const ticket: Ref<TicketDetails> = ref();

onBeforeMount(async () => {
  getTicket(route.params.id).then((response) => {
    const id = route.params.id as string;
    ticket.value = response.tickets[id];
  });
});
</script>

<template>
  <RouterLink to="/">&larr; Tilbage til ticket listen</RouterLink>
</template>

<style scoped></style>
