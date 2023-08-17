import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import saveLogin from './saveLogin';
import enrichContext from './enrichContext';
import authenticator from './authenticator';
import logout from './logout';

const redirect = (req, res) => res.redirect('/');
const setupRoutes = ({ config: { auth: {
	loginURL, logoutURL,	callbackURL, renewURL,
}}}) => ({
	[`GET ${ loginURL }/:provider`]: [authenticator],
	[`GET ${ callbackURL }/:provider`]: [authenticator, saveLogin, redirect],
	[`GET ${ logoutURL }`]: [logout],
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
