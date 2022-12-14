import axios from 'axios';

export const signup = body => {
    return axios.post('/api/1.0/users', body, {

        headers: { 'accept-language': 'tr' }
    });
};

export const login = creds => {
    
       return axios.post('/api/1.0/auth', {}, {auth : creds});
}