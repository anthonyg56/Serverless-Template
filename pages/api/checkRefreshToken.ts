import { NextApiRequest, NextApiResponse } from 'next'
import { createAccessToken } from '../../src/utils/auth'
import { verify } from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!('authorization' in req.headers)) {
      return res.status(401).json({ message: 'No authorization token' })
    }

    const refreshToken = req.headers.authorization as string
    const refreshSecret = process.env.REFRESH_SECRET as string

    const { userId } = verify(refreshToken, refreshSecret) as any
    const accessToken = createAccessToken(userId)

    return res.status(200).json({
        accessToken
    })  
}