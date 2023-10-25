import setTokens from './setTokens';

const registerUser = async (req, res) => {
	const { session: { id: identityID }, store	} = req.context;

	const { data: { id: userID }} = await store({
		...req.context, name: 'users', action: 'create',
		data: { payload: req.body },
	});

	await store({
		...req.context, name: 'userIdentityMap', action: 'create',
		data: { payload: { userID, identityID }},
	});
	const payload = { id: userID, role: ['user'] };

	setTokens({ req, res, payload });
	res.json({ data: { message: 'success' }});
};

export default registerUser;
