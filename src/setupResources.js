const resources = {
	users: {
		schema: {
			properties: {
				name: { type: 'string' },
			},
		},
		repo: 'postgres',
	},
	roles: {
		schema: {
			properties: {
				name: { type: 'string' },
			},
		},
		repo: 'postgres',
	},
	identity: {
		schema: {
			properties: {
				provider: { type: 'string' },
				providerID: { type: 'string' },
			},
		},
		repo: 'postgres',
	},
	userIdentityMap: {
		includes: ['users', 'identity'],
		schema: {
			properties: {
				userID: {
					type: 'string', format: 'ref', entity: 'users',
				},
				identityID: {
					type: 'string', format: 'ref', entity: 'identity',
				},
			},
		},
		repo: 'postgres',
	},
	userRoleMap: {
		includes: ['users', 'roles'],
		schema: {
			properties: {
				userID: {
					type: 'string', format: 'ref', entity: 'users',
				},
				roleID: {
					type: 'string', format: 'ref', entity: 'roles',
				},
			},
		},
		repo: 'postgres',
	},
};

const setupResources = () => ({ resources });

export default setupResources;
