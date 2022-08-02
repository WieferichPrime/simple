import {CHANGE_DATE, CHANGE_EMAIL, CHANGE_PHONE, CHANGE_TIME} from './types'

export interface Time {
  hours: number;
  minutes: number;
}

export function changeDate(newDate:Date|string) {
  return {
    type: CHANGE_DATE,
    payload: newDate
  }
}

export function changeTime(newTime:Time|string) {
    return {
      type: CHANGE_TIME,
      payload: newTime
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