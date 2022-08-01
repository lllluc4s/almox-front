<template>
  <div class="w-1/2 mx-auto bg-white p-5 rounded-lg">
    <!-- <Errors class="mb-5" :errors="errors"></Errors> -->

    <form method="post" autoComplete="off" @submit.prevent="submit">
      <div class="mt-4">
        <Label html-for="name">Nome</Label>

        <Input
          id="name"
          v-model="name"
          :counter="100"
          :rules="nameRules"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
          auto-complete="off"
        />
      </div>

			<!-- <v-text-field
        v-model="name"
        :counter="100"
        :rules="nameRules"
        label="Nome"
        required
      ></v-text-field> -->

      <div class="mt-4">
        <Label html-for="email">Email</Label>

        <Input
          id="email"
          v-model="email"
          :rules="emailRules"
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
    nameRules: [(v) => !!v || 'Preencha o campo Nome'],

    email: '',
    emailRules: [
      (v) => !!v || 'Preencha o campo Email',
      (v) => /.+@.+\..+/.test(v) || 'Formato de email inserido não é válido!',
    ],

    password: '',
  }),

  methods: {
    submit() {
      const axios = require('axios').default

      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      }

      if (this.$refs.form.valid()) {
        axios
          .post('http://127.0.0.1:8000/api/users', data)
          .then(() => {
            alert('Opa, deu tudo certo! Conta criada com sucesso!')
          })
          .catch(() => {
            alert('Ops, algo deu errado! Preencha o formulário corretamente.')
          })

        this.$refs.form.reset()
      } else {
        alert('Preencha os campos necessários!')
      }
    },

    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>
