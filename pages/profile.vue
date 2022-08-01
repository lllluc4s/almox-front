<template>
  <div>
    <h1 class="text-3xl font-black mb-10">Oi, {{ $auth.user.name }}!</h1>

    <div class="mb-10">
      <span>Aqui está uma lista de suas reservas.</span>

      <div v-if="bookings.length > 0">
        <div v-for="item in bookings" :key="item.id">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">{{ item.equipment_id }}</h1>
            <span class="block font-semibold">{{ item.transaction }}</span>
          </div>
          <p class="leading-loose mb-5">
            {{ item.user_id }}
          </p>
          <NuxtLink
            class="text-purple-600 font-bold"
            :to="'/equipments/' + item.id"
          >
            Mais detalhes...
          </NuxtLink>

          <div class="flex justify-between items-center mt-5">
            <span class="block font-semibold"
              >Data de reserva: {{ item.date }}</span
            >

            <Button class="mt-7" @click="cancelBooking(item.id)"
              >Cancelar reserva</Button
            >
          </div>
        </div>
      </div>
    </div>
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

    this.bookings = response
  },

  head() {
    return {
      title: 'Perfil - Almoxarifado',
    }
  },
}
</script>
