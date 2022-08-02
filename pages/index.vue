<template>
  <div>
    <div v-for="item in equipments" :key="item.id" class="m-20">
      <div class="w-1/3 h-44 relative overflow-hidden rounded-lg">
        <img
          class="absolute inset-0 w-full h-full object-cover"
          :src="item.image"
          alt="Imagem do equipamento"
        />
      </div>

      <div class="w-full">
        <div class="flex justify-between items-center mb-1">
          <h1 class="text-2xl font-bold">{{ item.type }}</h1>
          <span class="block font-semibold">{{ item.status }}</span>
        </div>
        <p class="leading-loose mb-4">
          {{ item.patrimony }}
        </p>
        <NuxtLink
          class="text-purple-600 font-bold"
          :to="'/equipments/' + item.id"
        >
          Mais detalhes...
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    equipments: [],
  }),

  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      const response = await this.$axios.$get('equipments')

      this.equipments = response
    },
  },
}
</script>
