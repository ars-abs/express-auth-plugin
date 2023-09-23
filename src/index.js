import setupAuthFlows from './setupAuthFlows';
import enrichContext from './enrichContext';
import setupRoutes from './setupRoutes';
import { self } from '@laufire/utils/fn';
import authenticate from './authenticate';
import readSession from './middlewares/readSession';
import { pipe } from './helpers';

const setupMiddleware = () => ({ middleware: readSession });
const includeAuthenticate = () => ({ authenticate });

const init = (context) => pipe([
	enrichContext,
	setupAuthFlows,
	setupRoutes,
	setupMiddleware,
	includeAuthenticate,
], context);

const setup = self;

export { init, setup };
