<template>
	<div></div>
</template>

<script>
export default {
	data: () => ({
		equipments: [],
	}),

	created() {
		this.$axios.$get('/users')
	},
}
</script>
