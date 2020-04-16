import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import User from '../../models/user/user.model'
import ConnectDb from '../../utils/connectDb'


ConnectDb()

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        email,
        password,
    } = req.body

    // TODO: ADD QUERY FOR CHECKING USER EMAIL
    const user = await User.findOne({ email: email })

    if (!user) return res.status(422).json({ message: 'Account not found' })

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

    console.log(isPassword)
    if (!isPassword) return res.status(422).json({ message: 'Incorrect Password', isPassword })

    // TODO: Add authhentication
    res.status(200).json({
        message: 'Account was found',
        user
    })
}
