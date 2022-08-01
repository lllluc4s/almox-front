<template>
  <div>
    <div v-for="item in equipments" :key="item.id">
      <div class="w-1/3 h-56 relative overflow-hidden rounded-lg">
        <!-- tag de imagem -->
      </div>

      <div class="w-full pl-14">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">{{ item.brand }}</h1>
          <span class="block font-semibold">{{ item.status }}</span>
        </div>
        <p class="leading-loose mb-5">
          {{ item.type }}
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
