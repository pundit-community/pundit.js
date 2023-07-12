import { AuthorisableUser, AuthorisablePost } from './types'

export const author: AuthorisableUser = { id: 1, isAdmin: false }
export const admin: AuthorisableUser = { id: 2, isAdmin: true }
export const post: AuthorisablePost = { id: 10, userId: author.id }
