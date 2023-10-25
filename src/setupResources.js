/* eslint-disable max-lines-per-function */

const setupResources = ({ config: { auth: {
	resources: { users, roles, identity, userIdentityMap, userRoleMap },
	repo,
}}}) => ({
	resources: {
		[users]: {
			schema: {
				properties: {
					name: { type: 'string' },
				},
			},
			repo: repo,
		},
		[roles]: {
			schema: {
				properties: {
					name: { type: 'string' },
				},
			},
			repo: repo,
		},
		[identity]: {
			schema: {
				properties: {
					provider: { type: 'string' },
					providerID: { type: 'string' },
				},
			},
			repo: repo,
		},
		[userIdentityMap]: {
			includes: [users, identity],
			schema: {
				properties: {
					userID: {
						type: 'string', format: 'ref', entity: users,
					},
					identityID: {
						type: 'string', format: 'ref', entity: identity,
					},
				},
			},
			repo: repo,
		},
		[userRoleMap]: {
			includes: [users, roles],
			schema: {
				properties: {
					userID: {
						type: 'string', format: 'ref', entity: users,
					},
					roleID: {
						type: 'string', format: 'ref', entity: roles,
					},
				},
			},
			repo: repo,
		},
	},
});

export default setupResources;
