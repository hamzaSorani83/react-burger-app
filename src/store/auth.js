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
        authStart(state, actions) {
            const user = {
                email: actions.payload.email,
                password: actions.payload.password,
                returnSecureToken: true,
            }
            let key = 'AIzaSyCiBtkwmlWykeuy1TWY7_u_0DJfuO9CPj4';
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + key;
            if (!actions.payload.isSignup) {
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + key;
            }
            axios.post(url, user)
                .then(response => {
                    console.log(response)
                    actions.payload.dispatch(authSuccess({ idToken: response.data.idToken, userId: response.data.localId }))
                })
                .catch(error => {
                    actions.payload.dispatch(authFail(error))
                    console.log(error.response)
                        // actions.payload.dispatch(authFail(error.response.data))
                        // auth.caseReducers.authFail(state, error.response);
                })
            return {
                ...state,
                loading: true
            };
        },
        authSuccess(state, actions) {
            return {
                ...state,
                token: actions.payload.idToken,
                userId: actions.payload.userId,
                error: false,
                loading: false,
            }
        },
        authFail(state, actions) {
            let err;
            if (actions.payload.response) {
                err = actions.payload.response.data.error.message;
            } else {
                err = actions.payload.message
            }
            return {
                ...state,
                error: err,
                loading: false,
            }
        },
    }
});

export const { authStart, authSuccess, authFail } = auth.actions;
export default auth.reducer;