import jwt from 'jsonwebtoken';

const authenticate = ({ data: { token }}) => {
	try {
		const secretKey = process.env.JWTSECRET;
		const user = jwt.verify(token, secretKey);

		return { user };
	}
	catch (error) {
		return { error: {
			data: error,
			code: 401,
			message: error.name,
		}};
	}
};

export default authenticate;
