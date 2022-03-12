import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-f5f32-default-rtdb.firebaseio.com/'
});

export default instance;