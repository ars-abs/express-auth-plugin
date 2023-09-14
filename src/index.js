import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import { self } from '@laufire/utils/fn';
import authenticate from './verifyAccess';

const init = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes(enrichedContext);

	return {
		resources,
		routes,
		authenticate,
	};
};

const setup = self;

export { init, setup };
