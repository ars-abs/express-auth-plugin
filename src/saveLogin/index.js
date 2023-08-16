import { findIndex } from '@laufire/utils/collection';
import saveTokens from './saveTokens';
import jwt from 'jsonwebtoken';
import { peek } from '@laufire/utils/debug';

const saveLogin = async (req, res, next) => {
	peek(req.user);
	const { user: { idToken, ...restTokens }, context } = req;
	const { config: { auth: { providers }}} = context;
	const { sub, iss } = jwt.decode(idToken);

	const issuer = findIndex(providers,
		({ issuer: provider }) => provider === iss);
	const token = jwt.sign(
		{
			sub: sub,
			iss: issuer,
			role: 'user',
		}, process.env.JWTSECRET, { expiresIn: '1h' }
	);

	await saveTokens({ ...context, data: { ...restTokens, sub, issuer }});
	res.cookie(
		'token', token, { httpOnly: true, secure: true }
	);
	next();
};

export default saveLogin;
