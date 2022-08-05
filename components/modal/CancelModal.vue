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
      equipments: [],
      equipment_id: '',
    }
  },

  mounted() {
    this.fetchEquipments()
  },

  methods: {
    async fetchEquipments() {
      const response = await this.$axios.$get('equipments')
      this.equipments = response
    },

    open(id) {
      this.equipment_id = id
      this.showModal = true
    },

    cancel() {
      const equipment = this.equipments.find(
        (item) => item.id === this.equipment_id
      )

      if (equipment.status === 'Indisponível') {
        this.$axios
          .$post('bookings/cancel', {
            equipment_id: this.equipment_id,
          })
          .then(() => {
            this.$swal({
              type: 'success',
              title: 'Reserva cancelada com sucesso',
              showConfirmButton: false,
              timer: 2000,
            })

            this.showModal = false
            this.fetchEquipments()

            window.location.reload()
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
