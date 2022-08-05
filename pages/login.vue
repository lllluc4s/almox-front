<template>
  <div class="mt-40 w-1/2 mx-auto bg-white p-5 rounded-lg">
    <Errors class="mb-5" :errors="errors"></Errors>

    <form method="post" autoComplete="off" @submit.prevent="submitForm">
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

      <div class="flex items-center justify-end mt-4">
        <Button :click="submitForm" class="ml-3">Acessar</Button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
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
    async submitForm(event) {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
          remember: this.remember,
        },
      })

      this.$swal({
        title: 'Sucesso!',
        text: 'Usuário logado com sucesso!',
        type: 'success',
        showConfirmButton: false,
        timer: 2000,
      })
      this.$router.push('/')
    },
  },
}
</script>
