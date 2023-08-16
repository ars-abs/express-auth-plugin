import { merge } from '@laufire/utils/collection';
import normalizeProviders from './normalizeProviders';

const enrichContext = (context) =>
	merge(context, { config: { auth: {
		providers: normalizeProviders(context),
	}}});

export default enrichContext;
