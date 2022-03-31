import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const auth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        authStart(state, action) {
            const user = {
                email: action.payload.email,
                password: action.payload.password,
                returnSecureToken: true,
            }
            let key = 'AIzaSyCiBtkwmlWykeuy1TWY7_u_0DJfuO9CPj4';
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + key;
            if (!action.payload.isSignup) {
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + key;
            }
            axios.post(url, user)
                .then(response => {
                    action.payload.dispatch(authSuccess({ idToken: response.data.idToken, userId: response.data.localId }))
                    action.payload.dispatch(checkAuthTimeout({ expire: response.data.expiresIn, dispatch: action.payload.dispatch }))
                })
                .catch(error => {
                    action.payload.dispatch(authFail(error))
                })
            return {
                ...state,
                loading: true
            };
        },
        authSuccess(state, action) {
            return {
                ...state,
                token: action.payload.idToken,
                userId: action.payload.userId,
                error: null,
                loading: false,
            }
        },
        authFail(state, action) {
            let err;
            if (action.payload.response) {
                err = action.payload.response.data.error.message;
            } else {
                err = action.payload.message
            }
            return {
                ...state,
                error: err,
                loading: false,
            }
        },
        checkAuthTimeout(state, action) {
            setTimeout(() => {
                action.payload.dispatch(authLogout());
            }, action.payload.expire * 1000)
        },
        authLogout(state) {
            console.log('logout')
            return {
                ...state,
                token: null,
                userId: null,
            }
        },
    }
});

export const { authStart, authSuccess, authFail, checkAuthTimeout, authLogout } = auth.actions;
export default auth.reducer;