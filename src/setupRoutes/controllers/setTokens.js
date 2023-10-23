/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import jwt from 'jsonwebtoken';

const setTokens = ({ req, res, payload }) => {
	const {
		config: {
			auth: { renewURL, accessTokenExp, refreshTokenExp },
			env: { JWTSECRET: secret },
		},
	} = req.context;

	const token = jwt.sign(
		payload, secret, { expiresIn: accessTokenExp }
	);
	const refreshToken = jwt.sign(
		payload, secret, { expiresIn: refreshTokenExp }
	);

	res.cookie(
		'token', token, { httpOnly: true, secure: true }
	);
	res.cookie(
		'refToken', refreshToken, {
			httpOnly: true, secure: true, path: renewURL,
		}
	);
};

export default setTokens;
