/* eslint-disable max-statements */
import { findIndex } from '@laufire/utils/collection';
import jwt from 'jsonwebtoken';

const secondsOffset = 1000;
const tokenStates = {
	missing: ({ message }) => message === 'jwt must be provided',
	expired: ({ message }) => message === 'jwt expired',
	invalid: () => true,
};

const readSession = (req) => {
	const { config: { env: { JWTSECRET }}} = req.context;
	let session = { role: 'guest' };

	try {
		const { token } = req.cookies;
		const { exp, role } = jwt.verify(token, JWTSECRET);
		const expiresAt = exp * secondsOffset;
		const tokenState = 'valid';

		session = { role, expiresAt, tokenState };
	}
	catch (error) {
		const tokenState = findIndex(tokenStates, (fn) => fn(error));

		session = { ...session, tokenState };
	}

	req.context.session = session;
};

export default readSession;
