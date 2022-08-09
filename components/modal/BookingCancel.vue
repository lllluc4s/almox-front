<template>
  <div
    id="app"
    class="font-sans antialiased flex justify-center items-center text-center"
  >
    <vue-tailwind-modal
      :showing="showModal"
      :show-close="true"
      :background-close="false"
      @close="showModal = false"
    >
      <button
        class="
          rounded
          inline-flex
          items-center
          px-4
          py-2
          bg-purple-700
          border border-transparent
          font-semibold
          text-xs text-white
          uppercase
          tracking-widest
          hover:bg-purple-800
          active:bg-purple-900
          focus:outline-none focus:border-purple-900 focus:ring
          ring-purple-300
          disabled:opacity-25
          transition
          ease-in-out
          duration-150
        "
        @click="cancel"
      >
        Cancelar reserva
      </button>
      <button
        class="
          rounded
          inline-flex
          items-center
          px-4
          py-2
          bg-purple-700
          border border-transparent
          font-semibold
          text-xs text-white
          uppercase
          tracking-widest
          hover:bg-purple-800
          active:bg-purple-900
          focus:outline-none focus:border-purple-900 focus:ring
          ring-purple-300
          disabled:opacity-25
          transition
          ease-in-out
          duration-150
        "
        @click="close"
      >
        Desistir
      </button>
    </vue-tailwind-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueTailwindModal from 'vue-tailwind-modal'

Vue.use(VueSweetalert2)

export default {
  components: {
    VueTailwindModal,
  },

  data() {
    return {
      showModal: false,
      bookings: [],
      booking_id: '',
    }
  },

  mounted() {
    this.fetchBookings()
  },

  methods: {
    async fetchBookings() {
      const response = await this.$axios.$get('bookings')
      this.bookings = response
    },

    open(id) {
      this.booking_id = id
      this.showModal = true
    },

    cancel() {
      const booking = this.bookings.find(
        (booking) => booking.id === this.booking_id
      )

      if (booking.transaction === 'Reserva') {
        this.$axios
          .$post(`bookings/cancel`, {
						booking_id: this.booking_id,
						
					})
          .then(() => {
            this.$swal({
              title: 'Reserva cancelada com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            })
            this.showModal = false
            this.fetchBookings()
          })
          .catch(() => {
            this.$swal({
              title: 'Erro ao cancelar reserva!',
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          })
      }
    },

    close() {
      this.$swal(
        'Desistiu!',
        'Você desistiu de reservar o equipamento.',
        'success'
      )

      this.showModal = false
    },
  },
}
</script>
