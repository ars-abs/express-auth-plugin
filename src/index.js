import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';

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
