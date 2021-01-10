import { db } from '../../../API/firebase';

export const addProduct = async (post, urls) => {
	var docId;
	var postToPersist = {
		...post,
		urls
	};
	await db.collection('posts').add(postToPersist).then((doc) => {
		docId = doc.id;
	});

	return docId;
};