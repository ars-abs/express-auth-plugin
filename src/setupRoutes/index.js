import setTokens from './setTokens';
import delicateToPassport from './delicateToPassport';
import logout from './logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './renewAccessToken';
import redirect from './redirect';
import getSession from './getSession';

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
