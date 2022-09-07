import {CHANGE_DATE, CHANGE_EMAIL, CHANGE_PHONE, CHANGE_TIME, CHANGE_UNAVAILABLE_TIME, CHANGE_USER} from './types'

export function changeDate(newDate:string) {
  return {
    type: CHANGE_DATE,
    payload: newDate
  }
}

export function changeTime(newTime:string) {
    return {
      type: CHANGE_TIME,
      payload: newTime
    }
}

export function changeUser(newUser:any) {
  return {
    type: CHANGE_USER,
    payload: newUser
  }
}

export function changeEmail(newEmail:string) {
  return {
    type: CHANGE_EMAIL,
    payload: newEmail
  }
}

export function changePhone(newPhone:string) {
  return {
    type: CHANGE_PHONE,
    payload: newPhone
  }
}