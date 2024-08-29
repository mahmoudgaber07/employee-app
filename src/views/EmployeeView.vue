<template>
  <div class="error" v-if="error">
    Error fetching employee details.
  </div>
  <div v-else-if="employees">
    <div class="flex my-5 px-2 justify-between">
      <div class="search flex gap-4">
        <input type="number" v-model="search" placeholder="Search by ID ..." class="border-2 border-green-400 rounded-md p-2">
        <button @click="searchbyId" class="bg-green-100 px-2 py-3 rounded-md">Search</button>
      </div>
      <button class="bg-green-100 px-2 py-3 rounded-md" @click="openModal(null, 'add-employee')">Add Employee</button>
    </div>
    <div class="employees">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-green-100 ">
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Birth Date</th>
            <th>Joining Date</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.salary }}</td>
            <td>{{ employee.birthDate }}</td>
            <td>{{ employee.dateOfJoining }}</td>
            <td>
              <button @click="openModal(employee, 'edit-employee')" class="bg-green-100 px-2 py-1 rounded">
                Edit
              </button>
            </td>
            <td>
              <button @click="delEmployee(employee)" class="bg-red-100 px-2 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal v-if="isModalOpen" :isOpen="isModalOpen" @close="closeModal" :onSubmit="modalType === 'edit-employee' ? editEmployee : addEmployee"
        :employee="selectedEmployee"  :modalType="modalType"/>
    </div>
  </div>
</template>

<script setup>
import api from '../api/axiosInstance.js';
import { onMounted, ref } from 'vue';
import Modal from '../components/Modal.vue';

const employees = ref([]);
const search = ref('');
const error = ref(false);
const isModalOpen = ref(false);
const selectedEmployee = ref(null);
const modalType = ref('');

onMounted(() => {
  getEmployees();
});

const getEmployees = () => {
  api.get('Employees')
    .then(res => {
      if (Array.isArray(res.data)) {
        employees.value = res.data;
      } else {
        employees.value = [res.data];
      }
    })
    .catch(err => error.value = true);
};

const delEmployee = (employee) => {
  api.delete(`Employees/${employee.id}`)
    .then(res => getEmployees())
    .catch(err => error.value = true);
};

const editEmployee = (updatedEmployee) => {
  const name = updatedEmployee.name;
  const salary = updatedEmployee.salary;
  const birthDate = updatedEmployee.birthDate;
  const dateOfJoining = updatedEmployee.dateOfJoining;
  api.patch(`Employees/${updatedEmployee.id}`, { name, salary, birthDate, dateOfJoining })
    .then(res => getEmployees())
    .catch(err => error.value = true);
};

const addEmployee = (data) => {
  const name = data.name;
  const salary = data.salary;
  const birthDate = data.birthDate;
  const dateOfJoining = data.dateOfJoining;
  api.post('Employees', { name, salary, birthDate, dateOfJoining })
    .then(res => getEmployees())
    .catch(err => error.value = true);
};

const searchbyId = () => {
  api.get(`Employees/${search.value}`)
    .then(res => {
      employees.value = Array.isArray(res.data) ? res.data : [res.data];
    })
    .catch(err => error.value = true);
  search.value = '';
};

const openModal = (employee, type) => {
  console.log(employee, type);
  selectedEmployee.value = employee;
  modalType.value = type;
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
