<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div class="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      <button class="absolute top-2 right-2 text-gray-600" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
          stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <form @submit.prevent="handleSubmit">
        <!-- Add/Edit Employee Modal -->
        <template v-if="modalType === 'add-employee' || modalType === 'edit-employee'">
          <h1 class="text-xl font-bold text-green-300 text-center py-5">{{ modalType === 'add-employee' ? 'Add Employee' : 'Edit Employee' }}</h1>
          <label for="name" class="pt-5 block text-sm font-medium text-gray-700">Name</label>
          <input v-model="formData.name" id="name" type="text"
            class="mt-1 bg-gray-50 block w-full p-2 rounded-md shadow-sm border border-solid border-green-300" required />

          <label for="salary" class="pt-5 block text-sm font-medium text-gray-700 mt-4">Salary</label>
          <input v-model="formData.salary" id="salary" type="number" min="0" max="20000"
            class="mt-1 bg-gray-50 block w-full p-2 rounded-md shadow-sm border border-solid border-green-300" required />
            <label for="birthDate" class="pt-5 block text-sm font-medium text-gray-700 mt-4">Birthdate</label>
            <input v-model="formData.birthDate" id="birthDate" type="datetime-local" required/>
            <label for="dateOfJoining" class="pt-5 block text-sm font-medium text-gray-700 mt-4">Date of Joining</label>
            <input v-model="formData.dateOfJoining" id="dateOfJoining" type="datetime-local" required/>
          </template>

        <!-- Add/Edit Department Modal -->
        <template v-if="modalType === 'add-department' || modalType === 'edit-department'">
          <h1 class="text-xl font-bold text-green-300 text-center py-5">{{ modalType === 'add-department' ? 'Add Department' : 'Edit Department' }}</h1>
          <label for="departmentName" class="pt-5 block text-sm font-medium text-gray-700">Department Name</label>
          <input v-model="formData.departmentName" id="departmentName" type="text"
            class="mt-1 bg-gray-50 block w-full p-2 rounded-md shadow-sm border border-solid border-green-300" required />
          <label for="departmentManager" class="pt-5 block text-sm font-medium text-gray-700">Department Manager</label>
          <input v-model="formData.departmentManager" id="departmentManager" type="text"
            class="mt-1 bg-gray-50 block w-full p-2 rounded-md shadow-sm border border-solid border-green-300" required />
        </template>

        <div class="mt-4 flex justify-end">
          <button type="button" @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  employee: Object,
  department: Object,
  modalType: {
    type: String,
    required: true
  },
  onSubmit: Function
});

const emit = defineEmits(['close']);

const formData = ref({
  name: '',
  salary: '',
  birthDate: '',
  dateOfJoining: '',
  departmentName: '',
  departmentManager: ''
});

watch(() => props.employee, (newEmployee) => {
  if (props.modalType === 'edit-employee' && newEmployee) {
    formData.value = {
      name: newEmployee.name,
      salary: newEmployee.salary,
      birthDate: newEmployee.birthDate,
      dateOfJoining: newEmployee.dateOfJoining,
      // departmentName: '',
      // departmentManager: ''
    };
  }
}, { immediate: true });

watch(() => props.department, (newDepartment) => {
  if (props.modalType === 'edit-department' && newDepartment) {
    formData.value = {
      // name: '', 
      // salary: '',
      // birthDate: '',
      // dateOfJoining: '',
      departmentName: newDepartment.name,
      departmentManager: newDepartment.manager
    };
  }
}, { immediate: true });

const closeModal = () => {
  emit('close');
};

const handleSubmit = () => {
  if (props.onSubmit) {
    if (props.modalType === 'add-employee' || props.modalType === 'edit-employee') {
      const employeeData = {
        ...props.employee,
        ...formData.value,
        id: props.employee?.id
      };
      props.onSubmit(employeeData);
    } else if (props.modalType === 'add-department' || props.modalType === 'edit-department') {
      const departmentData = {
        ...props.department,
        ...formData.value,
        id: props.department?.id
      };
      props.onSubmit(departmentData);
    }
  }
  closeModal();
};
</script>

<style scoped>
</style>
