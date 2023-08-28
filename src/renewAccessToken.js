/* eslint-disable max-lines-per-function */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const renewAccessToken = (req, res) => {
	const { context: { config: { auth: { providers }}}} = req;
	const token = req.cookies.refToken;
	const secretKey = process.env.JWTSECRET;

	try {
		const { sub, iss, role } = jwt.verify(token, secretKey);
		const issuer = findIndex(providers,
			({ issuer: provider }) => provider === iss);
		const accessToken = jwt.sign(
			{ sub: sub, iss: issuer, role: role },
			process.env.JWTSECRET,
			{ expiresIn: '15m' }
		);

		res.cookie(
			'token', accessToken, { httpOnly: true }
		).json({});
	}
	catch (error) {
		error.name === 'TokenExpiredError'
			? res.json({ error: { message: 'JWT has expired' }})
			: res.json({ error: { message: 'JWT verification failed' }});
	}
};

export default renewAccessToken;
