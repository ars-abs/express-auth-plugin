import { merge } from '@laufire/utils/collection';

const buildEnrichReq = (context) => (
	req, res, next
) => {
	req.context = merge(
		{}, req.context, context
	);
	next();
};

export default buildEnrichReq;
