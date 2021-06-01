import React from 'react';
import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://192.168.86.32:8080/api/',
    crossOrigin: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
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
        return instance.get(`user/get?uid=${uid}`)
            .then(response => {
                return response.data.user;
            })
    },
};

export const chatAPI = {
    getChats(){
        return instance.get('chat/list')
            .then(response =>{
                return response.data;
            })
    },

    getMembers(chatId){
        return instance.get(`chat/get_members?chatId=${chatId}`)
            .then(response => {
                return response.data;
            })
    },

    updateActivityChat(chatId){
        return instance.post('chat/update_last_activity', {chatId})
            .then(response => {
                return response.data;
            })
    },

    addNewDialog(target){
        return instance.post('chat/add_dialog', {target})
            .then(response => {
                return response.data;
            })
    },

    createGroupChat(chatName){
        return instance.post('chat/create_group', {chatName})
            .then(response => {
                return response.data;
            })
    },

    getInvite(chatId){
        return instance.get(`chat/get_invite_uid?chatId=${chatId}`)
            .then(response => {
                return response.data.inviteUid;
            })
    },

    getNewInvite(chatId){
        return instance.post(`chat/revoke_invite_uid?chatId=${chatId}`)
            .then(response => {
                return response.data.inviteUid;
            })
    },

    joinToGroup(inviteUid){
        return instance.post('chat/join_group', {inviteUid})
            .then(response => {
                return response.data;
            })
    },

    renameGroup(chatId, newChatName){
        return instance.post('chat/rename_group', {chatId, newChatName})
            .then(response => {
                return response.data;
            })
    },

    leaveChat(chatId){
        return instance.post('chat/leave', {chatId})
            .then(response => {
                return response.data;
            })
    },
};
