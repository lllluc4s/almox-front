<template>
  <div>
    <h1 class="text-3xl font-black mb-10 flex justify-center">
      Oi, {{ $auth.user.name }}!
    </h1>

    <div class="flex justify-center">
      <span>Aqui você acompanha e edita suas informações.</span>
    </div>

    <div class="mt-20">
      <h2 class="text-2xl font-black mb-5">Informações</h2>

      <div class="flex items-center mb-5">
        <span class="text-gray-700 font-semibold">Nome:</span>
        <span class="ml-3">{{ $auth.user.name }}</span>
      </div>

      <div class="flex items-center mb-5">
        <span class="text-gray-700 font-semibold">Email:</span>
        <span class="ml-3">{{ $auth.user.email }}</span>
      </div>

      <div class="flex items-center mb-20">
        <span class="text-gray-700 font-semibold">Tipo:</span>
        <span class="ml-3">{{ $auth.user.type }}</span>
      </div>

      <NuxtLink
        class="text-purple-600 font-bold"
        :to="'/userEdit/' + $auth.user.id"
      >
        Editar informações
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

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
