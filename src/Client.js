import fetch from 'isomorphic-fetch'

const apiHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
}

const timeTrackerBackend = 'http://localhost:8080'

const login = (providedEmail, pw) => {
  return fetch(`${timeTrackerBackend}/login`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify({
      email: providedEmail,
      password: pw
    })
  }).then((data) => {
        if (data.status !== undefined) {
          if (data.status === 200) {
            return data.json().then((data) => {
              return data})
            }
          else return {message: 'Unauthorized'}
        }
      }).catch((err) => {
        Promise.resolve({ message: err })}
      )
}

const clock = () => {
  const userId = window.sessionStorage.getItem('userId')
  return fetch(`${timeTrackerBackend}/clock`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify({
      userId: userId
    })
  }).then((data) => {
        if (data.status !== undefined) {
          if (data.status === 200) {
            return data.json().then((data) => {
              console.log(data.data.clock_out)
              if (data.data.clock_out === null || data.data.clock_out === ''){ window.sessionStorage.setItem('clockStatus', 'Clock In')} else window.sessionStorage.setItem('clockStatus', 'Clock Out')
              console.log(window.sessionStorage.getItem('clockStatus'))
              userLogs(userId)
              return data})
            }
          else return {message: 'Unauthorized'}
        }
      }).catch((err) => {
        Promise.resolve({ message: err })}
      )
}

const userLogs = (userId) => {
  return fetch(`${timeTrackerBackend}/userLogs?userId=${userId}`, {
    method: 'GET',
    headers: apiHeaders,
  }).then((data) => {
        if (data.status !== undefined) {
          if (data.status === 200) {
            return data.json().then((data) => {
              return data.logs})
            }
          else return {message: 'Unauthorized'}
        }
      }).catch((err) => {
        Promise.resolve({ message: err })}
      )
}

const Client = {
  login: login,
  userLogs: userLogs,
  clock: clock
}
export default Client
