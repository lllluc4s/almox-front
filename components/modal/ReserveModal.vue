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
      <!-- select de usuario botao para reservar botao para desist -->
      <select
        id="user_id"
        v-model="user_id"
        name="selectUsers"
        class="
          text-center
          border border-gray-300
          rounded
          px-5
          py-5
          w-1/2
          focus:outline-none
          focus:ring-2
          focus:ring-purple-600
          focus:border-transparent
        "
      >
        <option v-for="item in users" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <br />
      <br />
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
        @click="reserve"
      >
        Reservar
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
      users: [],
      user_id: '',
      equipments: [],
      equipment_id: '',
    }
  },

  mounted() {
    this.fetchEquipments()
    this.fetchUsers()
  },

  methods: {
    async fetchEquipments() {
      const response = await this.$axios.$get('equipments')
      this.equipments = response
    },

    async fetchUsers() {
      const response = await this.$axios.$get('users')
      this.users = response
    },

    open(id) {
      this.equipment_id = id
      this.fetchUsers()
      this.showModal = true
    },

    setUser(id) {
      this.user_id = id
    },

    reserve() {
      const equipment = this.equipments.find(
        (item) => item.id === this.equipment_id
      )

      if (equipment.status === 'Disponível') {
        this.$axios
          .$post('bookings/transaction', {
            user_id: this.user_id,
            equipment_id: this.equipment_id,
          })
          .then(() => {
            this.showModal = false
            this.fetchEquipments()
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
