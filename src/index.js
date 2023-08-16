import passport from 'passport';
import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import saveLogin from './saveLogin';
import enrichContext from './enrichContext';
const authenticator = (req, ...args) => {
	const { params: { provider }} = req;

	return passport.authenticate(provider, {
		session: false, accessType: 'offline', prompt: 'consent',
	})(req, ...args);
};

const redirect = (req, res) => res.redirect('/');
const setupRoutes = () => ({
	'GET /login/:provider': [authenticator],
	'GET /cb/:provider': [authenticator, saveLogin, redirect],
});

const setup = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes();

	return {
		resources,
		routes,
	};
};

export { setup };
