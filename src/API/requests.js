import axiosBase from "./axiosBase";

function login({ email, password }) {
  return axiosBase.post("/sign-in", { email, password });
}

function signUp({ email, password, username, pictureUrl }) {
  return axiosBase.post("/sign-up", { email, password, username, pictureUrl });
}

function post({ token }, data) {
  return axiosBase.post("/posts", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getPosts({ token }) {
  return axiosBase.get("/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getUserPosts({ id, token }) {
  return axiosBase.get(`/users/${id}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function getUserData({ id, token }) {
  return axiosBase.get(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export { login, signUp, post, getPosts, getUserPosts, getUserData };
