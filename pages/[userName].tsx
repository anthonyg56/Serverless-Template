import Head from 'next/head'
import { NextPage, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'
import { getAccessToken } from '../utils/withAuth'
import Router from 'next/router'
import BaseUrl from '../utils/baseUrl'

const UserHomePage: NextPage<GetServerSideProps> = (props) => {
    if (!props) Router.push('/login')

    const { user } = props as any
    const { userName } = user

    return (
        <div>
            <Head>
                <title>{ userName } | Home</title>
            </Head>

            <main>
                <h1>Hello {userName}</h1>
            </main>
        </div>
    )
}

// If accessToken is valid, return user data for homepage
export const getServerSideProps: GetServerSideProps = async context => {
    const accessToken = await getAccessToken(context)
    if (!accessToken) return {
        props: {}
    }

    const response = await fetch(`${BaseUrl}/api/account`, {
        method: 'GET',
        headers: {
            authorization: accessToken as string
        }
    })

    const { user } = await response.json()

    return {
        props: {
            user,
            accessToken
        }
    }
}

export default UserHomePage