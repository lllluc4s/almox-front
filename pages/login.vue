<template>
  <div class="w-1/2 mx-auto bg-white p-5 rounded-lg">
    <Errors class="mb-5" :errors="errors"></Errors>

    <form autoComplete="off" @submit.prevent="submitForm">
      <div>
        <Label html-for="email">Email</Label>

        <Input
          id="email"
          v-model="email"
          type="email"
          class="block mt-1 w-full"
          required
          auto-focus
          auto-complete="off"
        />
      </div>

      <div class="mt-4">
        <Label html-for="password">Senha</Label>

        <Input
          id="password"
          v-model="password"
          type="password"
          class="block mt-1 w-full"
          required
          auto-complete="current-password"
        />
      </div>

      <div class="block mt-4">
        <label htmlFor="remember_me" class="inline-flex items-center">
          <input
            id="remember_me"
            v-model="remember"
            type="checkbox"
            name="remember"
            class="
              rounded
              border-gray-300
              text-indigo-600
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
          />

          <span class="ml-2 text-gray-600">Lembrar de mim</span>
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button :click="submitForm" class="ml-3">Acessar</Button>
      </div>
    </form>
  </div>
</template>

<script>
// import * as axios from 'axios';

export default {
  middleware: 'auth',
  auth: 'guest',

  data: () => ({
    errors: [],
    email: '',
    password: '',
    remember: false,
  }),

  head() {
    return {
      title: 'Logar no sistema',
    }
  },

  methods: {
    submitForm(event) {
      // axios.get('/sanctum/csrf-cookie').then(() => {
      //   axios
      //     .post('/login', {
      //       email: this.email,
      //       password: this.password,
      //       remember: this.remember,
      //     })
      //     .then(() => {
      //       this.$router.push({ name: 'home' })
      //     })
      //     .catch((error) => {
      //       this.errors = error.response.data.errors
      //     })
      // })

      this.errors = []

      this.$auth
        .loginWith('cookie', {
          data: {
            email: this.email,
            password: this.password,
            remember: this.remember,
          },
        })
        .then(() => this.$router.push('/'))
        .catch((error) => {
          if (error.response.status !== 422) throw error

          this.errors = Object.values(error.response.data.errors).flat()
        })
    },
  },
}
</script>
