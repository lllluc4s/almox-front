<template>
  <div>
    <p v-if="$fetchState.pending">Loading...</p>
    <p v-else-if="$fetchState.error">Error! :(</p>
    <template v-else>
      <div
        v-for="(equipment, index) in equipments"
        :key="equipment.id"
        :class="`flex ${
          index + 1 == equipments.length ? '' : 'pb-10 mb-10 border-b'
        }`"
      >
        <div class="w-1/3 h-56 relative overflow-hidden rounded-lg">
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
          <NuxtLink
            class="text-purple-600 font-bold"
            :to="'/equipments/' + equipment.id"
          >
            Mais detalhes...
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    equipments: [],
  }),

  async fetch() {
    const response = await this.$axios.$get('/equipments')

    this.equipments = response.data
  },
}
</script>
