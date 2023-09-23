const allowCredentials = (req, res) => {
	res.header('Content-Type', 'application/json;charset=UTF-8');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
};

export default allowCredentials;
