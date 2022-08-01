export default function ({ $auth }, inject) {
	let acl = {
		can(permission) {
			if (this.isNotLoggedIn()) {
				return false
			}

			if (this.isMasterUser()) {
				return true
			}

			if (this.isAdmin()) {
				return true
			}

			return this.hasPermission(permission)
		},

		hasPermission(permission) {
			let userPermission = this.getPermission(permission)

			if (typeof userPermission == 'undefined') {
				return false
			}

			if (!userPermission) {
				return false
			}

			return userPermission.has_permission == 1
		},

		isNotLoggedIn() {
			return !$auth.loggedIn
		},

		getPermission(permission) {
			return $auth.user.user_permissions.filter(
				(row) => row.permission == permission
			)[0]
		},

		isMasterUser() {
			return $auth.user.user.is_master_user == 1
		},

		isAdmin() {
			return (
				$auth.user.user.is_master_user == 1 ||
				$auth.user.user.is_admin_user == 1
			)
		},
	}

	inject('acl', acl)
}
