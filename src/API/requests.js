import axiosBase from './axiosBase';

function signUp({ email, password, username, pictureUrl }) {
    return axiosBase.post('/sign-up', { email, password, username, pictureUrl })
}

function login({ email, password }) {
    return axiosBase.post('/sign-in', { email, password })
}

export { signUp, login };