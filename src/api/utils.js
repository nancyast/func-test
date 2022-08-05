const serverURL = process.env.REACT_APP_SERVER_URL
const stage = process.env.REACT_APP_STAGE

export const apiUrl = (path) => `${serverURL}/${stage}/${path}`

export const isJsonString = (jsonString) => {
  try {
    JSON.parse(jsonString)
  } catch (e) {
    return false
  }
  return true
}
