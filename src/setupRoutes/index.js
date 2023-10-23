import delicateToPassport from './controllers/delicateToPassport';
import logout from './controllers/logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './controllers/renewAccessToken';
import redirect from './controllers/redirect';
import getSession from './controllers/getSession';
import registerUser from './controllers/registerUser';
import saveLogin from './controllers/saveLogin';

const setupRoutes = (context) => {
	const { config: { auth: {
		loginURL, logoutURL,	callbackURL, renewURL, session, registerURL,
	}}} = context;
	const enrichReq = buildEnrichReq(context);

	return { routes: {
		[`GET ${ loginURL }/:provider`]: [enrichReq, delicateToPassport],
		[`GET ${ callbackURL }/:provider`]: [enrichReq, delicateToPassport, saveLogin, redirect],
		[`GET ${ logoutURL }`]: [enrichReq, logout],
		[`GET ${ renewURL }`]: [enrichReq, renewAccessToken],
		[`GET ${ session }`]: [getSession],
		[`POST ${ registerURL }`]: [enrichReq, registerUser],
	}};
};

export default setupRoutes;
