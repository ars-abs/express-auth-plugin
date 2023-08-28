import saveLogin from './saveLogin';
import authenticate from './authenticate';
import logout from './logout';
import buildEnrichReq from './buildEnrichReq';
import renewAccessToken from './renewAccessToken';

const redirect = (req, res) => res.redirect('/');
const home = (req, res) => res.send('home');
const login = (req, res) => res.send('please choose provider');

const setupRoutes = (context) => {
	const { config: { auth: {
		loginURL, logoutURL,	callbackURL, renewURL,
	}}} = context;
	const enrichReq = buildEnrichReq(context);

	return {
		'GET /': home,
		[`GET ${ loginURL }`]: login,
		[`GET ${ loginURL }/:provider`]: [enrichReq, authenticate],
		[`GET ${ callbackURL }/:provider`]: [enrichReq, authenticate, saveLogin, redirect],
		[`GET ${ logoutURL }`]: [enrichReq, logout],
		[`GET ${ renewURL }`]: [enrichReq, renewAccessToken],
	};
};

export default setupRoutes;
