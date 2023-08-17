import saveLogin from './saveLogin';
import authenticate from './authenticate';
import logout from './logout';
import renewTokens from './renewTokens';
import enrichReq from './enrichReq';

const redirect = (req, res) => res.redirect('/');

const setupRoutes = (context) => {
	const { config: { auth: {
		loginURL, logoutURL,	callbackURL, renewURL,
	}}} = context;
	const enrichedReq = enrichReq(context);

	return {
		[`GET ${ loginURL }/:provider`]: [enrichedReq, authenticate],
		[`GET ${ callbackURL }/:provider`]: [enrichedReq, authenticate, saveLogin, redirect],
		[`GET ${ logoutURL }`]: [enrichedReq, logout],
		[`GET ${ renewURL }`]: [enrichedReq, renewTokens, saveLogin, redirect],
	};
};

export default setupRoutes;
