import resources from './resources';
import setupAuthFlows from './setupAuthFlows';

const setupRoutes = () => ({});

const setup = (context) => {
	setupAuthFlows(context);
	const routes = setupRoutes();

	return {
		resources,
		routes,
	};
};

export { setup };
