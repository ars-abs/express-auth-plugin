import { storage } from '../inMemoryStore';

const redirect = (req, res) => {
	const origin = `${ req.protocol }://${ req.get('host') }`;
	const state = storage[req.query.state];
	const {
		url = origin, queryParam = 'state',
	} = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));

	return res.redirect(`${ url }?${ queryParam }=${ state }`);
};

export default redirect;
