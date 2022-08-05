<template>
  <div>
    <div id="navbar" class="bg-white">
      <main class="shadow">
        <div
          class="
            max-w-screen-lg
            mx-auto
            flex flex-row
            justify-between
            items-center
            p-4
            sm:p-7
            relative
            z-10
            space-x-2
            sm:space-x-4
          "
        >
          <NuxtLink to="/" class="block">
            <h1 class="text-2xl font-black">
              <span class="text-purple-700">Almoxarifado</span>
            </h1>
          </NuxtLink>

          <div class="flex items-center text-sm font-semibold">
            <template v-if="$auth.user">
              <NuxtLink
                to="/equipments"
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
                Equipamentos
              </NuxtLink>

              <NuxtLink
                to="/bookings"
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
                Reservas
              </NuxtLink>

              <NuxtLink
                to="/userProfile"
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
                Perfil
              </NuxtLink>

              <a
                href=""
                class="text-gray-700 hover:text-purple-700"
                @click.prevent="logout"
              >
                Sair
              </a>
            </template>
            <template v-else>
              <NuxtLink to="/login" class="text-gray-700 hover:text-purple-700">
                Entrar
              </NuxtLink>
              <NuxtLink
                to="/userCreate"
                class="
                  text-gray-700
                  ml-7
                  border border-gray-300
                  hover:border-purple-400 hover:text-purple-700
                  rounded
                  px-4
                  py-2
                "
              >
                Criar Conta
              </NuxtLink>
            </template>
          </div>
        </div>
      </main>
    </div>

    <div class="max-w-screen-lg mx-auto p-4 sm:p-7 mt-10">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style scoped>
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
