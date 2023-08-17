import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import saveLogin from './saveLogin';
import enrichContext from './enrichContext';
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

const setup = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes(enrichedContext);

	return {
		resources,
		routes,
	};
};

export { setup };
