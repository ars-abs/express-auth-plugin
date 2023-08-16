import setupProvider from './setupProvider';

const setupAuthFlow = ({ props: [value, provider], ...context }) => {
	const { config: {
		auth: { callbackURL },
		env: { URL, port },
	}} = context;
	const props = {
		...value,
		callbackURL: `${ URL }:${ port }${ callbackURL }/${ provider }`,
	};

	setupProvider({ ...context, data: { provider, props }});
};

export default setupAuthFlow;
