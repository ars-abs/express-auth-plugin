import saveLogin from './saveLogin';
import authenticate from './authenticate';
import logout from './logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './renewAccessToken';
import jwt from 'jsonwebtoken';

const redirect = (req, res) => res.redirect('http://localhost:6006/');
const getSession = (req, res) => {
	try {
		const { exp } = jwt.decode(req.cookies.token);
		const statusCode = 200;
		const secondsOffset = 1000;
		const expiresAt = new Date(exp * secondsOffset);

		res.status(statusCode).json({ statusCode, expiresAt });
	}
	catch (error) {
		const statusCode = 401;

		res.status(statusCode).json({ statusCode });
	}
};

const setupRoutes = (context) => {
	const { config: { auth: {
		loginURL, logoutURL,	callbackURL, renewURL, session,
	}}} = context;
	const enrichReq = buildEnrichReq(context);

	return {
		[`GET ${ loginURL }/:provider`]: [enrichReq, authenticate],
		[`GET ${ callbackURL }/:provider`]: [enrichReq, authenticate, saveLogin, redirect],
		[`GET ${ logoutURL }`]: [enrichReq, logout],
		[`GET ${ renewURL }`]: [enrichReq, renewAccessToken],
		[`GET ${ session }`]: [getSession],
	};
};

export default setupRoutes;
