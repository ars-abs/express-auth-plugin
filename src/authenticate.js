import { equals } from '@laufire/utils/collection';

const authenticate = ({ session, next }) => (equals(session, {})
	? {
		meta: { status: 'unauthorized' },
		error: { message: 'Invalid session.' },
	}
	: next());

export default authenticate;
