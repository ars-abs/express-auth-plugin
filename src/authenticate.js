import passport from 'passport';

const authenticate = (req, ...args) => {
	const { params: { provider }} = req;

	return passport.authenticate(provider, {
		session: false, accessType: 'offline', prompt: 'consent',
	})(req, ...args);
};

export default authenticate;
