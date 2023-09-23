/* eslint-disable max-lines-per-function */
import jwt from 'jsonwebtoken';

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
		res.status(unauthorized).json({ error: { message: 'unauthorized' }});
	}
};

export default renewAccessToken;
