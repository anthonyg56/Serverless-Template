import mongoose, { Model, Connection, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { UserModel } from '../interfaces/models'
const SALT_WORK_FACTOR = 10

const schemaName = 'User'
const UserSchema: Schema<UserModel> = new Schema<UserModel>({
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
    },
    refreshTokensId: {
        type: mongoose.Types.ObjectId,
        ref: 'RefreshTokens'
    }
})

// Hash password
UserSchema.pre<UserModel>('save', function(next) {
    const user = this
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
      return next()
    }
  
    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        return next(err)
      }
      // Hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err)
        }
        // override the cleartext password with the hashed one
        user.password = hash
        next()
      })
    })
})

const UserModelConn = (con: Connection): Model<UserModel> => con.model<UserModel>(schemaName, UserSchema)

export default UserModelConn