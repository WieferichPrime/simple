import {CHANGE_DATE, CHANGE_EMAIL, CHANGE_PHONE, CHANGE_TIME, CHANGE_UNAVAILABLE_TIME} from './types'

export function changeDate(newDate:Date|string) {
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

export function changeUnavailableTime(newTimes:string[]) {
  return {
    type: CHANGE_UNAVAILABLE_TIME,
    payload: newTimes
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