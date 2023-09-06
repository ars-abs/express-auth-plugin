/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const renewAccessToken = (req, res) => {
	const { context: { config: { auth: { providers }}}} = req;
	const secretKey = process.env.JWTSECRET;

	try {
		const token = req.cookies.refToken;
		const { sub, iss, role } = jwt.verify(token, secretKey);
		const issuer = findIndex(providers,
			({ issuer: provider }) => provider === iss);
		const accessToken = jwt.sign(
			{ sub: sub, iss: issuer, role: role },
			process.env.JWTSECRET,
			{ expiresIn: '15m' }
		);
		const statusCode = 200;

		res.cookie(
			'token', accessToken, { httpOnly: true, domain: 'localhost' }
		);
		res.status(statusCode).json({ statusCode });
	}
	catch (error) {
		const statusCode = 401;

		res.status(statusCode).json({ statusCode });
	// 	error.name === 'TokenExpiredError'
	// 		? res.json({ error: { message: 'JWT has expired' }})
	// 		: res.json({ error: { message: 'JWT verification failed' }});
	}
};

export default renewAccessToken;
