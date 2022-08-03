<template>
  <div>
    <template v-if="$auth.user">
      <h1 class="text-4xl font-black mb-10 flex justify-center">
        Bem-vindo {{ $auth.user.name }} !
      </h1>
      <h2 class="text-3xl mb-10 flex justify-center">
        Sistema de Almoxarifado
      </h2>
    </template>

    <template v-else>
      <h1 class="text-4xl font-black mb-10 flex justify-center">Bem-vindo!</h1>
      <h4 class="text-3xl mb-10 flex justify-center">
        Sistema de Almoxarifado
      </h4>
      <p class="text-2xl mt-40 flex justify-center">
        Faça login para acessar o sistema.
      </p>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    users: [],
  }),

  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      const response = await this.$axios.$get('/users')

      this.users = response
    },
  },
}
</script>
