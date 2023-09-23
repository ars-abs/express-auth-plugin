import setTokens from './setTokens';
import delicateToPassport from './delicateToPassport';
import logout from './logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './renewAccessToken';
import redirect from './redirect';
import allowCredentials from '../middlewares/allowCredentials';
import getSession from './getSession';

const setupRoutes = (context) => {
	const { config: { auth: {
		loginURL, logoutURL,	callbackURL, renewURL, session,
	}}} = context;
	const enrichReq = buildEnrichReq(context);

	return {
		[`GET ${ loginURL }/:provider`]: [enrichReq, allowCredentials, delicateToPassport],
		[`GET ${ callbackURL }/:provider`]: [enrichReq, allowCredentials, delicateToPassport, setTokens, redirect],
		[`GET ${ logoutURL }`]: [enrichReq, allowCredentials, logout],
		[`GET ${ renewURL }`]: [enrichReq, allowCredentials, renewAccessToken],
		[`GET ${ session }`]: [getSession],
	};
};

export default setupRoutes;
