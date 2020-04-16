import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import UserSchema from './user.schema'

import { IUser } from '../../interfaces'

const SALT_WORK_FACTOR = 10

// Hash password
UserSchema.pre<IUser>('save', function(next) {
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

const User = mongoose.model<IUser>('User') || mongoose.model<IUser>('User', UserSchema)

export default User