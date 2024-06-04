<script lang="ts">
import ErrorsContainer from '@/components/ErrorsContainer.vue'
import router from '@/router'
import { inject } from 'vue'
export default {
  name: 'RegisterView',
  components: {
    ErrorsContainer
  },
  inject: ['apiUrl'],
  data(): {
    errors: { type: string; message: string }[]
    formData: {
      name: string
      surname: string
      email: string
      password: string
      confirmPassword: string
    }
  } {
    return {
      formData: {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      errors: []
    }
  },
  setup(): { apiUrl: string } {
    return {
      apiUrl: inject<string>('apiUrl') || ''
    }
  },
  methods: {
    async registerUser() {
      this.errors = []
      if (!this.validEmail(this.formData.email)) {
        this.errors.push({
          type: 'INVALID_EMAIL',
          message: 'The email is invalid'
        })
      }

      if (this.formData.password.length < 8) {
        this.errors.push({
          type: 'INVALID_PASSWORD',
          message: 'The password must be 8 characters long'
        })
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.push({
          type: 'PASSWORDS_DONT_MATCH',
          message: 'The password and confirm password are not the same'
        })
      }

      if (this.errors.length) return
      // Do request

      try {
        const response = await fetch(`${this.apiUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.formData.name,
            surname: this.formData.surname,
            email: this.formData.email,
            password: this.formData.password
          })
        })
        console.log('[response]', response)
        const status = response.status
        if (status === 201) {
          this.formData = {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: ''
          }
          await router.push({ name: 'login', query: { success: 'true' } })
        }
        const body = await response.json()
        this.errors.push({
          type: 'USER_ERROR',
          message: body.message || ''
        })
      } catch (error) {
        console.log(error)
      }
    },
    validEmail(email: string) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(email)
    },
    closeErrors() {
      this.errors = []
    }
  }
}
</script>

<template>
  <div class="h-full content-center">
    <form
      @submit.prevent="registerUser"
      class="space-y-6 m-auto w-full max-w-sm p-4 border rounded-lg shadow-lg shadow-slate-500 bg-green-400 dark:bg-green-900"
    >
      <h1 class="text-center text-lg text-black dark:text-white">Create your account</h1>
      <div class="input-field">
        <label for="name" class=""> Name </label>
        <input
          type="text"
          name="name"
          id="name"
          class=""
          placeholder="name"
          required
          v-model="formData.name"
        />
      </div>
      <div class="input-field">
        <label for="email" class=""> Surname </label>
        <input
          type="text"
          name="surname"
          id="surname"
          class=""
          placeholder="Surname"
          required
          v-model="formData.surname"
        />
      </div>
      <div class="input-field">
        <label for="email" class=""> Email </label>
        <input
          type="email"
          name="email"
          id="email"
          class=""
          placeholder="example@domain.com"
          required
          v-model="formData.email"
        />
      </div>
      <div class="input-field">
        <label for="password" class=""> Password </label>
        <input
          type="password"
          name="password"
          id="password"
          class=""
          placeholder="Password"
          required
          v-model="formData.password"
        />
        <p>The password must be 8 characters long</p>
      </div>
      <div class="input-field">
        <label for="confirm-password" class=""> Confirm Password </label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          class=""
          placeholder="Confirm password"
          required
          v-model="formData.confirmPassword"
        />
      </div>
      <div class="register-link-container text-right">
        <RouterLink to="/auth/login">Already have an account? Login</RouterLink>
      </div>
      <template v-if="errors.length > 0">
        <ErrorsContainer :errors="errors" @close="closeErrors" />
      </template>
      <button
        class="block m-auto bg-black dark:bg-white text-white dark:text-black p-2 rounded"
        type="submit"
      >
        Register
      </button>
    </form>
  </div>
</template>
