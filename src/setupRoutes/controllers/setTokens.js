/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const setTokens = async (
	req, res, next
) => {
	const {
		user: { idToken },
		context: {
			config: {
				auth: { providers, renewURL, accessTokenExp, refreshTokenExp },
				env: { JWTSECRET: secret },
			},
			store,
		},
	} = req;
	const { sub, iss: provider } = jwt.decode(idToken);
	const iss = findIndex(providers, ({ issuer }) => issuer === provider);
	const role = 'prospect';

	const { data: { id }} = await store({
		...req.context, name: 'identity', action: 'create',
		data: { payload: {
			provider: iss,
			providerID: sub,
		}},
	});

	const token = jwt.sign(
		{ id, sub, iss, role }, secret, { expiresIn: accessTokenExp }
	);
	const refreshToken = jwt.sign(
		{ id, sub, iss }, secret, { expiresIn: refreshTokenExp }
	);

	res.cookie(
		'token', token, { httpOnly: true, secure: true }
	);
	res.cookie(
		'refToken', refreshToken, {
			httpOnly: true, secure: true, path: renewURL,
		}
	);
	next();
};

export default setTokens;
