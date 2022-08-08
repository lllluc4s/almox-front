<template>
  <div>
    <div class="mt-40 mb-20 flex justify-center">
      <span>Aqui você acompanha todas as reservas.</span>
    </div>

    <div class="flex justify-center items-center">
      <input
        v-model="filtro"
        placeholder="Filtrar"
        type="search"
        name="filtro"
        class="
          text-center
          border border-gray-300
          rounded
          px-4
          py-2
          w-1/2
          focus:outline-none
          focus:ring-2
          focus:ring-purple-600
          focus:border-transparent
        "
        @input="filterBookings"
      />
    </div>

    <div>
      <table
        class="
          table-auto
          border-separate border-spacing-4 border border-slate-500
          w-full
          text-center
          p-1
          mt-10
        "
      >
        <thead>
          <tr>
            <th class="border border-slate-900 px-4 py-4">Usuário</th>
            <th class="border border-slate-600 px-4 py-4">Equipamento</th>
            <th class="border border-slate-600 px-4 py-4">Quantidade</th>
            <th class="border border-slate-600 px-4 py-4">Data da Reserva</th>
            <th class="border border-slate-600 px-4 py-4">Entrada / Saída</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bookings" :key="item.id">
            <td class="border border-slate-600 px-2 py-2">
              {{ item.user_name }}
            </td>
            <td class="border border-slate-600 px-2 py-2">
              {{ item.equipment_type }}
            </td>
            <td class="border border-slate-600 px-2 py-2">
              {{ item.quantity }}
            </td>
            <td class="border border-slate-600 px-2 py-2">
              {{ item.bookingDate }}
            </td>
            <td class="border border-slate-600 px-2 py-2">
              {{ item.transaction }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    bookings: [],
    filtro: '',
  }),

  async mounted() {
    const response = await this.$axios.$get('bookings')
    this.bookings = response
  },

  methods: {
    filterBookings() {
      this.$axios
        .get('bookings', { params: { filtro: this.filtro } })
        .then((response) => {
          this.bookings = response.data
        })
        .then((response) => {
          this.bookings = response.data
        })
    },
  },
}
</script>
