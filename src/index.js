import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import saveLogin from './saveLogin';
import enrichContext from './enrichContext';
import authenticator from './authenticator';

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
