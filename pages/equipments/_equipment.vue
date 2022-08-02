<template>
	<div class="mt-20 flex">
		<div class="w-1/2 h-80 relative overflow-hidden rounded-lg">
			<img
				class="absolute inset-0 w-full h-full object-cover"
				:src="equipment.image"
				alt="Imagem do equipamento"
			/>
		</div>

		<div class="w-full pl-14">
			<div class="flex justify-between items-center mb-6">
				<h1 class="text-2xl font-bold">{{ equipment.type }}</h1>
				<span class="block font-semibold">{{ equipment.status }}</span>
			</div>
			<p class="leading-loose mb-5">
				{{ equipment.patrimony }}
			</p>
			<button
				class="rounded inline-flex items-center px-4 py-2 bg-purple-700 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-800 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
				@click="reservar"
			>
				Reservar
			</button>
			<button
				class="rounded inline-flex items-center px-4 py-2 bg-purple-700 border border-transparent font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-800 active:bg-purple-900 focus:outline-none focus:border-purple-900 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
				@click="deletar"
			>
				Deletar
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		equipment: {},
	}),

	mounted() {
		this.fetch()

		// this.head()
	},

	methods: {
		async fetch() {
			const response = await this.$axios.$get(
				'equipments/' + this.$route.params.equipment
			)

			this.equipment = response
		},

		// head() {
		//   return {
		//     title: this.equipment.type + ' - Almoxarifado',
		//   }
		// },

		reservar() {
			this.$axios.$post('bookings', {
				equipment_id: this.equipment.id,
			})

			this.$router.push('/bookings')
		},

		deletar() {
			console.log('deletar')
			// this.$axios.$delete('equipments/' + this.equipment.id)
		},
	},
}
</script>
