<template>
  <div class="w-1/2 mx-auto bg-white p-5 mt-40 rounded-lg">
    <form method="post" autoComplete="off" @submit.prevent="submit">
      <div class="mt-4">
        <Label html-for="name">Nome</Label>
        <Input
          id="name"
          v-model="name"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
          auto-complete="off"
        />
      </div>

      <div class="mt-4">
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

      <div class="mt-4">
        <Label html-for="type">Tipo da conta (Admin / User)</Label>
        <Input
          id="type"
          v-model="type"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
          auto-complete="off"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button :click="submit" class="ml-3">Criar conta</Button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
    type: '',
  }),

  methods: {
    submit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        type: this.type,
      }

      if (this.valid) {
        this.$swal({
          title: 'Conta criada com sucesso!',
          type: 'success',
          showConfirmButton: false,
          timer: 2000,
        })

        this.$axios.$post('http://127.0.0.1:8000/api/users', data)

        this.$router.push('/')
      } else {
        this.$swal({
          title: 'Erro ao criar conta!',
          text: 'Por favor, tente novamente.',
          type: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },
  },
}
</script>
