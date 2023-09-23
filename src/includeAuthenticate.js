
const includeAuthenticate = () => ({
	authenticate: ({ session, next }) =>
		(session.role === 'guest'
			? {
				meta: { status: 'unauthorized' },
				error: { message: 'Unauthorized access.' },
			}
			: next()),
});

export default includeAuthenticate;
