const resources = {
	users: {
		schema: {
			type: 'object',
			properties: {
				user: { type: 'string' },
				iss: { type: 'string' },
				refreshToken: { type: 'string' },
				accessToken: { type: 'string' },
			},
		},
		repo: 'postgres',
	},
};

export default resources;
