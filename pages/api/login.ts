import { NextApiRequest, NextApiResponse } from 'next'
import { Model } from 'mongoose'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../utils/withAuth'
import { getConnection } from '../../utils/withDb'
import UserModel from '../../models/user/user.model'
import RefreshTokensModel from '../../models/tokens/refreshToken.schema'
import { IRefreshTokens, IUser } from '../../interfaces/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        email,
        password
    } = req.body

    // Get database connect & create model
    const dbConn = await getConnection()
    const User: Model<IUser> = UserModel(dbConn)

    // Get user from database
    const user = await User.findOne({ email: email })
    if (!user) return res.status(422).json({ message: 'Account not found' })

    // Validate password
    const isPassword = await bcrypt.compare(password, user.password)
        .then((isMatch: boolean) => {
            isMatch ? () => {
                console.log('Passwords Match!') 
            } : () => {
                console.log('Passwords do not match :(')
            }
            return isMatch
        })
        .catch((err: Error) => {
            throw err
        })
    if (!isPassword) return res.status(422).json({ message: 'Incorrect Password', isPassword })

    const { 
        _id,
        userName,
        refreshTokensId
    } = user

    // RefreshToken Handling
    const RefreshTokens: Model<IRefreshTokens> = await RefreshTokensModel(dbConn)
    const refreshTokens = await RefreshTokens.findById(refreshTokensId, (err, token) => {
        if (err) throw err
        return token
    }) as IRefreshTokens

    if (!refreshTokens) return res.status(422).json({ message: 'No refresh tokens available' })

    // Create tokens
    const accessToken = createAccessToken(_id)
    const refreshToken = createRefreshToken(_id, userName, email)

    refreshTokens.tokens.push(refreshToken)
    refreshTokens.save()

    return res.status(201).json({
        message: 'Account successfully signed in!',
        user,
        refreshToken,
        accessToken
    })
}
