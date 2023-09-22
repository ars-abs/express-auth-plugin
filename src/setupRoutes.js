import saveLogin from './saveLogin';
import delicateToPassport from './delicateToPassport';
import logout from './logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './renewAccessToken';
import jwt from 'jsonwebtoken';
import redirect from './redirect';
import allowCredentials from './middlewares/allowCredentials';

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
		[`GET ${ loginURL }/:provider`]: [enrichReq, allowCredentials, delicateToPassport],
		[`GET ${ callbackURL }/:provider`]: [enrichReq, allowCredentials, delicateToPassport, saveLogin, redirect],
		[`GET ${ logoutURL }`]: [enrichReq, allowCredentials, logout],
		[`GET ${ renewURL }`]: [enrichReq, allowCredentials, renewAccessToken],
		[`GET ${ session }`]: [getSession],
	};
};

export default setupRoutes;
