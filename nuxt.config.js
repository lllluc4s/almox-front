export default {
	head: {
		title: 'Almoxarifado',
		htmlAttrs: {
			lang: 'pt_br',
		},
		bodyAttrs: {
			class: 'bg-gray-100',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
			},
		],
	},

	css: [],

	plugins: [],

	components: true,

	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

	modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

	auth: {
		strategies: {
      local: {
				user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          user: { url: '/auth/me', method: 'get', propertyName: false },
          refresh: { url: '/auth/refresh', method: 'post', propertyName: false },
          logout: { url: '/auth/logout', method: 'post' },
        },
        tokenType: 'bearer',
      }
    },
    plugins: ['~/plugins/auth.js']
	},

	axios: {
		baseURL: 'http://localhost:8000/api',
		credentials: true,
	},


	build: {},
}
