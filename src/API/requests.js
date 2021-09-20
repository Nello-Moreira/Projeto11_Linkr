import axiosBase from "./axiosBase";

function createBearerAuthorization(token) {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
}

function login({ email, password }) {
	return axiosBase.post("/sign-in", { email, password });
}

function signUp({ email, password, username, pictureUrl }) {
	return axiosBase.post("/sign-up", { email, password, username, pictureUrl });
}

function post({ token }, data) {
	return axiosBase.post("/posts", data, createBearerAuthorization(token));
}

function edit({ id, text, token }) {
	return axiosBase.put(
		`/posts/${id}`,
		{ text: text },
		createBearerAuthorization(token)
	);
}

function getPosts({ token }, nextPost) {
	if (nextPost)
		return axiosBase.get(
			`/posts?olderThan=${nextPost}`,
			createBearerAuthorization(token)
		);
	return axiosBase.get("/posts", createBearerAuthorization(token));
}

function getLikedPosts({ token }) {
	return axiosBase.get("/posts/liked", createBearerAuthorization(token));
}

function getUserPosts({ id, token }) {
	return axiosBase.get(`/users/${id}/posts`, createBearerAuthorization(token));
}

function getTrendingTopics({ token }) {
	return axiosBase.get("/hashtags/trending", createBearerAuthorization(token));
}

function getUserData({ id, token }) {
	return axiosBase.get(`/users/${id}`, createBearerAuthorization(token));
}

function getTrendingPosts({ topic, token }) {
	return axiosBase.get(
		`/hashtags/${topic}/posts`,
		createBearerAuthorization(token)
	);
}

function likePost({ likedPost, token }) {
	return axiosBase.post(
		`/posts/${likedPost}/like`,
		"",
		createBearerAuthorization(token)
	);
}

function dislikePost({ likedPost, token }) {
	return axiosBase.post(
		`/posts/${likedPost}/dislike`,
		"",
		createBearerAuthorization(token)
	);
}

function getFollows({ token }) {
	return axiosBase.get(`/users/follows`, createBearerAuthorization(token));
}

function deletePost({ postId, token }) {
	return axiosBase.delete(`/posts/${postId}`, createBearerAuthorization(token));
}

export {
	login,
	signUp,
	post,
	getPosts,
	getLikedPosts,
	getUserPosts,
	getTrendingTopics,
	getUserData,
	getTrendingPosts,
	likePost,
	dislikePost,
	getFollows,
	edit,
	deletePost,
};
