
const saveTokens = async ({
	models: { users },
	data: { sub, issuer, refreshToken, accessToken },
}) => {
	await users.findOrCreate({
		where: { user: sub },
		defaults: {
			user: sub,
			iss: issuer,
			refreshToken: refreshToken,
			accessToken: accessToken,
		},
	});
};

export default saveTokens;
