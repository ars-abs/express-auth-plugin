import { merge } from '@laufire/utils/collection';

const defaultResources = {
	users: 'users',
	roles: 'roles',
	identity: 'identity',
	userIdentityMap: 'userIdentityMap',
	userRoleMap: 'userRoleMap',
};

const normalizeResources = ({ config: { auth: { resources = {}}}}) =>
	merge(
		{}, defaultResources, resources
	);

export default normalizeResources;
