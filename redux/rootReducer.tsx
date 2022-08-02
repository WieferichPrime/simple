import {combineReducers} from 'redux'
import {CHANGE_DATE, CHANGE_EMAIL, CHANGE_PHONE, CHANGE_TIME} from './types'

interface Action {
    type: string;
    payload: any;
}

function dateReducer(state='', action: Action) {
    if (action.type === CHANGE_DATE) {
        return action.payload;
    } 
    return state
}

function timeReducer(state='', action: Action) {
    if (action.type === CHANGE_TIME) {
        return action.payload;
    } 
    return state
}

function emailReducer(state='', action: Action) {
    if (action.type === CHANGE_EMAIL) {
        return action.payload;
    } 
    return state
}

function phoneReducer(state='', action: Action) {
    if (action.type === CHANGE_PHONE) {
        return action.payload;
    } 
    return state
}

export const rootReducer = combineReducers({
  date: dateReducer,
  time: timeReducer,
  email: emailReducer,
  phone: phoneReducer
})