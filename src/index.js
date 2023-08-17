import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import buildVerifier from './buildVerifier';

const setup = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes(enrichedContext);
	const validateLogin = buildVerifier(enrichedContext);

	return {
		resources,
		routes,
		validateLogin,
	};
};

export { setup };
