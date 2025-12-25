import React from "react";
import moment from 'moment';
import { createGlobalState } from 'react-hooks-global-state';

// This acts as a database for the frontend to store data shared across components.
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  createModal: 'scale-0',
  editModal:'scale-0',
  backModal:'scale-0',
  deleteModal:'scale-0',
  connectedAccount: '',   
  projects: [],    
  project:null,       
  contract: null,         
  stats: null, 
  backers: [],           
})

// Hides the middle of long strings (like wallet addresses: 0x123...abc)
const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

// Calculates how many days are left until the deadline
const daysRemaining = (days) => {
  const todaysdate = moment()
  // The blockchain stores time in seconds, Moment.js needs milliseconds.
  // This line appends '000' to convert seconds to ms string, then converts to Number.
  days = Number((days + '000').slice(0))
  
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  
  days = days.diff(todaysdate, 'days')
  
  return days == 1 ? '1 day' : days + ' days'
}

export { 
  useGlobalState, 
  setGlobalState, 
  getGlobalState, 
  truncate, 
  daysRemaining 
}