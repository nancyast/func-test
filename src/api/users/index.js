import { request } from 'src/api/base'

export const getUsers = async (query) => {
  const url = `https://api.github.com/search/users?${query} in:name`
  return await request(url)
}
