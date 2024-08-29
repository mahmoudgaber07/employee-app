<template>
    <nav class="block w-full max-w-screen-xl px-6 py-3 mx-auto text-dark">
      <div class="flex items-center justify-between text-green-gray-900">
        <a href="#"
          class="mr-4 block cursor-pointer py-1.5 font-sans text-green-400 text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased">
          EMPLOYEE APP
        </a>
        <div class="hidden lg:block">
          <ul class="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-green-gray-900">
              <RouterLink to="/" class="flex items-center transition-colors hover:text-green-500">
                HOME
              </RouterLink>
            </li>
            <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-green-gray-900">
              <RouterLink to="/department" class="flex items-center transition-colors hover:text-green-500">
                DEPARTMENTS
              </RouterLink>
            </li>
            <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-green-gray-900">
              <RouterLink to="/employee" class="flex items-center transition-colors hover:text-green-500">
                EMPLOYEES
              </RouterLink>
            </li>
          </ul>
        </div>
        <button
          class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button" @click="toggleMenu">
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg class="w-6 h-6 text-green-400" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><g id="Menu_Fries"><path d="M20.437,19.937c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002Z"></path><path d="M20.437,11.5c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l10,-0.001Z"></path><path d="M20.437,3.062c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001Z"></path></g></svg>
          </span>
        </button>
      </div>
      <div v-if="isMenuOpen" class="lg:hidden mt-4">
        <ul class="flex flex-col gap-2">
          <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-green-gray-900">
            <RouterLink to="/" class="flex items-center transition-colors hover:text-green-500">
              HOME
            </RouterLink>
          </li>
          <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-green-gray-900">
            <RouterLink to="/department" class="flex items-center transition-colors hover:text-green-500">
              DEPARTMENTS
            </RouterLink>
          </li>
          <li class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-green-gray-900">
            <RouterLink to="/employee" class="flex items-center transition-colors hover:text-green-500">
              EMPLOYEE
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  </script>
  
  <style scoped>

  </style>
  