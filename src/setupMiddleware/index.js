import { map } from '@laufire/utils/collection';
import readSession from './readSession';
import allowCredentials from './allowCredentials';

const middleware = (
	req, res, next
) => {
	map([readSession, allowCredentials], (fn) => fn(req, res));
	next();
};

const setupMiddleware = () => ({ middleware });

export default setupMiddleware;
