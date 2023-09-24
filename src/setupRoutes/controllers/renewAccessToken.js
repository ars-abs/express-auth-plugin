/* eslint-disable max-lines-per-function */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const tokenStates = {
	missing: ({ message }) => message === 'jwt must be provided',
	expired: ({ message }) => message === 'jwt expired',
	invalid: () => true,
};

const renewAccessToken = (req, res) => {
	const { context: {
		config: { env: { JWTSECRET: secret }, auth: { accessTokenExp }},
		constants: { statusCodes: { success, unauthorized }},
	}} = req;

	try {
		const { token, refToken } = req.cookies;

		jwt.verify(refToken, secret);
		// eslint-disable-next-line no-unused-vars
		const { exp, iat, ...data } = jwt.decode(token);
		const accessToken = jwt.sign(
			data, secret, { expiresIn: accessTokenExp }
		);

		res.cookie(
			'token', accessToken, { httpOnly: true, secure: true }
		);
		res.status(success).json({ message: 'success' });
	}
	catch (error) {
		const tokenState = findIndex(tokenStates, (fn) => fn(error));

		res.status(unauthorized).json({ tokenState });
	}
};

export default renewAccessToken;
