<template>
  <div class="grid grid-cols-3 gap-3">
    <div v-for="item in equipments" :key="item.id" class="m-20">
      <div>
        <img
          class="w-full h-full"
          :src="item.image"
          alt="Imagem do equipamento"
        />
      </div>

      <div>
        <h1 class="text-2xl font-bold">{{ item.type }}</h1>
        <span class="block font-semibold">{{ item.status }}</span>
      </div>
      <p class="leading-loose mb-4">
        Eiqueta de patrimônio:
        {{ item.patrimony }}
      </p>
      <NuxtLink
        class="text-purple-600 font-bold"
        :to="'/equipments/' + item.id"
      >
        Opções
      </NuxtLink>
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
