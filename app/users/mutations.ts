import { api } from '@utils/client'

export async function createUser(email: string) {
  return api.post('users', { json: { email } })
}

export async function deleteUser(id: number) {
  return api.delete('users', { json: { id } })
}
