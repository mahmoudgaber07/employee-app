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
            <form @submit.prevent="handleEditEmployee">
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="formData.name" id="name" type="text"
                    class="mt-1 block w-full p-2 rounded-md shadow-sm border-green-300 " required />

                <label for="email" class="block text-sm font-medium text-gray-700 mt-4">Email</label>
                <input v-model="formData.email" id="email" type="email"
                    class="mt-1 block w-full p-2 rounded-md shadow-sm border-green-300 " required />

                <div class="mt-4 flex justify-end">
                    <button type="button" @click="closeModal"
                        class="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
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
    onSubmit: Function
});

const emit = defineEmits(['close']);

const formData = ref({
    name: '',
    email: ''
});

watch(() => props.employee, (newEmployee) => {
    if (newEmployee) {
        formData.value = {
            name: `${newEmployee.firstName} ${newEmployee.lastName}`,
            email: newEmployee.email
        };
    }
}, { immediate: true });

const closeModal = () => {
    emit('close');
};

const handleEditEmployee = () => {
    if (props.onSubmit) {
        const updatedEmployee = {
            ...props.employee,
            ...formData.value,
            id: props.employee.id
        };
        props.onSubmit(updatedEmployee);
    }
    closeModal();
};
</script>

<style scoped></style>