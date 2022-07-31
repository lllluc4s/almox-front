<template>
  <div>
    <h1 class="text-3xl font-black mb-10">Oi, {{ $auth.user.name }}!</h1>

    <div class="mb-10">
      <span>Aqui está uma lista de suas reservas.</span>
    </div>

    <p v-if="$fetchState.pending">Carregando...</p>
    <p v-else-if="$fetchState.error">Ops, ocorreu um erro! :(</p>
    <template v-else>
      <template v-if="bookings.length">
        <div
          v-for="(booking, index) in bookings"
          :key="booking.equipment.id"
          :class="`flex ${
            index + 1 == bookings.length ? '' : 'pb-10 mb-10 border-b'
          }`"
        >
          <div class="w-1/3 h-56 relative overflow-hidden rounded-lg">
            <!-- tag de imagem -->
          </div>

          <div class="w-full pl-14">
            <div class="flex justify-between items-center mb-6">
              <h1 class="text-2xl font-bold">{{ booking.equipment.type }}</h1>
              <span class="block font-semibold"
                >Total ${{ booking.transaction }}</span
              >
            </div>
            <p class="mb-5">
              <span class="text-gray-600 text-sm uppercase">
                De
                <strong>{{ booking.start_date.split('T')[0] }}</strong> Até
                <strong>{{ booking.end_date.split('T')[0] }}</strong>
              </span>
            </p>
            <p class="leading-loose mb-5">
              {{ booking.equipment.status }}
            </p>
            <NuxtLink
              to="'/offices/' + reservation.office.id"
              class="text-purple-600 font-bold"
            >
              Mais detalhes...
            </NuxtLink>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data: () => ({
    bookings: [],
  }),

  async fetch() {
    const response = await this.$axios.$get('/bookings')

    this.bookings = response.data
  },

  head() {
    return {
      title: 'Perfil - Almoxarifado',
    }
  },
}
</script>
