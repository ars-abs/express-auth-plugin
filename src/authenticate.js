import passport from 'passport';

const authenticate = (req, ...args) => {
	const { params: { provider }, query: { state }} = req;

	return passport.authenticate(provider, {
		session: false,
		accessType: 'offline',
		prompt: 'consent',
		state: state,
	})(req, ...args);
};

export default authenticate;
