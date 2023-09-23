import setTokens from './controllers/setTokens';
import delicateToPassport from './controllers/delicateToPassport';
import logout from './controllers/logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './controllers/renewAccessToken';
import redirect from './controllers/redirect';
import getSession from './controllers/getSession';

const setupRoutes = (context) => {
	const { config: { auth: {
		loginURL, logoutURL,	callbackURL, renewURL, session,
	}}} = context;
	const enrichReq = buildEnrichReq(context);

	return { routes: {
		[`GET ${ loginURL }/:provider`]: [enrichReq, delicateToPassport],
		[`GET ${ callbackURL }/:provider`]: [enrichReq, delicateToPassport, setTokens, redirect],
		[`GET ${ logoutURL }`]: [enrichReq, logout],
		[`GET ${ renewURL }`]: [enrichReq, renewAccessToken],
		[`GET ${ session }`]: [getSession],
	}};
};

export default setupRoutes;
