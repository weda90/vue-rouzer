<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      
      <Form @submit="handleLogin" :validation-schema="schema" class="space-y-4">
        <div>
          <label for="username" class="block text-lg">Username</label>
          <Field name="username" type="text" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          <ErrorMessage name="username" class="text-red-500 text-xs italic" />
        </div>

        <div>
          <label for="password" class="block text-lg">Password</label>
          <Field name="password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          <ErrorMessage name="password" class="text-red-500 text-xs italic" />
        </div>

        <div>
          <button class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";
import Swal from 'sweetalert2';

import { storeToRefs } from 'pinia';

import { useAuthStore, useAlertStore } from '@/stores';

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    const store = useAuthStore();
    const alertStore = useAlertStore();
    const { alert } = storeToRefs(alertStore);
    
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    return {
      schema,
      store,
      alert,
      Toast
    };
  },

  computed: {
    loggedIn() {
      return this.store.loggedIn;
    },
  },
  created() {
    if (this.store.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    async handleLogin(values) {
      await this.store.login(values);

      if (this.alert !== null) {
        this.Toast.fire({
          icon: this.alert.type,
          title: this.alert.message
        });
      } else {
        this.$router.push('/')
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
