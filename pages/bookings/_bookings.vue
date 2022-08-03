<template>
  <div>
    <div class="mb-10 flex justify-center">
      <span>Aqui você acompanha as reservas de equipamentos.</span>
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
      const response = await this.$axios.$get('/equipments')

      this.equipments = response
    },
  },
}
</script>
