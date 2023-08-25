import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const cookieExtractor = (req) => (req && req.cookies
	? req.cookies.refToken
	: '');

const verifyRefreshToken = ({ config: { auth: { loginURL }}}) => {
	passport.use('refresh', new JwtStrategy({
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
		secretOrKey: process.env.JWTSECRET,
	}, (jwtPayload, done) => done(null, jwtPayload)));

	return passport.authenticate('refresh',
		{ failureRedirect: loginURL, session: false });
};

export default verifyRefreshToken;
