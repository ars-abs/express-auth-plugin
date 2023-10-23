const registerUser = async (req, res) => {
	const { body: payload } = req;
	const {
		session, store,
	} = req.context;

	const { id: identityID } = session;
	const { data: { id: userID }} = await store({
		...req.context, name: 'users', action: 'create',
		data: { payload },
	});

	await store({
		...req.context, name: 'userIdentityMap', action: 'create',
		data: { payload: { userID, identityID }},
	});

	res.json({ data: { message: 'success' }});
};

export default registerUser;
