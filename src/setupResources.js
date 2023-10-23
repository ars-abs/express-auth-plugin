const resources = {
	users: {
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
};

const setupResources = () => ({ resources });

export default setupResources;
