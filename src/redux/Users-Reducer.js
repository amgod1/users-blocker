import { createAction } from "@reduxjs/toolkit"
import * as Axios from 'axios'

const GET_USERS_INFO = 'GET_USERS_INFO'
const CHECK_USER = 'CHECK_USER'
const CHECK_ALL = 'CHECK_ALL'
const BLOCK_USER = 'BLOCK_USER'
const UNBLOCK_USER = 'UNBLOCK_USER'
const DELETE_USER = 'DELETE_USER'


let initialState = {
    allUsersInfo: '',
    checkedUsers: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_INFO:
            return {...state, allUsersInfo: action.payload.allUsers }
        case CHECK_USER:
            let newChecked = [...state.checkedUsers]
            if (action.payload.check) {
                newChecked.push(action.payload.id)
                return {...state, checkedUsers: newChecked }
            } else {
                newChecked.splice(newChecked.indexOf(action.payload.id), 1)
                return {...state, checkedUsers: newChecked}
            }
        case BLOCK_USER:
            Axios.put('http://localhost:3306/api/update/blocked', {
                ids: state.checkedUsers
            })
            return {...state, checkedUsers: []}
        case UNBLOCK_USER:
            Axios.put('http://localhost:3306/api/update/unblocked', {
                ids: state.checkedUsers
            })
            return {...state, checkedUsers: []}
        case DELETE_USER:
            Axios.put('http://localhost:3306/api/delete', {
                ids: state.checkedUsers
            })
            return {...state, checkedUsers: []}
        case CHECK_ALL:
            if (action.payload.info) {
                return {...state, checkedUsers: action.payload.all}
            } else return {...state, checkedUsers: []}
        default:
            return state
    }
}

export const getUsersInfoAC = createAction (GET_USERS_INFO, function prepare(allUsers) { return { payload: {allUsers} }})
export const setCheckUserAC = createAction (CHECK_USER, function prepare(id, check) { return { payload: {id, check} }})
export const checkAllAC = createAction (CHECK_ALL, function prepare(info, all) { return { payload: {info, all} }})

export const blockUserAC = createAction (BLOCK_USER)
export const unblockUserAC = createAction (UNBLOCK_USER)
export const deleteUserAC = createAction (DELETE_USER)

export default usersReducer