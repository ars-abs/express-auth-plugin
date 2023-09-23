import { map } from '@laufire/utils/collection';
import setupAuthFlow from './setupAuthFlow';

// No returns: return data will uglify the context for the next pipe
const setupAuthFlows = (context) => 	{
	const { config: { auth: { providers }}} = context;

	map(providers, (...props) => setupAuthFlow({ props, ...context }));
};

export default setupAuthFlows;
