/* eslint-disable max-statements */
import jwt from 'jsonwebtoken';

const secondsOffset = 1000;

const readSession = (req) => {
	const { config: { env: { JWTSECRET }}} = req.context;
	let session = { role: 'guest' };

	try {
		const { token } = req.cookies;
		const { exp, ...rest } = jwt.verify(token, JWTSECRET);
		const expiresAt = new Date(exp * secondsOffset);

		session = { ...rest, expiresAt };
	}
	catch (error) {
		session = { ...session, error };
	}

	req.context.session = session;
};

export default readSession;