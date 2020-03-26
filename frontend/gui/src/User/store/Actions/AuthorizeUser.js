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

    const token = localStorage.getItem('token');
    if(token===null || token=== undefined) {

    }else{
        swal({
          title: "Are you sure you want to Logout?",
          icon: "warning",
          dangerMode: true,
          buttons: [ "No", "Yes, Log me Out"]
        })
        .then((willDelete) => {
          if (willDelete) {
              swal("You have been Logged out", {
              icon: "success",
            }).then(value => {
                localStorage.removeItem('token');
                localStorage.removeItem('expirationDate');
                window.location.href = '/';
              });

            return {
                type: actionTypes.AUTH_LOGOUT
            };

          } else {
            swal("You are still logged in").then(value => {
                window.location.href = window.location.pathname;
            });
          }

        });
    }

    return {
        type: null
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
                    console.log(res);
                    if (res.data.Status == "Failed" || res.data.Data.Status == "Failed") {
                        console.log(res);
                        dispatch(authFail("Failed"));
                        swal("Log in Failed", "Check Username or Password");
                        throw new Error("Failed");

                    } else {
                        console.log(res);
                        const token = res.data.Data.usrId;
                        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                        localStorage.setItem('token', token);
                        localStorage.setItem('expirationDate', expirationDate);
                        dispatch(authSuccess(token));
                        dispatch(checkAuthTimeout(3600));
                        swal("Log in Successful", "SUCCESS");


                    }

                }).catch(error => {
                    console.error(error);
                    dispatch(authFail(error))
            })
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
                    if (res.data.Status == "Failed") {
                        console.log(res);
                        swal("Failed to Register!! Duplicate Student ID or Username", "ERROR");

                    } else {
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

