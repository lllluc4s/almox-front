<template>
	<div class="font-sans antialiased" id="app">
		<vue-tailwind-modal
			:showing="showModal"
			@close="showModal = false"
			:showClose="true"
			:backgroundClose="false"
		>
			select de usuario

			botao para reservar

			botao para desist
		</vue-tailwind-modal>
	</div>
</template>

<script>
import VueTailwindModal from 'vue-tailwind-modal'

export default {
	components: {
		VueTailwindModal,
	},
	data() {
		return {
			showModal: false,
			user_id: '',
			users: [],
			equipment_id: '',
		}
	},

	methods: {
		open(id) {

			this.equipment_id = id

			this.fetchUsers()

			this.showModal = true

		},

		async fetchUsers() {
			const response = await this.$axios.$get('users')

			this.users = response
		},

		setUser(user_id){
			this.user_id = user_id
		},

		reserv(){
			// this.$axios.$post('bookings/transaction/', {
			// 						equipment_id: id,
			// 						user_id: this.user_id,
			// 					})
		}
	},
}
</script>

<style></style>
>
