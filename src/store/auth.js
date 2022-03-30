import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    email: '',
    password: '',
    returnSecureToken: null,
}

const auth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authStart(state, actions) {
            const user = {
                email: actions.payload.email,
                password: actions.payload.password,
                returnSecureToken: true,
            }
            console.log(user)
                //https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key
            axios.post('https://www.googleapis.com/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCiBtkwmlWykeuy1TWY7_u_0DJfuO9CPj4', user)
                .then(response => {
                    console.log(response)
                        // auth.caseReducers.authSuccess(response.data);
                })
                .catch(err => {
                    console.log(err)
                        // auth.caseReducers.authFail(err.data);
                })
            return user;
        },
        authSuccess(authData) {
            console.log('success')
        },
        authFail(error) {
            console.log('error')
        },
    }
});

export const { authStart, authSuccess, authFail } = auth.actions;
export default auth.reducer;