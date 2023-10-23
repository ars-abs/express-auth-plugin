import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const storeIdentity = async ({ req }) => {
	const { idToken } = req.user;
	const { store, config: { auth: { providers }}} = req.context;
	const { sub, iss: provider } = jwt.decode(idToken);
	const iss = findIndex(providers, ({ issuer }) => issuer === provider);
	const data = { payload: { provider: iss, providerID: sub }};

	const { data: { id }} = await store({
		...req.context, name: 'identity', action: 'create', data: data,
	});

	return id;
};

export default storeIdentity;
