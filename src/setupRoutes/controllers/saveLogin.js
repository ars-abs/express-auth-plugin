import setTokens from './setTokens';
import storeIdentity from './storeIdentity';

const saveLogin = async (
	req, res, next
) => {
	const id = await storeIdentity({ req });
	const payload = { id: id, role: 'prospect' };

	setTokens({ req, res, payload });
	next();
};

export default saveLogin;
