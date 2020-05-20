import { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../src/models/user.model'
import RefreshTokensModel from '../../src/models/refreshToken.schema'
import { getConnection } from '../../src/utils/dbConnection'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        name,
        userName,
        email,
        password,
    } = req.body

    const dbConn = await getConnection()
    const User = UserModel(dbConn)

    // TODO: ADD QUERY FOR CHECKING ACCOUNTS EMAILS
    const account = await User.findOne({ email: email })

    if (account)
        return res.json({ 
            message: 'User found',
            account
        })
    
    const RefreshTokens = await RefreshTokensModel(dbConn)
    const refreshTokens = await new RefreshTokens().save()

    const newAccount = await new User({
        name,
        userName,
        email,
        password,
        refreshTokensId: refreshTokens._id
    }).save()
    
    res.status(200).json({ newAccount })
}