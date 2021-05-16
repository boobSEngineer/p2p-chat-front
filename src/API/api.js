import React from 'react';
import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://192.168.86.32:8080/api/',
    crossOrigin: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
})

export const authAPI = {
    getMe() {
        return instance.get('auth/me')
            .then(response => {
                return response.data.user;
            })
    },

    logIn(username, password) {
        return instance.post('auth/login', {username, password})
            .then(response => {
                return response.data;
            })
    },

    logOut() {
        return instance.post('auth/logout')
            .then(response => {
                return response.data;
            })
    },

    registerUser(username, password) {
        return instance.post('auth/register', {username, password})
            .then(response => {
                return response.data;
            })
    },
}

export const userAPI = {
    getUser(uid){
        return instance.get('user/get', {uid})
            .then(response => {
                return response.data.user;
            })
    }
};

export const chatAPI = {};
