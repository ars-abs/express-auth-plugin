import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import { self } from '@laufire/utils/fn';
import includeAuthenticate from './includeAuthenticate';
import { pipe } from './helpers';
import setupMiddleware from './setupMiddleware';

const init = (context) => pipe([
	enrichContext,
	setupAuthFlows,
	setupRoutes,
	setupMiddleware,
	includeAuthenticate,
], context);

const setup = self;

export { init, setup };
