import { keys } from '@laufire/utils/collection';

const controller = {
	allowed: (roles, role) => roles.allowed.includes(role),
	denied: (roles, role) => !roles.denied.includes(role),
};

const includeAuthenticate = () => ({
	authenticate: ({ session: { role }, config, name, next }) => {
		const { auth: { roles }} = config.resources[name];
		const target = keys(roles)[0];

		return controller[target](roles, role)
			? next()
			: {
				meta: { status: 'unauthorized' },
				error: { message: 'Unauthorized access.' },
			};
	},
});

export default includeAuthenticate;
