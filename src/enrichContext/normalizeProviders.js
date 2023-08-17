import { merge } from '@laufire/utils/collection';

const normalizeProviders = ({ config: { auth: { strategies, providers }}}) =>
	merge(
		{}, providers, strategies
	);

export default normalizeProviders;
