import axiosBase from './axiosBase';

/* criar funcoes das endpoints aqui */

function post({token} , data) {
    return axiosBase.post('/posts', data, { headers: {'Authorization': `Bearer ${token}`}});
}

function getPosts({token}) {
    return axiosBase.get('/posts', { headers: {'Authorization': `Bearer ${token}`}});
}

export { 
    post, getPosts,
 };