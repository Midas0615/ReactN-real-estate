import API_DOMAIN from '../../config/.env'

const userApiRoute = API_DOMAIN + '/api/user';

export default {
    create(data) {
        return fetch(userApiRoute + '/create', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }
}