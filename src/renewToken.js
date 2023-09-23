import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const renewToken = (req, res) => {
	const {
		context: { config: { auth: { providers }}},
		cookies: { refToken },
	} = req;
	const { sub, iss } = jwt.decode(refToken);

	const issuer = findIndex(providers,
		({ issuer: provider }) => provider === iss);
	const token = jwt.sign(
		{
			sub: sub,
			iss: issuer,
			role: 'prospect',
		}, process.env.JWTSECRET, { expiresIn: '15m' }
	);

	res.cookie(
		'token', token, { httpOnly: true }
	);

	res.send('success');
};

export default renewToken;
