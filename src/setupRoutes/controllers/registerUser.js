/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */

import { peek } from '@laufire/utils/debug';
const throwError = (message) => {
	throw new Error(message);
};

const registerUser = async (req, res) => {
	const { body: payload } = req;
	const {
		config: { resources: { users: { repo }}},
		constants: { statusCodes: { forbidden }},
		repos, models, session,
	} = req.context;
	const { provider, providerID } = session;
	const { users, identity, userIdentity } = models;
	const transaction = await repos[repo].transaction();

	peek({ session });
	try {
		(session.role === 'guest') && throwError('Unauthorized request');

		const { id: userID } = await users.create(payload, { transaction });
		const { id: identityID } = await identity
			.create({ provider, providerID }, { transaction });

		await userIdentity.create({ userID, identityID }, { transaction });
		await transaction.commit();
		res.json({ data: { message: 'success' }});
	}
	catch ({ message }) {
		await transaction.rollback();
		res.status(forbidden).json({ error: { message }});
	}
};

export default registerUser;
