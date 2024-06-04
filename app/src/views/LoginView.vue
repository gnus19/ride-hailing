<script lang="ts">
import ErrorsContainer from '@/components/ErrorsContainer.vue'
import SuccessMessageContainer from '@/components/SuccessMessageContainer.vue'
import router from '@/router'
import { inject } from 'vue'
export default {
  name: 'RegisterView',
  components: {
    ErrorsContainer,
    SuccessMessageContainer
  },
  inject: ['apiUrl'],
  data(): {
    openSuccessPopup: boolean
    errorReason: string
    errors: { type: string; message: string }[]
    formData: {
      email: string
      password: string
    }
  } {
    return {
      formData: {
        email: '',
        password: ''
      },
      errors: [],
      openSuccessPopup: this.$route.query?.success === 'true',
      errorReason: (this.$route.query?.error as string) || ''
    }
  },
  setup(): { apiUrl: string } {
    return {
      apiUrl: inject<string>('apiUrl') || ''
    }
  },
  methods: {
    async loginUser() {
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

      if (this.errors.length) return
      // Do request

      try {
        const response = await fetch(`${this.apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.formData.email,
            password: this.formData.password
          })
        })

        const status = response.status
        let body = await response.json()
        if (status === 200) {
          localStorage.setItem('token', body.token)
          await router.push({ name: 'rides' })
          this.formData = {
            email: '',
            password: ''
          }
        }
        this.errors.push({
          type: 'USER_ERROR',
          message: body.message || ''
        })
      } catch (error) {
        console.log(error)
        this.errors.push({
          type: 'UNEXPECTED_ERROR',
          message: 'An unexcpected error happened, try again later'
        })
      }
    },
    validEmail(email: string) {
      const re =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(email)
    },
    closeErrors() {
      this.errors = []
    },
    closePopup() {
      this.openSuccessPopup = false
    },
    closeExpired() {
      this.errorReason = ''
    }
  }
}
</script>

<template>
  <div class="h-full content-center">
    <template v-if="openSuccessPopup">
      <div class="m-auto w-full max-w-sm mb-3">
        <SuccessMessageContainer message="User successfully registered!" @close="closePopup" />
      </div>
    </template>
    <template v-if="errorReason">
      <div class="m-auto w-full max-w-sm mb-3">
        <ErrorsContainer :errors="[{ message: 'ASD', type: errorReason }]" @close="closeExpired" />
      </div>
    </template>
    <form
      @submit.prevent="loginUser"
      class="space-y-6 m-auto w-full max-w-sm p-4 border rounded-lg shadow-lg shadow-slate-500 bg-green-400 dark:bg-green-900"
    >
      <h1 class="text-center text-lg text-black dark:text-white">Login into your account</h1>
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
          placeholder="password"
          required
          v-model="formData.password"
        />
      </div>
      <div class="register-link-container text-right">
        <RouterLink to="/auth/register">Don't have an account? Register</RouterLink>
      </div>
      <template v-if="errors.length > 0">
        <ErrorsContainer :errors="errors" @close="closeErrors" />
      </template>
      <button
        class="block m-auto bg-black dark:bg-white text-white dark:text-black p-2 rounded"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>
