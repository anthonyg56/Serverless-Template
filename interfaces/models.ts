import { Document } from 'mongoose'

export interface IUser extends Document {
    name: string,
    userName: string,
    email: string,
    password: string,
    refreshTokensId: string
}

export interface IRefreshTokens extends Document {
    tokens: string[]
}