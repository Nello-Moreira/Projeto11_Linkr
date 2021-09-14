import axiosBase from './axiosBase';

/* criar funcoes das endpoints aqui */
function signUp({ email, password, username, pictureUrl }) {
    return axiosBase.post('/sign-up', { email, password, username, pictureUrl })
}

export { signUp };