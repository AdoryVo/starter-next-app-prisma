import ky from 'ky'

// Ky instance for requests to the server
export const api = ky.create({
  prefixUrl: '/api',
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error
        if (response && response.body) {
          error.message = `${await response.json()}`
        }

        return error
      },
    ],
  },
})
