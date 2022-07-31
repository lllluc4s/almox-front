<template>
  <p v-if="$fetchState.pending">Carregando...</p>
  <p v-else-if="$fetchState.error">Ops, ocorreu um erro! :(</p>
  <div v-else class="flex">
    <div class="w-1/2 h-80 relative overflow-hidden rounded-lg">
      <!-- tag de imagem -->
    </div>

    <div class="w-full pl-14">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">{{ equipment.brand }}</h1>
        <span class="block font-semibold">${{ equipment.status }}</span>
      </div>
      <p class="leading-loose mb-5">
        {{ equipment.type }}
      </p>
      <Button class="mt-7">Reservar</Button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    equipment: {},
  }),

  async fetch() {
    const response = await this.$axios.$get(
      '/equipments/' + this.$route.params.equipment
    )

    this.equipment = response.data
  },

  head() {
    return {
      title: this.equipment.title + ' — Almoxarifado',
    }
  },
}
</script>
