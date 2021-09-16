import axiosBase from "./axiosBase";

function createBearerAuthorization(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
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

function getPosts({ token }) {
  return axiosBase.get("/posts", createBearerAuthorization(token));
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

export { login, signUp, post, getPosts, getUserPosts, getTrendingTopics, getUserData };
