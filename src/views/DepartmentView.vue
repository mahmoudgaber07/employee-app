<template>
    <div class="error" v-if="error">
      Error fetching department details.
    </div>
    <div v-else-if="departments">
      <div class="flex my-5 px-2 justify-between">
      <div class="search flex gap-4">
        <input type="number" v-model="search" placeholder="Search by ID..." class="border-2 border-green-400 rounded-md p-2">
        <button @click="searchbyId" class="bg-green-100 px-2 py-3 rounded-md">Search</button>
      </div>
      <button class="bg-green-100 px-2 py-3 rounded-md" @click="openModal(null, 'add-department')">Add Department</button>
    </div>
      <div class="departments">
        <table class="table-auto w-full">
          <thead>
            <tr class="bg-green-100 ">
              <th>ID</th>
              <th>Department Manager</th>
              <th>Department Name</th>
              <th colspan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="department in departments" :key="department.id">
              <td>{{ department.id }}</td>
              <td>{{ department.manager }}</td>
              <td>{{ department.name }}</td>
              <td>
                <button @click="openModal(department, 'edit-department')" class="bg-green-100 px-2 py-1 rounded">
                  Edit
                </button>
              </td>
              <td>
                <button @click="deldepartment(department)" class="bg-red-100 px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal v-if="isModalOpen" :isOpen="isModalOpen" @close="closeModal" :onSubmit="modalType === 'add-department' ? addDepartment : editdepartment"
          :department="selecteddepartment" :modalType="modalType"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '../api/axiosInstance.js'
  import { onMounted, ref } from 'vue';
  import Modal from '../components/Modal.vue';
  
  const departments = ref([]);
  const search = ref('');
  const error = ref(false);
  const isModalOpen = ref(false);
  const selecteddepartment = ref(null);
  const modalType = ref('');

  onMounted(() => {
    getdepartments();
  });
  
  const getdepartments = () => {
  api.get('Departments')
    .then(res => {
      if (Array.isArray(res.data)) {
        departments.value = res.data;
      } else {
        departments.value = [res.data];
      }
    })
    .catch(err => error.value = true);
};
  const deldepartment = (department) => {
    api.delete(`Departments/${department.id}`)
      .then(res => getdepartments())
      .catch(err => error.value = true);
  };
  
  const editdepartment = (updateddepartment) => {
    const name = updateddepartment.departmentName;
    const manager = updateddepartment.departmentManager;
    api.patch(`Departments/${updateddepartment.id}`, {name,manager})
      .then(res => getdepartments())
      .catch(err => error.value = true);
  };
  const addDepartment = (data) => {
    const name = data.departmentName;
    const manager = data.departmentManager;
    api.post('Departments', {name,manager})
      .then(res => getdepartments())
      .catch(err => error.value = true);
  };

  const searchbyId = () => {
  api.get(`Departments/${search.value}`)
    .then(res => {
      departments.value = Array.isArray(res.data) ? res.data : [res.data];
    })
    .catch(err => error.value = true);
  search.value = '';
};
  const openModal = (department, type) => {
    console.log(department,type)
    selecteddepartment.value = department;
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