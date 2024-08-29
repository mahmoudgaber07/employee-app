# employees-app

## CRUD Project for Departments and Employees using vue 3 Composition API

## Features

- Employee Management: Add, edit, view, and delete employees.
- Department Management: Add, edit, view, and delete departments.
- Search Functionality: Search for employees and departments by name.
- Responsive Design: Built with Tailwind CSS for a modern, responsive UI.

## Technologies Used

- Vue 3: For building the user interface and managing application state using the Composition API.
- Tailwind CSS: For utility-first CSS styling.
- Axios: For making HTTP requests to a real API.
- Vue Router (optional): For navigation (if your project includes multiple pages).

## File Structure

/src
  /components
    Modal.vue          # Modal component for add/edit operations
    Nav.vue            # Component to display Nav
  /views
    EmployeeView.vue   # View for managing employees
    DepartmentView.vue # View for managing departments
  /assets
    main.css           # Tailwind CSS configuration
    base.css           #  CSS file
    logo.svg           # logo image
  App.vue
  main.js

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
