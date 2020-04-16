import { NextApiRequest, NextApiResponse } from 'next'

import User from '../../models/user/user.model'
import ConnectDb from '../../utils/connectDb'

ConnectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        accountName: name,
        userName,
        email,
        password,
    } = req.body

    // TODO: ADD QUERY FOR CHECKING ACCOUNTS EMAILS
    const account = await User.findOne({ userName: userName })

    if (account)
        return res.json({ 
            message: 'User found',
            account
        })

    const newAccount = await new User({
        name,
        userName,
        email,
        password
    }).save()
    
    res.json({ newAccount })
}