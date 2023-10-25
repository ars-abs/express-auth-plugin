import { find } from '@laufire/utils/collection';

const isAuthorized = ({ allowed, denied }, userRoles) =>
	find(userRoles, (userRole) =>
		allowed.includes(userRole) && !denied.includes(userRole));

const includeAuthenticate = () => ({
	authenticate: ({ session: { role: userRoles }, config, name, next }) => {
		const { auth: { roles }} = config.resources[name];

		return isAuthorized(roles, userRoles)
			? next()
			: {
				meta: { status: 'unauthorized' },
				error: { message: 'Unauthorized access.' },
			};
	},
});

export default includeAuthenticate;
