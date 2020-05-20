import { Document } from 'mongoose'

export interface UserModel extends Document {
    name: string,
    userName: string,
    email: string,
    password: string,
    refreshTokensId: string
}

export interface IRefreshTokens extends Document {
    tokens: string[]
}