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

	modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

	auth: {
		strategies: {
			laravelSanctum: {
				provider: 'laravel/sanctum',
				url: 'http://127.0.0.1:8000/api',
			},

			cookie: {
				endpoints: {
					csrf: {
						url: '/sanctum/csrf-cookie',
					},
					login: {
						url: '/login',
					},
					logout: {
						url: '/logout',
					},
					user: {
						url: '/users',
					},
				},
				user: {
					property: 'data',
				},
			},
		},

		redirect: {
			login: '/login',
			logout: '/login',
			home: '/',
		},

		plugins: ['~/plugins/axios'],
	},

	axios: {
		baseURL: 'http://127.0.0.1:8000/api',
		credentials: true,
	},

	build: {},
}
