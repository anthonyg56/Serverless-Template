import BaseUrl from '../utils/baseUrl'
import fetch from 'isomorphic-unfetch'
import { parseCookies, setCookie } from 'nookies'
import { IGetAccessToken } from '../interfaces/utils'
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken
const accessSecret = process.env.ACCESS_SECRET as string
const refreshSecret = process.env.REFRESH_SECRET as string

export const saveToken = (ctx: any, token: string, tokenName: string) => setCookie(ctx, tokenName, token, null)

// Access token handling
export const createAccessToken = (userId: string) => jwt.sign({ userId }, accessSecret, {
    expiresIn: "15m"
})

export const getAccessToken: IGetAccessToken = async (ctx) => {
    const refreshToken = getRefreshToken(ctx)

    if (!refreshToken) return null

    const accessTokenResponse = await fetch(`${BaseUrl}/api/checkRefreshToken`, {
        method: 'POST',
        headers: {
            authorization: refreshToken as string
        }
    })

    const { accessToken } = await accessTokenResponse.json()
    return accessToken
}

// Refresh token handling
export const getRefreshToken = (ctx: any) => {
    const { refresh } = parseCookies(ctx)
    const isServer = () => typeof window === 'undefined'

    if (isServer() && !refresh) {
        return null
    }

    return refresh
}

export const createRefreshToken = (userId: string, userName: string, email: string) => 
    jwt.sign({ userId, userName, email }, refreshSecret, {
        expiresIn: '1h'
    })

