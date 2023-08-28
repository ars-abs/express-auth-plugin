import jwt from 'jsonwebtoken';

const verifyAccess = (
	req, res, next
) => {
	const { token } = req.cookies;
	const secretKey = process.env.JWTSECRET;

	try {
		const user = jwt.verify(token, secretKey);

		req.user = user;
		next();
	}
	catch (error) {
		error.name === 'TokenExpiredError'
			? res.json({ error: { message: 'JWT has expired' }})
			: res.json({ error: { message: 'JWT verification failed' }});
	}
};

export default verifyAccess;
