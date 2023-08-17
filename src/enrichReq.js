import { merge } from '@laufire/utils/collection';

const enrichReq = (context) => (
	req, res, next
) => {
	req.context = merge(
		{}, req.context, context
	);
	next();
};

export default enrichReq;
