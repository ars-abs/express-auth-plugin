import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import { self } from '@laufire/utils/fn';
import authenticate from './authenticate';
import readSession from './middlewares/readSession';

const init = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes(enrichedContext);
	const middleware = readSession;

	return {
		routes,
		middleware,
		authenticate,
	};
};

const setup = self;

export { init, setup };
