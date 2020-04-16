import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
    name: string,
    userName: string,
    email: string,
    password: string,
    comparePassword: (candidatePassword: string, cb: () => void) => void
}

export interface ILoginForm {
    email: string;
    password: string;
}

export interface IRegisterForm {
    accountName: string,
    userName: string,
    email: string,
    password: string
}