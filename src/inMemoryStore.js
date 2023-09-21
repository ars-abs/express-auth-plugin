import { v4 as getUUID } from 'uuid';

const storage = {};
const store = (data) => {
	const id = getUUID();

	storage[id] = data;
	return id;
};

export { store, storage };
