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
        <Label html-for="type">Tipo de conta (admin / user)</Label>
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
        <Button :click="submit" class="ml-3">Editar usuário</Button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
  middleware: 'auth',

  data: () => ({
    valid: true,
    name: '',
    email: '',
    type: '',
    password: '',
  }),

  methods: {
    submit() {
      const data = {
        name: this.name,
        email: this.email,
        type: this.type,
        password: this.password,
      }

      if (this.valid) {
        this.$axios
          .$put(`/users/${this.$auth.user.id}`, data)
          .then(() => {
            this.$swal({
              title: 'Sucesso!',
              text: 'Usuário editado com sucesso!',
              type: 'success',
            }).then(() => {
              this.$router.push('/users')
            })
          })
          .catch(() => {
            this.$swal({
              title: 'Erro!',
              text: 'Erro ao editar usuário!',
              type: 'error',
            })
          })

        this.resetForm()
      } else {
        alert('Preencha os campos necessários!')
      }
    },

    resetForm() {
      this.name = ''
      this.email = ''
      this.type = ''
      this.password = ''
    },
  },
}
</script>
