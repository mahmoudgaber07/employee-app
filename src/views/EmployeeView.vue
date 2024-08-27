<template>
  <div class="error" v-if="error">
    Error fetching employee details.
  </div>
  <div v-else-if="employees">
    <div class="search flex gap-4 my-5 px-2">
      <input type="text" v-model="search" placeholder="Search..." class="border-2 border-green-500 rounded-md p-2">
      <button @click="searchbyName" class="bg-green-500 text-white px-2 py-3 rounded-md">Search</button>
    </div>
    <div class="employees">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-green-500 text-white">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.firstName }} {{ employee.lastName }}</td>
            <td>{{ employee.email }}</td>
            <td>
              <button @click="openModal(employee)">
                Edit
              </button>
            </td>
            <td>
              <button @click="delEmployee(employee)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal v-if="isModalOpen" :isOpen="isModalOpen" @close="closeModal" :onSubmit="editEmployee"
        :employee="selectedEmployee" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Modal from '../components/Modal.vue';

const employees = ref([]);
const search = ref('');
const error = ref(false);
const isModalOpen = ref(false);
const selectedEmployee = ref(null);

onMounted(() => {
  getEmployees();
});

const getEmployees = () => {
  axios.get('https://dummyjson.com/users?limit=10')
    .then(res => employees.value = res.data.users)
    .catch(err => error.value = true);
};

const delEmployee = (employee) => {
  // axios.delete(`https://dummyjson.com/users/${employee.id}`)
  //   .then(res => getEmployees())
  //   .catch(err => error.value = true);
  console.log(employee);
};

const editEmployee = (updatedEmployee) => {
  // axios.put(`https://dummyjson.com/users/${updatedEmployee.id}`, updatedEmployee)
  //   .then(res => getEmployees())
  //   .catch(err => error.value = true);

  console.log(updatedEmployee);
};

const searchbyName = () => {
  axios.get(`https://dummyjson.com/users/search?q=${search.value}`)
    .then(res => employees.value = res.data.users)
    .catch(err => error.value = true);
  search.value = '';
};

const openModal = (employee) => {
  selectedEmployee.value = employee;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style>
th {
  padding: 0.5rem;
}

td {
  padding: 0.5rem;
  text-align: center;
}
</style>
