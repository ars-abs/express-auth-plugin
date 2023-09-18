import resources from './resources';
import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import { self } from '@laufire/utils/fn';
import authenticate from './verifyAccess';
import readSession from './middlewares/readSession';
import allowCredentials from './middlewares/allowCredentials';
import { map } from '@laufire/utils/collection';

const init = (context) => {
	const enrichedContext = enrichContext(context);

	setupAuthFlows(enrichedContext);

	const routes = setupRoutes(enrichedContext);
	const middleware = (...args) =>
		map([allowCredentials, readSession], (fn) => fn(...args));

	return {
		resources,
		routes,
		middleware,
		authenticate,
	};
};

const setup = self;

export { init, setup };
