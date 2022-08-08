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
      <span>Selecione um usuário</span>
      <br />
      <select
        id="user_id"
        v-model="user_id"
        name="user_id"
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
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <br /><br />

      <span>Selecione o patrimônio</span>
      <br />
      <select
        id="patrimony_id"
        v-model="patrimony_id"
        name="patrimony_id"
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
        <option value="Braip">Braip</option>
        <option value="Kapsula">Kapsula</option>
        <option value="KPG">KPG</option>
      </select>
      <br /><br />

      <span>Selecione a quantidade</span>
      <br />
      <select
        id="quantity_id"
        v-model="quantity_id"
        name="quantity_id"
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
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
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
      patrimony_id: '',
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
            this.$swal({
              title: 'Reserva realizada com sucesso',
              type: 'success',
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
