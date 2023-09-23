/* eslint-disable max-lines-per-function */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const setTokens = (
	req, res, next
) => {
	const {
		user: { idToken },
		context: { config: {
			auth: { providers, renewURL, accessTokenExp, refreshTokenExp },
			env: { JWTSECRET: secret },
		}},
	} = req;
	const { sub, iss: provider } = jwt.decode(idToken);
	const iss = findIndex(providers, ({ issuer }) => issuer === provider);
	const role = 'prospect';
	const token = jwt.sign(
		{ sub, iss, role }, secret, { expiresIn: accessTokenExp }
	);
	const refreshToken = jwt.sign(
		{ sub, iss }, secret, { expiresIn: refreshTokenExp }
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
