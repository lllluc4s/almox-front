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
        Controle de equipamentos
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
            <th class="border border-slate-600 px-4 py-4">Patrimônio</th>
            <th class="border border-slate-600 px-4 py-4">Status</th>
            <th class="border border-slate-600 px-4 py-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in equipments" :key="item.id">
            <td class="border border-slate-600 px-2 py-2">{{ item.type }}</td>
            <td class="border border-slate-600 px-2 py-2">
              {{ item.patrimony }}
            </td>
            <td class="border border-slate-600 px-2 py-2">{{ item.status }}</td>
            <td
              class="
                border border-slate-600
                px-2
                py-2
                flex
                justify-center
                items-center
              "
            >
              <svg
                v-if="item.status === 'Disponível'"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#000"
                class="bi bi-pencil-square"
                viewBox="0 0 22 22"
                @click="openReserveModal(item.id)"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>

              <svg
                v-if="item.status === 'Indisponível'"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#000"
                class="bi bi-trash-fill"
                viewBox="0 0 22 22"
                @click="openCancelModal(item.id)"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
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
}
</script>
