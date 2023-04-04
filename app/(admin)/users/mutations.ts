import { api } from '@utils/client'

export async function deleteUser(id: number) {
  return api.delete('users', { json: { id } })
}
