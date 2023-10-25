import { merge } from '@laufire/utils/collection';
import normalizeProviders from './normalizeProviders';
import normalizeResources from './normalizeResources';

const enrichContext = (context) =>
	merge(
		{}, context, { config: { auth: {
			providers: normalizeProviders(context),
			resources: normalizeResources(context),
		}}}
	);

export default enrichContext;
