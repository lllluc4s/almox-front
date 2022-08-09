<template>
  <div>
    <div class="mt-40 mb-10 flex justify-center">
      <span>Aqui você registra e acompanha a lista de equipamentos.</span>
    </div>

    <div class="flex justify-center items-center mb-10">
      <NuxtLink
        to="/equipmentCreate"
        class="
          text-gray-700
          mr-7
          border border-gray-300
          hover:border-purple-400 hover:text-purple-700
          rounded
          px-4
          py-2
        "
      >
        Cadastrar equipamento
      </NuxtLink>
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
        @input="filterEquipments"
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
          mt-20
        "
      >
        <thead>
          <tr>
            <th class="border border-slate-900 px-4 py-4">Equipamento</th>
            <th class="border border-slate-600 px-4 py-4">Status</th>
            <th class="border border-slate-600 px-4 py-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in equipments" :key="item.id">
            <td class="border border-slate-600 px-2 py-2">{{ item.type }}</td>
            <td class="border border-slate-600 px-2 py-2">{{ item.status }}</td>
            <td class="border border-slate-600 px-1 py-1 flex justify-evenly">
              <button
                class="
                  rounded
                  inline-flex
                  items-center
                  px-2
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
                @click="openReserveModal(item.id)"
              >
                Reservar
              </button>

              <nuxt-link
                :to="`/equipmentEdit/${item.id}`"
                class="
                  rounded
                  inline-flex
                  items-center
                  px-2
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
              >
                Editar
              </nuxt-link>

              <button
                class="
                  rounded
                  inline-flex
                  items-center
                  px-2
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
                @click="deleteEquipment(item.id)"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <reserve-modal ref="reserveModal" />
    <cancel-modal ref="cancelModal" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import ReserveModal from '../../components/modal/ReserveModal.vue'
import CancelModal from '../../components/modal/CancelModal.vue'

Vue.use(VueSweetalert2)

export default {
  components: {
    ReserveModal,
    CancelModal,
  },

  data: () => ({
    equipments: [],
    equipment: '',
    filtro: '',
  }),

  mounted() {
    this.fetchEquipments()
  },

  methods: {
    async fetchEquipments() {
      const response = await this.$axios.$get('equipments')
      this.equipments = response
    },

    openReserveModal(id) {
      this.$refs.reserveModal.open(id)
    },

    openCancelModal(id) {
      this.$refs.cancelModal.open(id)
    },

    filterEquipments() {
      this.$axios
        .get('equipments', { params: { filtro: this.filtro } })
        .then((response) => {
          this.equipments = response.data
        })
        .then((response) => {
          this.equipments = response.data
        })
    },
  },

  editEquipment(id) {
    this.$router.push(`/equipmentEdit/${id}`)
  },

  deleteEquipment(id) {
    this.$swal({
      title: 'Tem certeza que deseja excluir?',
      text: 'Você não poderá reverter isso!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
    }).then(async (result) => {
      if (result.value) {
        await this.$axios.$delete(`equipments/${id}`)
        this.fetchEquipments()
        this.$swal('Excluído!', 'O equipamento foi excluído.', 'success')
      }
    })
  },
}
</script>
