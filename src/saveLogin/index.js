/* eslint-disable max-lines-per-function */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const saveLogin = (
	req, res, next
) => {
	const { user: { idToken }, context } = req;
	const { config: {
		auth: { providers, renewURL },
		env: { JWTSECRET },
	}} = context;
	const { sub, iss } = jwt.decode(idToken);

	const issuer = findIndex(providers,
		({ issuer: provider }) => provider === iss);
	const token = jwt.sign(
		{
			sub: sub,
			iss: issuer,
			role: 'user',
		},
		JWTSECRET,
		{ expiresIn: '15m' }
	);
	const refreshToken = jwt.sign(
		{
			sub: sub,
			iss: issuer,
		}, JWTSECRET, { expiresIn: '1h' }
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

export default saveLogin;
