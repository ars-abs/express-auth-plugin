import saveLogin from './saveLogin';
import authenticate from './authenticate';
import logout from './logout';
import renewTokens from './renewTokens';

const redirect = (req, res) => res.redirect('/');

const setupRoutes = ({ config: { auth: {
	loginURL, logoutURL,	callbackURL, renewURL,
}}}) => ({
	[`GET ${ loginURL }/:provider`]: [authenticate],
	[`GET ${ callbackURL }/:provider`]: [authenticate, saveLogin, redirect],
	[`GET ${ logoutURL }`]: [logout],
	[`GET ${ renewURL }`]: [renewTokens, saveLogin, redirect],
});

export default setupRoutes;
