<script setup>
import { ref } from 'vue';

const props = defineProps({
  open: Boolean,
  title: String
});

const openDialog = computed(() => props.open);

const ticketName = ref('');
const ticketDescription = ref('');
const ticketPriority = ref(0);
const ticketCategory = ref(0);
const ticketAssignee = ref('');

const formIsInvalid = () => !ticketName.value || !ticketDescription.value || !ticketAssignee.value;
</script>

<template>
  <Dialog v-model:visible="openDialog" modal class="newTicket">
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
        <Button severity="info" text label="Luk" icon="pi pi-times" />
        <Button label="Opret opgave" raised :disabled="formIsInvalid()" @click="createNewTicket()" />
      </div>
    </template>
  </Dialog>
</template>
