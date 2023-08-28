import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import { self } from '@laufire/utils/fn';
import verifyAccess from './verifyAccess';

const init = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes(enrichedContext);

	return {
		resources,
		routes,
		verifyAccess,
	};
};

const setup = self;

export { init, setup };
