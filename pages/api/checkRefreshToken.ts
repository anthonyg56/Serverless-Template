import { NextApiRequest, NextApiResponse } from 'next'
import { createAccessToken } from '../../utils/withAuth'
import { verify } from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // Check if refresh token is in headers, return 401 if not
    if (!('authorization' in req.headers)) return res.status(401).json({
        message: 'No authorization token'
    })

    const refreshToken = req.headers.authorization as string
    const refreshSecret = process.env.REFRESH_SECRET as string

    // Validate token
    const { userId } = verify(refreshToken, refreshSecret) as any
    const accessToken = createAccessToken(userId)

    // Return token
    return res.status(200).json({
        accessToken
    })  
}