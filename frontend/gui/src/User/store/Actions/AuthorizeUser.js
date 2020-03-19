import React from "react";
import axios from "axios";
import swal from 'sweetalert';
import * as actionTypes from './ActionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime =>{
        return dispatch => {
            setTimeout(() => {
                dispatch(logout());
            }, expirationTime * 1000)
        }
    }

export const authorize = (username, password) => {
        console.log('Received values of form: ', username, password)
        return dispatch => {

            dispatch(authStart());
            axios.get('http://127.0.0.1:8000/user/authUser/?usrId=' + '&usrLoginName=' + username + '&usrPassword=' + password)
                .then(res => {
                    if (res.data.Data == "Failed") {
                        dispatch(authFail("Failed"));
                        swal("Log in Failed", "ERROR");
                    } else {

                        const token = res.data.Data.usrId;
                        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                        localStorage.setItem('token', token);
                        localStorage.setItem('expirationDate', expirationDate);
                        console.log(token);
                        dispatch(authSuccess(token));
                        dispatch(checkAuthTimeout(3600));
                        swal("Log in Successful", "SUCCESS");
                    }

                }).catch(error => console.error(error))
        }
}

export const register = (values) => {
        console.log('Received values of form: ', values);

        return dispatch => {

            dispatch(authStart());
            axios.get('http://127.0.0.1:8000/user/addUser/?usrId=' + values.id + '&usrFirstName=' + values.first + '&usrLastName='
                + values.last + '&usrLoginName=' + values.username + '&usrPassword=' + values.password + '&usrEmailId=' + values.email +
                '&usrContact=' + values.phone)
                .then(res => {
                    if (res.data.Data == "Failed") {
                        dispatch(authFail("Failed"));
                        swal("Failed to Register!! Duplicate Student ID or Username", "ERROR");
                    } else {

                        const token = res.data.Data.usrId;
                        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                        localStorage.setItem('token', token);
                        localStorage.setItem('expirationDate', expirationDate);
                        console.log(token);
                        dispatch(authSuccess(token));
                        dispatch(checkAuthTimeout(3600));
                        swal("Successfully Registered", "SUCCESS");
                    }

                }).catch(error => console.error(error))
        }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(token === undefined) {
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            }else{
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())  / 1000 ))
            }
        }
    }
};

