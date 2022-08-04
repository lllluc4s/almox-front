<template>
  <div>
    <div class="mb-10 flex justify-center">
      <span>Aqui você acompanha todas as reservas.</span>
    </div>
    <div>
      <table
        class="
          table-auto
          border-separate border-spacing-4 border border-slate-500
          w-full
          text-center
          p-1
          mt-20
        "
      >
        <thead>
          <tr>
            <th class="border border-slate-900 px-4 py-4">Usuário</th>
            <th class="border border-slate-600 px-4 py-4">Equipamento</th>
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
  }),

  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      const response = await this.$axios.$get('bookings')

      this.bookings = response
    },
  },
}
</script>
