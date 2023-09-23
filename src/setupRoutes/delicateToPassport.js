import passport from 'passport';
import { store } from '../inMemoryStore';

const delicateToPassport = (req, ...args) => {
	const { params: { provider }, query: { state }} = req;
	const id = store(state);

	return passport.authenticate(provider, {
		session: false,
		accessType: 'offline',
		prompt: 'consent',
		state: id,
	})(req, ...args);
};

export default delicateToPassport;
