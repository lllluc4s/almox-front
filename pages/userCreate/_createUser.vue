<template>
  <div class="w-1/2 mx-auto bg-white p-5 rounded-lg">
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

      <div class="flex items-center justify-end mt-4">
        <Button :click="submit" class="ml-3">Criar conta</Button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    email: '',
    password: '',
  }),

  methods: {
    submit() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      if (this.valid) {
        this.$axios
          .$post('http://127.0.0.1:8000/api/users', data)
          .then(() => {
            alert('Opa, deu tudo certo! Conta criada com sucesso!')
          })
          .catch(() => {
            alert('Ops, algo deu errado! Tente novamente.')
          })

        this.resetForm()
      } else {
        alert('Preencha os campos necessários!')
      }
    },

    resetForm() {
      this.name = ''
      this.email = ''
      this.password = ''
    },
  },
}
</script>
