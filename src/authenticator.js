import passport from 'passport';

const authenticator = (req, ...args) => {
	const { params: { provider }} = req;

	return passport.authenticate(provider, {
		session: false, accessType: 'offline', prompt: 'consent',
	})(req, ...args);
};

export default authenticator;
