import mongoose from 'mongoose'
import { IUser } from '../../interfaces'

const Schema = mongoose.Schema

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
})

export default UserSchema