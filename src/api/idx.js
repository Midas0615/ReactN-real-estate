import { API_DOMAIN } from '../../config/env'

const userApiRoute = API_DOMAIN + '/api/idx';

export default {
    testing() {
        return fetch(userApiRoute + '/testing');
    }
}