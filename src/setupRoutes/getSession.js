const getSession = (req, res) => {
	const { context: { session, constants: { statusCodes }}} = req;
	// const { error } = session;

	session.error
		? res.status(statusCodes.unauthorized).json(session)
		:	res.status(statusCodes.success).json(session);
};

export default getSession;
