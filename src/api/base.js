import { isJsonString } from './utils'

const getDefaultHeaders = () => ({
  Accept: '*/*',
  'Content-Type': 'application/json;charset=UTF-8',
  'Accept-Encoding': 'gzip, deflate, br',
})

export const isNetworkOffline = () => !window.navigator.onLine

export const request = async (url, options = {}) => {
  const requestOptions = {
    headers: getDefaultHeaders(),
    ...options,
  }
  let response

  if (isNetworkOffline()) {
    throw Error('No internet connection')
  }

  try {
    response = await fetch(url, requestOptions)
  } catch (error) {
    console.log('error ', error)
    throw Error('Remote API server did not respond')
  }

  const responseText = await response.text()

  switch (response.status) {
    case 200:
    case 201:
    case 204: {
      return isJsonString(responseText) ? JSON.parse(responseText) : {}
    }

    default: {
      const error = isJsonString(responseText)
        ? JSON.parse(responseText)
        : { error_message: 'Server error' }

      throw new Error(error?.error_message || error?.message)
    }
  }
}
