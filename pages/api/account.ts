import { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../models/user/user.model'
import { getConnection } from '../../utils/withDb'
import { verify } from 'jsonwebtoken'

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    // Check if authorization is in header
    if (!("authorization" in req.headers)) return res.status(401).send("No authorization token")

    const token = req.headers.authorization as string
    const accessSecret = process.env.ACCESS_SECRET as string

    // Validate token and handled returned payload
    const payload  = verify(token, accessSecret)

    if (!payload) return res.status(403).json({ message: 'Invalid Token'})

    const { userId } = payload as any

    // Create db connection
    const dbDonn = await getConnection()
    const User = await UserModel(dbDonn)

    const user = await User.findById(userId)

    if (!user) return res.status(404).json({ message: 'Account not found '})

    return res.status(200).json({
        message: "Account found",
        user
    })
}

// Upon different request methods, switch function to return
export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "GET":
            await getUser(req, res)
            break
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}