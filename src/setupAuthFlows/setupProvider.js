import passport from 'passport';

const cb = (
	accessToken, refreshToken, params, profile, done
) => done(null, {
	accessToken: accessToken,
	refreshToken: refreshToken,
	idToken: params.id_token,
});

const setupProvider = async ({ data: { provider, props }}) =>{
	const {passportStrategy} = props
	import(`${ passportStrategy }`).then(({Strategy}) => {
		passport.use(`${provider}`, new Strategy({...props }, cb));
	});
};

export default setupProvider;
